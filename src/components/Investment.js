import { useState } from "react";
import { InvestmentForm } from "./InvestmentForm"
import { InvestmentList } from "./investmentList";
const Investment = (props) => {
    const [investmentTable, setInvestmentTable] = useState({});
    return (
        <>
            <div className="md:w-[750px] w-full mt-9 rounded-md bg-slate-700 shadow-lg p-12">
                <InvestmentForm data={(dt) =>{
                    setInvestmentTable(dt);
                }}/>
            </div>

            <div className="md:w-[750px] w-full mt-9 rounded-md bg-slate-900 shadow-lg p-12">
                <InvestmentList investmentTable={investmentTable} />
            </div>
        </>
    )
}

export {
    Investment
}