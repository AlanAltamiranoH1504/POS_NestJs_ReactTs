import {IsNumberString, IsOptional} from "class-validator";

export class GetProductosQueryDTO {
    @IsOptional()
    @IsNumberString({}, {message: "La categoria debe ser un numero"})
    categoria_id?: number;
}