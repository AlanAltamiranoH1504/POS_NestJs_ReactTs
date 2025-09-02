import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import {ProductosService} from './productos.service';
import {CreateProductoDto} from './dto/create-producto.dto';
import {UpdateProductoDto} from './dto/update-producto.dto';
import {CategoriasService} from "../categorias/categorias.service";

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {
    }

    @Post()
    create(@Body() createProductoDto: CreateProductoDto) {
        //Busqueda de categoria
        return this.productosService.create(createProductoDto);
    }

    @Get()
    findAll() {
        return this.productosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productosService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
        return this.productosService.update(+id, updateProductoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productosService.remove(+id);
    }
}
