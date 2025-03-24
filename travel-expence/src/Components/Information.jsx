import { useContext } from "react";
import { DataContex } from "../ContextApi/DataContext";

function Information() {
    const {total,remain,buget,setexpance,setTotal,setremain}=useContext(DataContex)
    
    return ( 
        <div className="information grid grid-cols-1 md:grid-cols-3 gap-4 text-xl md:text-3xl font-bold bg-blue-100 p-4 rounded-lg">
        <div className="totalExpence text-red-400 bg-red-100 p-4 shadow-lg rounded-md text-center">
          <h1 className="text-black">Total</h1>
          <p>{total}</p>
        </div>
        
        <div className="remain-exp text-green-400 bg-green-50 p-4 shadow-lg rounded-md text-center">
          <h1 className="text-black">Remain</h1>
          <p>{remain}</p>
        </div>
        
        <div className="buget text-green-900 bg-green-100 p-4 shadow-lg rounded-md text-center">
          <h1 className="text-black">Budget</h1>
          <p>{buget}</p>
        </div>
      </div>
      
    );
}

export default Information;
