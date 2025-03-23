import { useContext } from "react";
import { DataContex } from "../ContextApi/DataContext";

function Information() {
    const {total,remain,buget,setexpance,setTotal,setremain}=useContext(DataContex)
    
    return ( 
        <div className="information flex justify-between text-3xl font-bold bg-blue-100 p-2 ">
                
        <div className="totalExpence text-red-400 bg-red-100 p-2 shadow-lg">
            <h1 className=" text-black ">Total</h1>
                    {total}
        </div>
        <div className="remain-exp text-green-400 bg-green-50 p-2 shadow-lg">
            <h1 className=" text-black ">Remain</h1>
                    {remain}
        </div>
        <div className="buget text-green-900 bg-green-100 p-2 shadow-lg">
            <h1 className=" text-black ">Buget</h1>
                {buget}
        </div>
    </div>
    );
}

export default Information;
