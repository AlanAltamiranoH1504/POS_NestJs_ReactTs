import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsString({message: "El nombre de la categoria debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre de la categoria es obligatorio"})
    nombre: string;
}
