import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Signup( ){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    const signup = async( )=>{
        try{
            const res = await API.post("/signup",{
                name,email,password
            });
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/home");
        }catch(err){
            alert(err?.response?.data?.message || "Signup failed");
        }
    };
    return(
        <div>
      <input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

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

<button onClick={signup}>
    Signup
</button>

        </div>
    )
}

export default Signup;