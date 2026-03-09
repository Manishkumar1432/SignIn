import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {

    try{

      const res = await API.post("/login",{
        email,
        password
      });

      // Save token in localStorage
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // Redirect to home page
      navigate("/home");

    }catch(err){

      alert(err?.response?.data?.message || "Login failed");

    }

  };

  return(

    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}

export default Login;