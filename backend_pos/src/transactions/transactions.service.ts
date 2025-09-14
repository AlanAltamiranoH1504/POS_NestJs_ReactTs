import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ContenidoTransacciones, Transaction} from "./entities/transaction.entity";
import {Producto} from "../productos/entities/producto.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(ContenidoTransacciones) private readonly contenidoTransacccionesRepository: Repository<ContenidoTransacciones>,
        @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>
    ) {
    }

    async create(createTransactionDto: CreateTransactionDto) {
        // Inicio de transaccion
        return await this.transactionRepository.manager.transaction(async (manager) => {
            const total = createTransactionDto.contenido.reduce((acumulador, cote) => {
                return acumulador + cote.precio;
            }, 0);
            if (total !== createTransactionDto.total) {
                throw new HttpException("Monto total no correcto", HttpStatus.BAD_REQUEST);
            }

            const transaccion = new Transaction();
            transaccion.total = createTransactionDto.total;
            await manager.save(transaccion);

            for (const contenido of createTransactionDto.contenido) {
                const producto = await manager.findOneBy(Producto, {id: contenido.productoId});
                if (!producto) {
                    throw new HttpException(`Producto con id ${contenido.productoId} no encontrado`, HttpStatus.NOT_FOUND);
                }
                if (producto.inventario < contenido.cantidad) {
                    throw new HttpException(`Invetario no disponible para el producto ${producto.nombre}`, HttpStatus.BAD_REQUEST);
                }
                producto.inventario -= contenido.cantidad;
                await manager.save(producto);
                const nuevo_contenido = this.contenidoTransacccionesRepository.create({
                    cantidad: contenido.cantidad,
                    precio: contenido.precio,
                    producto: {id: contenido.productoId},
                    transaction: transaccion
                });
                await manager.save(nuevo_contenido); //Fin de transaccion
            }
            return "Venta almacenada";
        });
    }

    findAll() {
        return `This action returns all transactions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} transaction`;
    }

    update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} transaction`;
    }
}
