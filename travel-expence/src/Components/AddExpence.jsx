import {useRef,useContext,useEffect, useState} from 'react'
import { DataContex } from '../ContextApi/DataContext'
import axios from 'axios'

function AddExpence() {

    const expenceNameref=useRef("")
    const exenceValueref=useRef("")
    const categoriref=useRef("")
    const email=window.localStorage.getItem("emailForSignIn").replace(/\./g,"_")
    const {expenses,setexpance,buget,total,remain,setremain,setTotal,setbuget}=useContext(DataContex)
    const [loding,setLoding]=useState(false)

    async function checkUser(){
        try {  
            let res= await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
            if(!res.data){
                res=await axios.put(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,
                            {   "email":email,
                                "name":"xyz",
                                "password":123,
                                "buget":1000,
                                "data":[]
                        }
                    )
                    let userdata=res.data?.data ||[]
                    setexpance(userdata)
            } 
        } catch (error) {
         console.log(error.message)   
        }        
    }
    useEffect(()=>{
        checkUser()
        setTimeout(()=>{
            let totals=expenses.reduce((sum,val)=>{
                if(val.amount!=null){
                    return sum+Number(val.amount)
                }
                return sum
            },0)
        },5000)
        
    },[])

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setLoding(true)
        //console.log(expenceNameref,categoriref,exenceValueref)
        let [amount,category,details]=[exenceValueref.current,categoriref.current,expenceNameref.current]
        if(expenceNameref.current==""|| categoriref.current=="" || exenceValueref.current=="" ){
            setLoding(false)
            return
        }
        
        let realres= await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
        let userdata=realres.data?.data||[]
        // console.log(expenceNameref.current)
       
        userdata.push({amount:exenceValueref.current,category:categoriref.current,details:expenceNameref.current})
        let res=await axios.patch(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,{data:userdata})
        let curdata=res.data.data
        //console.log(res.data)
        setexpance(res.data.data)
        if(buget==0){
            let realres= await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
            console.log()
            setbuget(realres.data?.buget)

            let totals=curdata.reduce((sum,val)=>{
                if(val.amount!=null)
                return sum+Number(val.amount)
            },0)
            setTotal(totals)
            setremain(realres.data?.buget-totals)
            expenceNameref.current=""
            return 
        }
        
        //console.log(expenses)
        let totals=curdata.reduce((sum,val)=>{
            if(val.amount!=null)
            return sum+Number(val.amount)
        },0)
        setTotal(totals)
        setremain(buget-totals)
        expenceNameref.current=""
        setLoding(false)
    }

    return ( 
        <div className="addExpence bg-blue-50 mt-1 p-2  ">
                <form
                    onSubmit={handleSubmit} 
                    className="p-1 bg-gray-400 flex flex-col justify-rigth items-center"
                >
                    <h1 className="text-center text-2xl font-bold">Add Expence</h1>
                    <input type="text" 
                        ref={expenceNameref}
                        placeholder="Enter Expance details" 
                        className="p-2 b bg-white w-full my-1 rounded-lg"
                        onChange={(e)=>expenceNameref.current=e.target.value}
                    />
                    <input 
                        ref={exenceValueref}
                        type="number" 
                        placeholder="Enter Expance" 
                        className="p-2 b bg-white w-full my-1 rounded-lg "
                        onChange={(e)=>exenceValueref.current=e.target.value}
                    />
                    <select
                        name="type"
                        className="font-bold border-2 border-green-600 text-gray-800 my-2 w-full max-w-xs md:w-72 px-4 py-2 rounded-lg bg-white shadow-sm hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        onChange={(e) => (categoriref.current = e.target.value)}
                    >
                        <option value="" className="text-gray-500">✨ Select Category ✨</option>
                        <option value="utility" className="text-green-600 font-semibold">
                            ✅ Utility
                        </option>
                        <option value="entertainment" className="text-red-600 font-semibold">
                            🎭 Entertainment
                        </option>
                        <option value="bills" className="text-blue-600 font-semibold">
                            💰 Bills
                        </option>
                    </select>
                    <button disabled={loding} type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl md:w-72 w-40 p-2 transition-all duration-200 shadow-md disabled:bg-gray-400"
                        >
                        Add Expence</button>
                </form>
            </div>
     );
}

export default AddExpence;