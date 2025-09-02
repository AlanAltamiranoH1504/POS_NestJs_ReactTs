import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Categoria} from "../../categorias/entities/categoria.entity";

@Entity("productos")
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255, unique: true, nullable: false})
    nombre: string;

    @Column({type: "varchar", length: 255, nullable: true, default: "default.svg"})
    imagen: string;

    @Column({type: "decimal", nullable: false, default: 1})
    precio: number;

    @Column({type: "int", nullable: false, default: 1})
    inventario: number;

    @ManyToOne(() => Categoria, categoria => categoria.productos, {cascade: true})
    categoria: Categoria;
}
