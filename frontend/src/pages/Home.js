import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Home(){

  const navigate = useNavigate();

  const [message,setMessage] = useState("");

  useEffect(()=>{

    const getHome = async () => {

      try{

        const res = await API.get("/home");

        setMessage(res.data.message);

      }catch(err){

        // If token invalid redirect to login
        navigate("/");

      }

    };

    getHome();

  },[]);


  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return(

    <div>

      <h2>Home Page</h2>

      <p>{message}</p>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Home;