import { Logger } from 'nestjs-pino'; 
import { bootstrap } from './app';

async function startLocal() {
    const app = await bootstrap();
    const logger = app.get(Logger);
    const port = process.env.PORT || 3000;
    await app.listen(port)
    logger.log(`Application listening on port ${port}`);
} 

startLocal();
