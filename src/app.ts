import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config();

export async function bootstrap(): Promise<NestFastifyApplication> {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        { bufferLogs: true }
    );
    app.useLogger(app.get(Logger));
    // app.setGlobalPrefix('project');
    app.useGlobalPipes(new ValidationPipe());
    console.log('process.env', process.env);
    return app.init();
}
