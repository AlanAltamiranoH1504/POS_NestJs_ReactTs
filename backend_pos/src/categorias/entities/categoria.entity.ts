import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("categorias")
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 60, unique: true, nullable: false})
    nombre: string;
}
