import {IsInt, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductoDto {
    @IsString({message: "El nombre del producto debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre del producto es obligatorio"})
    nombre: string;

    @IsNotEmpty({message: "El precio del producto es obligatorio"})
    @IsString({message: "El precio del producto debe tener maximo 2 decimales"})
    precio: string;

    @IsString({message: "El invetario del producto debe ser un numero entero"})
    @IsNotEmpty({message: "El inventario del producto es obligatorio"})
    inventario: string;

    @IsString({message: "La categoria no es valida"})
    @IsNotEmpty({message: "La categoria es obligatoria"})
    categoriaId: string;

}
