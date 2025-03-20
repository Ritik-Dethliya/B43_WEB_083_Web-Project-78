import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import EmailLinkLoginPage from './Pages/Emaillogin'
import FinishSignUp from './Pages/FinishSignup'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'


function App() {
  

  return (
    <div className="app">
      <Routes>
       <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<EmailLinkLoginPage/>}/> 
      </Routes>
      
        
    </div>
  )
}

export default App
