import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Producto} from "../../productos/entities/producto.entity";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "decimal"})
    total: number;

    @Column({type: "varchar", length: 10, default: null})
    cupon: string;

    @Column({type: "decimal", default: null})
    descuento: number;

    @Column({type: "date", default: () => "CURRENT_TIMESTAMP(6)"})
    fechaTransaccion: Date;

    @OneToMany(() => ContenidoTransacciones, (transaccion) => transaccion.transaction)
    contenido: ContenidoTransacciones[]
}

@Entity()
export class ContenidoTransacciones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int"})
    cantidad: number;

    @Column({type: "decimal"})
    precio: number;

    @ManyToOne(() => Producto, (producto) => producto.id, {cascade: true, onDelete: "CASCADE"})
    producto: Producto;

    @ManyToOne(() => Transaction, (transaction) => transaction.contenido, {cascade: true, onDelete: "CASCADE"})
    transaction: Transaction;
}
