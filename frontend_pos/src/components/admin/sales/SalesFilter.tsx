import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import {useState} from "react";
import {formatoFecha} from "../../../helpers";
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

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
                <div>
                    <Calendar
                        value={date}
                        onChange={setDate}
                    />
                </div>
                <div>
                    {data && data.length === 0 ? (
                        <>Sin ventas</>
                    ) : (
                        data?.map((item: any) => {
                            return <TransactionSummary key={item.id} sales={item}/>
                        })
                    )}
                </div>
            </div>
        </>
    );
}
export default SalesFilter;