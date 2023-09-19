import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get awsAccessKeyId(): string {
    return this.nestConfigService.get<string>('aws.accessKeyId');
  }

  get awsSecretAccessKey(): string {
    return this.nestConfigService.get<string>('aws.secretAccessKey');
  }

  get awsRegion(): string {
    return this.nestConfigService.get<string>('aws.region');
  }
}
