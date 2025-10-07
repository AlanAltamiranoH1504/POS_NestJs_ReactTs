import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import {useState} from "react";
import {formatoFecha, formatoMoneda} from "../../../helpers";
import {useQuery} from "@tanstack/react-query";
import {findAllTransacctionGET} from "../../../services/TransaccionesService";
import TransactionSummary from "./TransactionSummary";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const SalesFilter = () => {
    const [date, setDate] = useState<Value>(new Date());
    const dateToString = date?.toString()!;
    const formatDate = formatoFecha(dateToString);
    const {data} = useQuery({
        queryKey: ["findAllTransactions", formatDate],
        queryFn: () => findAllTransacctionGET(formatDate),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!formatDate
    });

    let total = 0;
    if (data && data.length > 0) {
        total = data.reduce((acum: any, item: any) => {
            return acum = acum + Number(item.total);
        }, 0);
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
                <div className="lg:sticky lg:top-10">
                    <Calendar
                        value={date}
                        onChange={setDate}
                    />
                </div>
                <div>
                    {data && data.length === 0 ? (
                        <>Sin ventas</>
                    ) : (
                        <>
                            <h2 className="text-center text-xl font-semibold hover:text-green-500">Total de Venta x Dia: {formatoMoneda(total)}</h2>
                            {data?.map((item: any) => {
                                return (
                                    <>

                                        <TransactionSummary key={item.id} sales={item}/>
                                    </>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default SalesFilter;