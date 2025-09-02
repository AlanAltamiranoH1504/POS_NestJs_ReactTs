import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateProductoDto} from './dto/create-producto.dto';
import {UpdateProductoDto} from './dto/update-producto.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Producto} from "./entities/producto.entity";
import {Repository} from "typeorm";
import {Categoria} from "../categorias/entities/categoria.entity";

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
        @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>) {
    }

    async create(createProductoDto: CreateProductoDto) {
        //Busqueda de categoria por id
        const categoriaToShow = await this.categoriaRepository.findOneBy({id: createProductoDto.categoriaId});
        if (!categoriaToShow) {
            throw new HttpException("Categoria no valida", HttpStatus.NOT_FOUND);
        }

        const productoToSave = new Producto();
        productoToSave.nombre = createProductoDto.nombre;
        productoToSave.precio = createProductoDto.precio;
        productoToSave.inventario = createProductoDto.inventario;
        productoToSave.categoria = categoriaToShow;

        return this.productoRepository.save(productoToSave);
    }

    findAll() {
        return `This action returns all productos`;
    }

    findOne(id: number) {
        return `This action returns a #${id} producto`;
    }

    update(id: number, updateProductoDto: UpdateProductoDto) {
        return `This action updates a #${id} producto`;
    }

    remove(id: number) {
        return `This action removes a #${id} producto`;
    }
}
