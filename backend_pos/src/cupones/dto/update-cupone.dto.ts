import { PartialType } from '@nestjs/mapped-types';
import { CreateCuponeDto } from './create-cupone.dto';
import {Column} from "typeorm";
import {IsBoolean, IsDateString, IsIn, IsInt, IsNotEmpty, IsString, Max, Min} from "class-validator";

export class UpdateCuponeDto extends PartialType(CreateCuponeDto) {
    @IsString({message: "El nombre del cupón debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre del cupón es obligatorio"})
    nombre: string;

    @IsString({message: "El slug del cupon debe ser una cadena de texto"})
    @IsNotEmpty({message: "El slug del cupon es obligatorio"})
    slug: string;

    @IsInt({message: "El porcentaje de descuento debe ser un numero entero"})
    @Min(1, {message: "El porcentaje minimo de descuento es 1%"})
    @Max(99, {message: "El procentaje máximo de descuento es del 99%"})
    @IsNotEmpty({message: "El porcentaje de descuento es obligatorio"})
    porcentaje: number;

    @IsDateString({}, {message: "Formato de fecha no valido"})
    @IsNotEmpty({message: "La fecha de expiración es obligatoria"})
    fecha_expiracion: Date;

    @IsBoolean({message: "El status del cupon solo puede ser true o false"})
    @IsNotEmpty({message: "El status del cupon es obligatorio"})
    status: boolean;
}
