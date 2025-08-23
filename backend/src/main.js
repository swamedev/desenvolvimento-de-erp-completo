"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
    await app.listen(port);
    console.log(`Nest listening on ${port}`);
}
bootstrap();
