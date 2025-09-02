import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateProductoDto} from './dto/create-producto.dto';
import {UpdateProductoDto} from './dto/update-producto.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Producto} from "./entities/producto.entity";
import {Repository} from "typeorm";
import {Categoria} from "../categorias/entities/categoria.entity";
import {take} from "rxjs";

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

    async findAll(idCategory?: number, take?: number, page?: number) {
        const where = idCategory ? {categoria: {id: idCategory}} : {};
        const takeConsult = take ? take : 5;
        const pageDefault = page ? page : 1;
        const [data, total] = await this.productoRepository.findAndCount({
            relations: ["categoria"],
            order: {
                id: "ASC"
            },
            skip: (pageDefault - 1) * takeConsult,
            take: takeConsult,
            where
        });
        return {
            data,
            total,
        }
    }

    async findOne(id: number) {
        const producto = await this.productoRepository.findOne({where: {id}, relations: ["categoria"]});
        if (!producto) {
            throw new HttpException("Producto no encontrado", HttpStatus.NOT_FOUND);
        }
        return producto;
    }

    async update(id: number, updateProductoDto: UpdateProductoDto) {
        const productoToUpdate = await this.findOne(id);
        const categoriaToSet = await this.categoriaRepository.findOne({where: {id: updateProductoDto.categoriaId}});
        if (!categoriaToSet) {
            throw new HttpException("Categoria no encontrada", HttpStatus.NOT_FOUND);
        }

        productoToUpdate.nombre = updateProductoDto.nombre;
        productoToUpdate.precio = updateProductoDto.precio;
        productoToUpdate.inventario = updateProductoDto.inventario;
        productoToUpdate.categoria = categoriaToSet;
        await this.productoRepository.save(productoToUpdate);
        return productoToUpdate;
    }

    async remove(id: number) {
        const producto_to_delete = await this.productoRepository.findOne({where: {id}});
        if (!producto_to_delete) {
            throw new HttpException("Producto no encontrado", HttpStatus.NOT_FOUND);
        }
        await this.productoRepository.delete(id);
        return "Producto eliminado";
    }
}
