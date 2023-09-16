import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';

const loggerConfig: LoggerModuleAsyncParams = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        pinoHttp: {
            level: configService.get<string>('LOG_LEVEL') || 'info',
        },
    }),
};

export default loggerConfig;
