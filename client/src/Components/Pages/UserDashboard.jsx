import Header from "../UserDashboard/Header"
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';


const UserDashboard = () => {
    const navigate = useNavigate()
    const sessionValue = JSON.parse(sessionStorage.getItem('user'))
    useEffect(() => {
      if(sessionValue === null){
        navigate('/login');
    }else if(sessionValue.role === "dreambig.influencer") {
        navigate('/influencer-dashboard');
    } else if(sessionValue.role === "dreambig.user"){
        navigate('/user-dashboard');
    }else if(sessionValue.role === "dreambig.brand"){
      navigate('/brand-dashboard');
  }
    }, []);


     
        return <>
        <Header />
        <h1>This is the User Dashboard</h1>
    </>
    
    
}


export default UserDashboard