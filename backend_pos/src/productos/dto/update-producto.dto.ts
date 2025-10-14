import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import {IsInt, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsNotEmpty({message: "El nombre del producto es obligatorio"})
    @IsString({message: "Nombre de producto no valido"})
    nombre: string;

    @IsNotEmpty({message: "El precio del producto es obligatorio"})
    @IsNumber({maxDecimalPlaces: 2}, {message: "El precio del producto debe tener maximo 2 decimales"})
    precio: string;

    @IsInt({message: "El invetario del producto debe ser un numero entero"})
    @IsNotEmpty({message: "El inventario del producto es obligatorio"})
    inventario: string;

    @IsInt({message: "La categoria no es valida"})
    @IsNotEmpty({message: "La categoria es obligatoria"})
    categoriaId: string;
}
