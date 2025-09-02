import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query} from '@nestjs/common';
import {ProductosService} from './productos.service';
import {CreateProductoDto} from './dto/create-producto.dto';
import {UpdateProductoDto} from './dto/update-producto.dto';
import {CategoriasService} from "../categorias/categorias.service";
import {IdValidationPipe} from "../common/pipes/id-validation/id-validation.pipe";
import {GetProductosQueryDTO} from "./dto/get-producto.dto";

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {
    }

    @Post()
    create(@Body() createProductoDto: CreateProductoDto) {
        return this.productosService.create(createProductoDto);
    }

    @Get()
    findAll(@Query() query: GetProductosQueryDTO) {
        return this.productosService.findAll(query.categoria_id, query.take, query.page);
    }

    @Get(':id')
    findOne(@Param('id', IdValidationPipe) id: string) {
        return this.productosService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id', IdValidationPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
        return this.productosService.update(+id, updateProductoDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        return this.productosService.remove(+id);
    }
}
