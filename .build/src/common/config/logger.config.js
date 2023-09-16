"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const loggerConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        pinoHttp: {
            level: configService.get('LOG_LEVEL') || 'info',
        },
    }),
};
exports.default = loggerConfig;
//# sourceMappingURL=logger.config.js.map