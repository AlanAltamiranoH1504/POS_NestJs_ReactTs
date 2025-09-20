import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
        return this.cuponesRepository.find({
            where: {
                status: true
            }
        });
    }

    async findOne(id: number) {
        const cuponToFound = await this.cuponesRepository.findOne({
            where: {
                id: id,
                status: true
            }
        });
        if (!cuponToFound) {
            throw new HttpException(`Cupon con id ${id} no encontrado o deshabilitado`, HttpStatus.NOT_FOUND)
        }
        return cuponToFound;
    }

    async update(id: number, updateCuponeDto: UpdateCuponeDto) {
        const cuponToUpdate = await this.cuponesRepository.findOne({
            where: {
                id
            }
        });
        if (!cuponToUpdate) {
            throw new HttpException(`Cupón con id ${id} no encontrado`, HttpStatus.NOT_FOUND);
        }
        cuponToUpdate.nombre = updateCuponeDto.nombre;
        cuponToUpdate.porcentaje = updateCuponeDto.porcentaje;
        cuponToUpdate.fecha_expiracion = updateCuponeDto.fecha_expiracion;
        cuponToUpdate.status = updateCuponeDto.status;
        await this.cuponesRepository.save(cuponToUpdate);
        return {
            status: true,
            message: "Cupón actualizado correctamente"
        }
    }

   async remove(id: number) {
        const cuponToDelete = await this.cuponesRepository.findOne({
            where: {
                id: id,
                status: true
            }
        });
        if (!cuponToDelete) {
            throw new HttpException(`Cupón con id ${id} no encontrado para eliminación`, HttpStatus.NOT_FOUND);
        }
        cuponToDelete.status = false;
        await this.cuponesRepository.save(cuponToDelete);
        return {
            status: true,
            message: "Cupon eliminado correctamente"
        }
    }
}
