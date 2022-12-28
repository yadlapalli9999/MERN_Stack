import { Navigate } from "react-router-dom"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({children}){
    let dispatch = useDispatch();
    let {user} = useSelector((state)=>state.user)
    const getUser = async()=>{
        try{
            dispatch(showLoading())
            let res = await axios.post('/api/v1/users/getUserData',{token:localStorage.getItem("token")},{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token") 
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }
            else{
             return <Navigate to="/login" />
             localStorage.clear()
             
              
            }
        }
        catch(error){
            dispatch(hideLoading())
            localStorage.clear()
            console.log(error);

        }
    }
    useEffect(()=>{
        if(!user){
            getUser()
        }
    },[user,getUser])
   if(localStorage.getItem('token')){
       return children
   }else{
     return <Navigate to="/login"/>
   }
}