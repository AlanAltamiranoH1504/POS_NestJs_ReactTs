import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindManyOptions} from "typeorm";
import {ContenidoTransacciones, Transaction} from "./entities/transaction.entity";
import {Producto} from "../productos/entities/producto.entity";
import {endOfDay, isAfter, isValid, parseISO} from 'date-fns';
import {Cupone} from "../cupones/entities/cupone.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(ContenidoTransacciones) private readonly contenidoTransacccionesRepository: Repository<ContenidoTransacciones>,
        @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
        @InjectRepository(Cupone) private readonly cuponesResitory: Repository<Cupone>
    ) {
    }

    async create(createTransactionDto: CreateTransactionDto) {
        // Inicio de transaccion
        return await this.transactionRepository.manager.transaction(async (manager) => {
            const total = createTransactionDto.contenido.reduce((acumulador, cote) => {
                return acumulador + (cote.precio) * cote.cantidad;
            }, 0);
            let descuento = 0;

            //Aplicacion de cupon
            if (createTransactionDto.cupon) {
                const cuponToAply = await this.cuponesResitory.findOne({
                    where: {
                        slug: createTransactionDto.cupon,
                        status: true
                    }
                });
                if (!cuponToAply) {
                    throw new HttpException("Cupón no encontrado", HttpStatus.NOT_FOUND);
                }

                const fechaActual = new Date();
                const fechaExpiracionCupon = endOfDay(cuponToAply.fecha_expiracion);
                if (isAfter(fechaActual, fechaExpiracionCupon)) {
                    throw new HttpException("Cupón expirado", HttpStatus.CONFLICT);
                }
                descuento = total * (cuponToAply.porcentaje / 100);
            }

            if (total !== createTransactionDto.total) {
                throw new HttpException("Monto total no correcto", HttpStatus.BAD_REQUEST);
            }

            const transaccion = new Transaction();
            transaccion.total = total - descuento;
            transaccion.cupon = createTransactionDto.cupon;
            transaccion.descuento = descuento
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
            return {
                status: true,
                message: "Transacción realizada correctamente"
            }
        });
    }

    findAll(formatDate?: string) {
        let options: FindManyOptions = {
            relations: ["contenido", "contenido.producto"],
        }
        if (formatDate) {
            const date = parseISO(formatDate);
            if (!isValid(date)) {
                throw new HttpException("Fecha no valida", HttpStatus.BAD_REQUEST);
            }
            options.where = {
                fechaTransaccion: date
            }
        }
        return this.transactionRepository.find(options);
    }

    async findOne(id: number) {
        const transaction_to_found = await this.transactionRepository.findOne({
            where: {id: id},
            relations: ["contenido", "contenido.producto"]
        });
        if (!transaction_to_found) {
            throw new HttpException("Transacción no encontrada", HttpStatus.NOT_FOUND)
        }
        return transaction_to_found;
    }

    update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }

    async remove(id: number) {
        return await this.transactionRepository.manager.transaction(async (manager) => {
            const transaction_to_delete = await manager.findOne(Transaction, {
                where: {id: id},
                relations: ["contenido", "contenido.producto"]
            });
            if (!transaction_to_delete) {
                throw new HttpException(`Transaccion con id ${id} no encontrada`, HttpStatus.NOT_FOUND);
            }
            for (const contenido of transaction_to_delete.contenido) {
                const producto = await manager.findOne(Producto, {
                    where: {id: contenido.producto.id}
                });
                if (!producto) {
                    throw new HttpException("Producto no encontrado", HttpStatus.NOT_FOUND);
                }
                producto.inventario = contenido.cantidad;
                await manager.save(producto);
            }
            await manager.delete(Transaction, transaction_to_delete.id);
            return {
                status: true,
                message: "Transacción eliminada correctamente",
            }
        });
    }
}
