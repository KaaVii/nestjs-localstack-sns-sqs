#!/bin/bash
set -euo pipefail
echo "LocalStack resources starting to create."

# Create an SNS topic
if awslocal --endpoint-url=http://localhost:4566 sns create-topic --name my-topic; then
    echo "SNS topic created successfully."
else
    echo "Error creating SNS topic."
    exit 1
fi

# Create an SQS queue
if awslocal --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue; then
    echo "SQS queue created successfully."
else
    echo "Error creating SQS queue."
    exit 1
fi

# Create an S3 bucket
if awslocal --endpoint-url=http://localhost:4566 s3 mb s3://my-bucket; then
    echo "S3 bucket created successfully."
else
    echo "Error creating S3 bucket."
    exit 1
fi

# Create a DynamoDB table
if awslocal dynamodb create-table \
    --table-name my-table \
    --key-schema AttributeName=id,KeyType=HASH \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1; then
    echo "DynamoDB table created successfully."
else
    echo "Error creating DynamoDB table."
    exit 1
fi

if awslocal --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration --bucket my-bucket --notification-configuration '
{
  "TopicConfigurations": [
    {
      "Id": "MyTopicNotification",
      "TopicArn": "arn:aws:sns:us-east-1:000000000000:my-topic",
      "Events": ["s3:ObjectCreated:*"]
    }
  ]
}
'; then
    echo "S3 bucket notification configuration updated successfully."
else
    echo "Error updating S3 bucket notification configuration."
    exit 1
fi

if aws --endpoint-url=http://localhost:4566 sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:000000000000:my-topic \
  --protocol lambda \
  --notification-endpoint arn:aws:lambda:us-east-1:000000000000:function:test-project-dev-main
then
    echo "S3 bucket notification configuration updated successfully."
else
    echo "Error updating S3 bucket notification configuration."
    exit 1
fi

# Set up S3 bucket notification configuration to send events to SQS queue
if awslocal --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration --bucket my-bucket --notification-configuration '
{
  "QueueConfigurations": [
    {
      "Id": "MyQueueNotification",
      "QueueArn": "arn:aws:sqs:us-east-1:000000000000:my-queue",
      "Events": ["s3:ObjectCreated:*"]
    }
  ]
}
'; then
    echo "S3 bucket notification configuration updated successfully."
else
    echo "Error updating S3 bucket notification configuration."
    exit 1
fi

# Print a message indicating that the resources have been created
echo "LocalStack resources created successfully."
