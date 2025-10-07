import {formatoMoneda} from "../../../helpers";

type TransactionSummaryProps = {
    sales: any
}
const TransactionSummary = ({sales}: TransactionSummaryProps) => {
    // const totalAmountSales = sales.reduce((acum, item) => {
    //     return acum += item.total;
    // });
    // console.log(totalAmountSales);

    // console.log(sales)
    return (
        <>
            <div className='mt-6  text-sm font-medium text-gray-500 border border-gray-200'>
                <p className='text-sm font-black text-gray-900 p-2 bg-gray-200 '>ID: {sales.id}</p>
                <ul
                    role="list"
                    className="divide-y divide-gray-200 border-t border-gray-200 border-b"
                >
                    {sales.contenido?.map((item: any) => (
                        <li className="p-5 ">
                            <div className='flex items-center space-x-6 '>
                                <div className='relative w-32 h-32'>
                                    <img alt={`Imagen de ${item.producto.nombre}`}
                                         src={`http://localhost:3000/img/${item.producto.imagen}`}/>
                                </div>
                                <div className="flex-auto space-y-1 ">
                                    <h3 className="text-gray-900">
                                        {item.producto.nombre}
                                    </h3>
                                    <p className="text-lg font-extrabold  text-gray-900"></p>
                                    <p className="text-lg  text-gray-900">Cantidad: {item.cantidad}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <dl className="space-y-6  text-sm font-medium text-gray-500 p-5">

                    <div className="flex justify-between">
                        <dt>Cupón Utilizado</dt>
                        <dd className="text-gray-900">{sales.cupon === null ? "No Aplicado" : sales.cupon}</dd>
                    </div>

                    <div className="flex justify-between">
                        <dt>Descuento</dt>
                        <dd className="text-gray-900">{sales.descuento === null ? "Sin descuento" : formatoMoneda(sales.descuento)}</dd>
                    </div>

                    <div className="flex justify-between">
                        <dt className="text-lg text-black font-black">Total: {formatoMoneda(sales.total)}</dt>
                        <dd className="text-lg text-black font-black"></dd>
                    </div>
                </dl>
            </div>
        </>
    );
}
export default TransactionSummary;