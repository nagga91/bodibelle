import React, { useContext } from 'react'
import { authStore } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import OrderContext from '../context/OrderContext'

function ProtectedRoutes() {
    const {auth}=useContext(authStore)

 if(auth){
   return <Outlet/>
 }
 else{
    return <Navigate to={"/login"}/>
 }

}

export default ProtectedRoutes
