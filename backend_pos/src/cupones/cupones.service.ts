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

    async create(createCuponeDto: CreateCuponeDto) {
        const slugInUse = await this.cuponesRepository.findOne({
            where: {
                slug: createCuponeDto.slug,
                status: true
            }
        });
        if (slugInUse) {
            throw new HttpException("Slug de cupón ya registrado", HttpStatus.CONFLICT)
        }
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

        // BUSQUEDA DE ALGUN CUPON SLUG
        const slugInUse = await this.cuponesRepository.findOne({
            where: {
                slug: updateCuponeDto.slug,
                status: true
            }
        });
        //BUSQUEDA DEL CUPON A ACTUALIZAR POR ID
        const cuponToUpdate = await this.cuponesRepository.findOne({
            where: {
                id
            }
        });
        if (!cuponToUpdate) {
            throw new HttpException(`Cupón con id ${id} no encontrado`, HttpStatus.NOT_FOUND);
        }
        //SI SLUGINUSE EXISTE Y SU ID ES DIFERENTE AL ID QUE SE ENVIA ENTONCES HAY ERROR PORQUE NO ES SOBRRESCITURA
        if (slugInUse && slugInUse.id !== cuponToUpdate.id) {
            throw new HttpException("Slug ya en uso, intenta alguno nuevo", HttpStatus.CONFLICT);
        }

        cuponToUpdate.nombre = updateCuponeDto.nombre;
        cuponToUpdate.slug = updateCuponeDto.slug
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
