import {config as dotenvConfig} from "dotenv";
import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({path: ".env"});
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
}
// la exportación de la constante config se hace con registerAs para que pueda ser inyectada en otros módulos
export default registerAs("typeorm", () => config);


export const connectionSource = new DataSource(config as DataSourceOptions);