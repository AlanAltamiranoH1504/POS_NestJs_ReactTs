import {Injectable} from '@nestjs/common';
import {CreateCategoriaDto} from './dto/create-categoria.dto';
import {UpdateCategoriaDto} from './dto/update-categoria.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Categoria} from "./entities/categoria.entity";

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>
    ) {}

    create(createCategoriaDto: CreateCategoriaDto) {
        const categoriaToSave = new Categoria();
        categoriaToSave.nombre = createCategoriaDto.nombre;
        return this.categoriaRepository.save(categoriaToSave);
    }

    findAll() {
        return `This action returns all categorias`;
    }

    findOne(id: number) {
        return `This action returns a #${id} categoria`;
    }

    update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
        return `This action updates a #${id} categoria`;
    }

    remove(id: number) {
        return `This action removes a #${id} categoria`;
    }
}
