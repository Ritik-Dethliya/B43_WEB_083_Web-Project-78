import { useContext } from "react";
import { DataContex } from "../ContextApi/DataContext";
import axios from "axios";
import { useState } from "react";

function ExpenceDetails() {
    const [loding,setLoding]=useState(false)
    const {expenses,total,remain,buget,setexpance,setTotal,setremain}=useContext(DataContex)
    const email=window.localStorage.getItem("emailForSignIn").replace(/\./g,"_")

    const handleDelet=async(id)=>{
        try{
            setLoding(true)
            let realres= await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
            let userdata=realres.data?.data||[]
            userdata.splice(id,1)
            if(userdata.length!=0){
                let res=await axios.patch(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,{data:userdata})
                setexpance(res.data.data)
                let remaindata=res.data.data
                //console.log(res.data.data)
                let totals=remaindata.reduce((sum,val)=>{
                    if(val.amount!=null)
                    return sum+Number(val.amount)
                },0)
                setTotal(totals)
                setremain(buget-totals)
                
            }
            else{
                
                let res=await axios.patch(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,{data:[]})
                setexpance([])
                setTotal(0)
                setremain(buget)
            }
            setLoding(false)
            alert("Delete Expence Succefully")
        }
        catch(err){
            setLoding(false)
            console.log(err)
        }
    }

    return ( 
        <div className="details bg-gray-100 p-4 mt-4">
            <h2 className="text-2xl font-bold">Expense Details</h2>
            {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
            ) : (
            <ul className="space-y-2 mt-2">
                {expenses.map((expense, index) => (
                <li
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-lg flex justify-between"
                >
                    <div className="flex flex-col">
                    <h3 className="font-bold">{expense.category}</h3>
                    <p>{expense.details}</p>
                    </div>
                    <p className="text-xl font-semibold text-red-600">{expense.amount}</p>
                    
                    <button disabled={loding} 
                        onClick={()=>handleDelet(index)}
                         className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 disabled:bg-gray-400 transition-all"    
                    >
                            Delete</button>
                </li>
                ))}
          </ul>
            )}
        </div>
     );
}

export default ExpenceDetails;