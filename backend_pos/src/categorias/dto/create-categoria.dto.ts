/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: 'El nombre debe ser un cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    nombre: string;
}
