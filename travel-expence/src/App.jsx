import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import EmailLinkLoginPage from './Pages/Emaillogin'
import FinishSignUp from './Pages/FinishSignup'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import BudgetPage from './Pages/AddBuget'
import Navbar from './Components/Navbar'


function App() {
  

  return (
    <div className="app">
      <Navbar/>
      <Routes>
      <Route path='/addbuget' element={<BudgetPage/>}/>
       <Route element={<PrivateRoute/>}>
       <Route path="/" element={<Home/>}/>
       </Route>
       <Route path='/login' element={<EmailLinkLoginPage/>}/>
       <Route path='/finshsignup' element={<FinishSignUp/>}/>
       <Route path='test' element={<Home/>}/>
      </Routes>
      
        
    </div>
  )
}

export default App
