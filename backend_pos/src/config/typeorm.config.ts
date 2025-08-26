import type {TypeOrmModuleOptions} from "@nestjs/typeorm"
import * as process from "node:process";
import {join} from "path";
import {ConfigService} from "@nestjs/config";
export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: "postgres",
    host: configService.get("DATABASE_HOST"),
    port: configService.get("DATABASE_PORT"),
    username: configService.get("DATABASE_USER"),
    password: configService.get("DATABASE_PASS"),
    database: configService.get("DATABASE_NAME"),
    entities: [join(__dirname + '../../**/*.entity.{js,ts}')],
    synchronize: true
});