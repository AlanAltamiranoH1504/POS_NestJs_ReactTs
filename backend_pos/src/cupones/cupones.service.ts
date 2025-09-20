import {Injectable} from '@nestjs/common';
import {CreateCuponeDto} from './dto/create-cupone.dto';
import {UpdateCuponeDto} from './dto/update-cupone.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Cupone} from "./entities/cupone.entity";
import {Repository} from "typeorm";

@Injectable()
export class CuponesService {
    constructor(@InjectRepository(Cupone) private readonly cuponesRepository: Repository<Cupone>) {
    }

    create(createCuponeDto: CreateCuponeDto) {
        this.cuponesRepository.save(createCuponeDto);
        return {
            status: true,
            message: "Cupón creado correctamente"
        }
    }

    findAll() {
        return `This action returns all cupones`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cupone`;
    }

    update(id: number, updateCuponeDto: UpdateCuponeDto) {
        return `This action updates a #${id} cupone`;
    }

    remove(id: number) {
        return `This action removes a #${id} cupone`;
    }
}
