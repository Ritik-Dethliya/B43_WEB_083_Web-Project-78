import { useContext } from "react";
import { useState } from "react";
import { DataContex } from "../ContextApi/DataContext";
import axios from "axios";

const BudgetPage = () => {
  const [budget, setBudget] = useState("");
  const {total}=useContext(DataContex)
  const email=window.localStorage.getItem("emailForSignIn").replace(/\./g,"_")

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSaveBudget = async() => {
    try {
       let res=await axios.patch(`https://expence-tracker-49678-default-rtdb.firebaseio.com/users/${email}.json`,{"buget":budget}
        )
        alert(`Budget set to ₹${budget}`);
    } catch (error) {
        console.log(error)
    }
   
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-green-700">
        Set Your Budget
      </h1>

     
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Enter Budget (₹)
        </label>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          className="w-full p-2 border-2 border-green-500 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Enter amount..."
        />
      </div>

      
      <div className="mt-4 p-3 bg-gray-100 rounded-md">
        <p className="text-gray-800 font-medium">
          Total Expenses: <span className="font-bold text-red-600">₹{total}</span>
        </p>
      </div>

      
      <button
        onClick={handleSaveBudget}
        disabled={!budget || Number(budget) <= 0}
        className={`mt-4 w-full py-2 rounded-md text-white font-bold transition duration-300 ${
          !budget || Number(budget) <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Save Budget
      </button>
    </div>
  );
};

export default BudgetPage;
