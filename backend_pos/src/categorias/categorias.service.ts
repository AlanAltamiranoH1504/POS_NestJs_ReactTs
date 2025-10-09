import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCategoriaDto} from './dto/create-categoria.dto';
import {UpdateCategoriaDto} from './dto/update-categoria.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Categoria} from "./entities/categoria.entity";

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>
    ) {
    }

    create(createCategoriaDto: CreateCategoriaDto) {
        const categoriaToSave = new Categoria();
        categoriaToSave.nombre = createCategoriaDto.nombre;
        return this.categoriaRepository.save(categoriaToSave);
    }

    findAll() {
        return this.categoriaRepository.find();
    }

    async findOne(id: number) {
        const categoriaToShow = await this.categoriaRepository.findOne(
            {
                where: {id: id},
                relations: ["productos"],
            }
        );
        if (!categoriaToShow) {
            throw new HttpException("Categoria no encontrada", HttpStatus.NOT_FOUND);
        }
        return categoriaToShow;
    }

    async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
        const categoriaToUpdate = await this.categoriaRepository.findOneBy({id: id});
        if (!categoriaToUpdate) {
            throw new HttpException("Categoria no encontrada", HttpStatus.NOT_FOUND);
        }
        await this.categoriaRepository.update(id, updateCategoriaDto);
        return this.categoriaRepository.findOneBy({id});
    }

    async remove(id: number) {
        const categoriaToDelete = await this.categoriaRepository.findOneBy({id});
        if (!categoriaToDelete) {
            throw new HttpException("Categoria no encontrada", HttpStatus.NOT_FOUND);
        }
        await this.categoriaRepository.delete(id);
    }
}
