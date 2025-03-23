import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

function PrivateRoute() {
    const {isAuth}=useContext(AuthContext);
    const emailFromStorage = window.localStorage.getItem('emailForSignIn');
   if(emailFromStorage)return( <Outlet/>)
   return <Navigate to="/login"/>
   
}

export default PrivateRoute;