import { useState , useRef, useEffect, useContext} from "react";
import axios from 'axios'
import { DataContex } from "../ContextApi/DataContext";
import Information from "../Components/Information";
import ExpenceDetails from "../Components/ExpenceDetails";
import AddExpence from "../Components/AddExpence";
function Home() {
    
    
    const expenceNameref=useRef(null)
    const exenceValueref=useRef(null)
    const categoriref=useRef(null)
    const email=window.localStorage.getItem("emailForSignIn").replace(/\./g,"_")
    console.log(email)
    const {expenses,setexpance,buget,total,remain,setremain,setTotal,setbuget}=useContext(DataContex)

    
    return ( 
        <div className="container flex flex-col p-2">
            <Information/>
            <AddExpence/>
            <ExpenceDetails/>
        </div>
     );
}


export default Home;