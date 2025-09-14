import {
    ArrayNotEmpty,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";

export class ContenidoTransaccionDto {
    @IsNotEmpty({message: "El id del producto no puede estar vacio"})
    @IsInt({message: "Producto no valido"})
    productoId: number;

    @IsNotEmpty({message: "La cantidad no puede estar vacia"})
    @IsInt({message: "Cantidad no valida"})
    cantidad: number;

    @IsNotEmpty({message: "El precio no puede estar vacio"})
    @IsNumber({}, {message: "Precio no valido"})
    precio: number
}

export class CreateTransactionDto {
    @IsNotEmpty({message: 'El Total no puede ir vacio'})
    @IsNumber({}, {message: 'Cantidad no válida'})
    total: number

    @IsArray()
    @ArrayNotEmpty({message: "Los cotenidos no pueden estar vacios"})
    @ValidateNested()
    @Type(() => ContenidoTransaccionDto)
    contenido: ContenidoTransaccionDto[]
}
