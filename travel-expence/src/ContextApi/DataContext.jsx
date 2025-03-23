import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
export const DataContex=createContext()

export const DataContexProvider=({children})=>{
    const [expenses,setexpance]=useState([])
    const [buget,setbuget]=useState("")
    const [total,setTotal]=useState(0)
    const [remain,setremain]=useState(0)
    const email=window.localStorage.getItem("emailForSignIn").replace(/\./g,"_")
    const getExpence=async()=>{
        try{

            let res=await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
            let expencesdata=res.data.data
            if(expencesdata){
                setbuget(res.data.buget)
                setexpance(res.data.data)
                //console.log(expencesdata)
                let totals=expencesdata.reduce((sum,val)=>{
                    if(val.amount!=null){
                        return sum+Number(val.amount)
                    }
                    return sum
                },0)
                setremain(res.data.buget-totals)
                setTotal(totals)
                //console.log(remain)
            }
            else{
                setexpance([])
                setTotal("-")
                setremain("-")
                setbuget(0)
            }
        }
        catch(err){
            setexpance([])
            console.log(err.message)
        }
    }
    useEffect(()=>{
        getExpence()
    },[])

    return(
        <DataContex.Provider value={{expenses,buget,total,remain,setremain,setTotal,setexpance,setbuget}}>
            {children}
        </DataContex.Provider>
    )
}