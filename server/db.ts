import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"

dotenv.config();

const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST as string;
const dbType = process.env.DB_DRIVER as any;
const dbPassword = process.env.DB_PASSWORD as string;
const port = Number(process.env.DB_PORT);

export const db = new DataSource({
    type: dbType,
    host: dbHost,
    port: port,
    username: dbUser,
    password: dbPassword,
    database: dbType,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entity/**/*.ts"],
    migrations: [],
    subscribers: [],
})
