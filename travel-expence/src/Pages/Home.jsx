import { useState , useRef, useEffect} from "react";
import axios from 'axios'
function Home() {
    const[total,setTotal]=useState(0)
    const[remain,setremain]=useState("")
    const[buget,setbuget]=useState(10000)
    const [expenses,setexpance]=useState([])
    const expenceNameref=useRef(null)
    const exenceValueref=useRef(null)
    const categoriref=useRef(null)
    const email=window.localStorage.getItem("emailForSignIn").replace(/\./g,"_")
    console.log(email)

    async function getData(){
        let realres= await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
       
        if(realres==null){
            let res=await axios.patch(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,
                {"raju@gmail.com":{"email":"raju@gmail.com","name":"raju dethliya","password":123,"data":[{"buget":2000,"total":1000,"remain":1000,"expence":[]}]}})
        }else{
            let userdata=realres.data.data
            setexpance(userdata.slice(1))
            console.log(userdata)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(expenceNameref,categoriref,exenceValueref)
        let [amount,category,details]=[exenceValueref.current,categoriref.current,expenceNameref.current]
        if(expenceNameref.current==""|| categoriref.current=="" || exenceValueref.current=="" )return
        // setTotal((pre)=>{
        //     let newTotal=pre+Number(exenceValueref.current)
        //     let remainS=buget-newTotal
        //     setremain(remainS)
        //     return newTotal
        // })
        //setexpance([...expenses,{amount,category,details}])
        
        let realres= await axios.get(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`)
        let userdata=realres.data.data
        console.log(expenceNameref.current)
        //let patchData=[{amount:exenceValueref.current,category:categoriref.current,details:expenceNameref.current}]
        userdata.push({amount:exenceValueref.current,category:categoriref.current,details:expenceNameref.current})
        let res=await axios.patch(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,{data:userdata})
        console.log(res.data.data)
        setexpance(res.data.data)
        expenceNameref.current=""
    }
    return ( 
        <div className="container flex flex-col p-2">
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
                    <select name="type" id="" 
                        className="font-bold border-2 md:w-72  border-green-600 text-red-700 my-2 "
                        onChange={(e)=>categoriref.current=e.target.value}
                    >
                        <option value="">Select Categori</option>
                        <option value="utility" className="text-green-500 font-bold">utility</option>
                        <option value="entertament" className="text-red-900 font-bold">entertament</option>
                        <option value="bills" className="text-green-900 font-bold ">bills</option>
                    </select>
                    <button type="submit" className="bg-blue-500 rounded-xl md:w-72 p-1 w-40">Add</button>
                </form>
            </div>
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
                </li>
                ))}
          </ul>
        )}
      </div>
        </div>
     );
}


export default Home;