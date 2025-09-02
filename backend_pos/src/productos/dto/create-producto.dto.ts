import {IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductoDto {
    @IsString({message: "El nombre del producto debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre del producto es obligatorio"})
    nombre: string;

    @IsNotEmpty({message: "El precio del producto es obligatorio"})
    @IsNumber({maxDecimalPlaces: 2}, {message: "El precio del producto debe tener maximo 2 decimales"})
    precio: number;

    @IsInt({message: "El invetario del producto debe ser un numero entero"})
    @IsNotEmpty({message: "El inventario del producto es obligatorio"})
    inventario: number;

    @IsInt({message: "La categoria no es valida"})
    @IsNotEmpty({message: "La categoria es obligatoria"})
    categoriaId: number;
}
