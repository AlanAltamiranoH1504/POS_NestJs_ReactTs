import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("cupones")
export class Cupone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    nombre: string;

    @Column({type: "varchar", length: 10})
    slug: string;

    @Column({type: "int"})
    porcentaje: number;

    @Column({type: "date"})
    fecha_expiracion: Date;

    @Column({type: "boolean", default: true})
    status: boolean;
}
