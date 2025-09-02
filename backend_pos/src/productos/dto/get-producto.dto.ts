import {IsNumberString, IsOptional} from "class-validator";

export class GetProductosQueryDTO {
    @IsOptional()
    @IsNumberString({}, {message: "La categoria debe ser un numero"})
    categoria_id?: number;

    @IsOptional()
    @IsNumberString({}, {message: "La cantidad debe ser un numero"})
    take: number;

    @IsOptional()
    @IsNumberString({}, {message: "La pagina debe ser un numero"})
    page: number;
}