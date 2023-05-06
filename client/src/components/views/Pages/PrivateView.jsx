import {useState,useEffect} from "react";
import jwt from "jsonwebtoken"
import axios from "axios";
import React from "react"
import { useNavigate } from "react-router-dom";

const User = (props) => {

    const [error,setError] =useState("");
    const [data,setData]=useState({});
    const navigator=useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem("authToken"))
        navigator("/login");

        const fetchData = async () => {
            const config= {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try {
                const {data}= await axios.get("/api/private",config);  //
                setData({
                    username :data.name,
                    email :data.email
                })
                console.log(data);
                
            }catch(err){
                localStorage.removeItem("authToken")
                setError("You are not authorized. Please Login")

            }
        }

        fetchData();
    },[navigator])
    

    const logoutHandler = () =>{

        localStorage.removeItem("authToken");
        navigator("/login");
    }
    return error ? (
        <span className="error-message">{error}</span>
      ) : (
        <>
        <div style={{background :"green", color:"white"}}>{data.username}  {data.email}</div>

        <button onClick={logoutHandler}>Logout</button>
        </>
  )
};

export default User;
