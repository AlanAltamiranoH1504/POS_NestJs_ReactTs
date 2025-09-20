import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContenidoTransacciones, Transaction} from "./entities/transaction.entity";
import {Producto} from "../productos/entities/producto.entity";
import {Cupone} from "../cupones/entities/cupone.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, ContenidoTransacciones, Producto, Cupone])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
