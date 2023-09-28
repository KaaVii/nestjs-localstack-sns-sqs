import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3({
      endpoint: process.env.AWS_ENDPOINT, // Replace with your S3 endpoint URL
    });
  }

  async getFile(bucketName: string, key: string): Promise<Buffer | null> {
    try {
      const response = await this.s3.getObject({ Bucket: bucketName, Key: key }).promise();
      return response.Body as Buffer;
    } catch (error) {
      console.error(`Error fetching file ${key} from bucket ${bucketName}: ${error}`);
      return null;
    }
  }

  async listFiles(bucketName: string): Promise<string[]> {
    try {
      const response = await this.s3.listObjectsV2({ Bucket: bucketName }).promise();
      return response.Contents?.map((file) => file.Key) || [];
    } catch (error) {
      console.error(`Error listing files in bucket ${bucketName}: ${error}`);
      return [];
    }
  }
}
