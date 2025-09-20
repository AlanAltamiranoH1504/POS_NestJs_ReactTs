import {IsDateString, IsInt, IsNotEmpty, IsString, Max, Min, MinDate} from "class-validator";

export class CreateCuponeDto {
    @IsString({message: "El nombre del cupon debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre del cupon es obligatorio"})
    nombre: string;

    @IsString({message: "El slug del cupon debe ser una cadena de texto"})
    @IsNotEmpty({message: "El slug del cupon es obligatorio"})
    slug: string;

    @IsInt({message: "El porcentaje de descuento debe ser un numero entero entre 1 y 99"})
    @Min(1, {message: "El porcentaje minimo es de 1%"})
    @Max(99, {message: "El porcentaje maximo es de 99%"})
    @IsNotEmpty({message: "El porcentaje de descuento es obligatorio"})
    porcentaje: number;

    @IsDateString({}, {message: "Formato de fecha no valida, debe ser YYYY-mm-dd"})
    @IsNotEmpty({message: "La fecha de expiración es obligatoria"})
    fecha_expiracion: Date;
}
