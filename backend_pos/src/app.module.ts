    import { Module } from '@nestjs/common';
    import {ConfigModule, ConfigService} from "@nestjs/config";
    import {TypeOrmModule} from "@nestjs/typeorm";
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { CategoriasModule } from './categorias/categorias.module';
    import {typeOrmConfig} from "./config/typeorm.config";
import { ProductosModule } from './productos/productos.module';
import { TransactionsModule } from './transactions/transactions.module';

    @Module({
      imports: [
          ConfigModule.forRoot({
            isGlobal: true
          }),
          TypeOrmModule.forRootAsync({
            useFactory: typeOrmConfig,
              inject: [ConfigService]
          }),
          CategoriasModule,
          ProductosModule,
          TransactionsModule],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
