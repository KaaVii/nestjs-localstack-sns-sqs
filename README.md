[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## LocalStack + AWS Commands: 
``` 
Config:
awslocal     configure --profile localstack //If you want to use a specific profile for localstack

SNS/SQS
awslocal --endpoint-url=http://localhost:4566 sns create-topic --name my-topic
awslocal --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue

S3
awslocal --endpoint-url=http://localhost:4566 s3 mb s3://my-bucket

DynamoDB:
awslocal dynamodb create-table \
    --table-name my-table \
    --key-schema AttributeName=id,KeyType=HASH \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1

Subscriptions:
awslocal --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration --bucket my-bucket --notification-configuration '
{
  "TopicConfigurations": [
    {
      "Id": "MyTopicNotification",
      "TopicArn": "arn:aws:sns:us-east-1:000000000000:my-topic",
      "Events": ["s3:ObjectCreated:*"]
    }
  ]
}
'

aws lambda create-event-source-mapping \
  --function-name your-lambda-function-name \
  --event-source-arn arn:aws:sns:us-east-1:123456789012:my-topic


Test:
awslocal --endpoint-url=http://localhost:4566 sns list-topics
awslocal --endpoint-url=http://localhost:4566 sqs list-queues
awslocal --endpoint-url=http://localhost:4566 sqs get-queue-attributes --queue-url http://localhost:4566/000000000000/my-queue --attribute-names QueueArn
```

Lambda running locally:
serverless plugin install -n serverless-localstack
serverless plugin install -n serverless-dotenv-plugin
serverless deploy -c serverless.dev.yml

## Environment Variables

```
export AWS_PROFILE=localstack
export AWS_DEFAULT_REGION=us-east-1
export AWS_SECRET_ACCESS_KEY=localstack
export AWS_ACCESS_KEY_ID=localstack
export AWS_ENDPOINT_URL=http://localhost:4566
```

## Testing
```
awslocal --endpoint-url=http://localhost:4566 sqs send-message --queue-url http://localhost:4566/000000000000/my-queue --message-body "Hello, world!"
awslocal --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/my-queue
awslocal s3 cp local-file.txt s3://my-bucket/remote-file.txt
awslocal s3 ls s3://my-bucket
```

```
awslocal s3api put-bucket-notification-configuration --bucket my-bucket --notification-configuration '{
  "TopicConfigurations": [
    {
      "Id": "example-topic-configuration",
      "TopicArn": "arn:aws:sns:us-east-1:000000000000:my-topic",
      "Events": ["s3:ObjectCreated:*"]
    }
  ]
}'
```

```
awslocal sns subscribe --topic-arn arn:aws:sns:us-east-1:000000000000:my-topic   --protocol http --notification-endpoint http://localhost:3000/sns/webhook --endpoint-url http://localhost:4566
```
## Support

[LocalStack Init Hooks](https://docs.localstack.cloud/references/init-hooks/)
sudo chmod +x deploy/scripts/init-aws.sh

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

[KaaVii licensed](LICENSE).
