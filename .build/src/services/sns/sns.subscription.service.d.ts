import { OnModuleInit } from '@nestjs/common';
import { SnsService } from './sns.service';
export declare class SnsSubscriptionService implements OnModuleInit {
    private readonly snsService;
    constructor(snsService: SnsService);
    onModuleInit(): Promise<void>;
}
