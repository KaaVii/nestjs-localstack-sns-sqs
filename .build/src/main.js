"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_pino_1 = require("nestjs-pino");
const app_1 = require("./app");
async function startLocal() {
    const app = await (0, app_1.bootstrap)();
    const logger = app.get(nestjs_pino_1.Logger);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
startLocal();
//# sourceMappingURL=main.js.map