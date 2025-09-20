import {Column} from "typeorm";
import {IsNotEmpty, IsString, Max, MaxLength} from "class-validator";

export class AplicarCuponDtoTs {
    @IsNotEmpty({message: "El slug del cupón a aplicar es obligatorio"})
    @IsString({message: "El slug del cupón a aplicar debe ser una cadena de texto"})
    @MaxLength(10, {message: "El slug no puede ser mayor a 10 caracteres"})
    slug: string;
}
