import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import {useState} from "react";
import {formatoFecha} from "../../../helpers";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const SalesFilter = () => {
    const [date, setDate] = useState<Value>(new Date());
    const dateToString = date?.toString()!;
    const formatDate = formatoFecha(dateToString);
    console.log(formatDate);
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
                    Ventas
                </div>
            </div>
        </>
    );
}
export default SalesFilter;