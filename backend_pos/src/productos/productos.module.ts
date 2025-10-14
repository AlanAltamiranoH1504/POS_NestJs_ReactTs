import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Producto} from "./entities/producto.entity";
import {Categoria} from "../categorias/entities/categoria.entity";
import {UploadImagesModule} from "../upload_images/upload_images.module";

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria]), UploadImagesModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
