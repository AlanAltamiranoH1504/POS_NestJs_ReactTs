import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Producto} from "../../productos/entities/producto.entity";

@Entity("categorias")
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 60, unique: true, nullable: false})
    nombre: string;

    @OneToMany(() => Producto, productos => productos.categoria)
    productos: Producto[];
}
