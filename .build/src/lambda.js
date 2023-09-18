"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const awsLambdaFastify = require("@fastify/aws-lambda");
const app_1 = require("./app");
let server;
let proxy;
const handler = async (event, context) => {
    if (!server) {
        const app = await (0, app_1.bootstrap)();
        server = app.getHttpAdapter().getInstance();
        console.log(server.printRoutes());
        proxy = awsLambdaFastify(server);
    }
    return proxy(event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map