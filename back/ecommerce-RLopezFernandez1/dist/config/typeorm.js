"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: ".env" });
const config = {
    type: "postgres",
    host: `${process.env.DB_HOST}` || "localhost",
    port: process.env.DB_PORT,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: true,
    logging: false,
};
exports.default = (0, config_1.registerAs)("typeorm", () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map