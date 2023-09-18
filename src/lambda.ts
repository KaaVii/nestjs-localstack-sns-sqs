import * as awsLambdaFastify from '@fastify/aws-lambda'
import { 
    APIGatewayProxyEvent,  
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { FastifyInstance } from 'fastify';
import { bootstrap } from './app';

let server: FastifyInstance
let proxy: awsLambdaFastify.PromiseHandler;

export const handler = async (
    event: APIGatewayProxyEvent,    
    context: Context,
): Promise<APIGatewayProxyResult> => {  
    if (!server) {
        const app = await bootstrap();
        server = app.getHttpAdapter().getInstance() as FastifyInstance;
        console.log(server.printRoutes());
        proxy = awsLambdaFastify(server);
    }
    return proxy(event, context);
}   