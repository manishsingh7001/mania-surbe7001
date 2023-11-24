import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
const UserLogin = () => {

    const navigate = useNavigate();

    const[email,setEmail]=useState("");
    const [password, setPassword] = useState("");

    

    const auth = localStorage.getItem("user")


    const signup=()=>{
    
          navigate('/UserSignup')
    }

    const AdminPanel=()=>{
    
        
            // { auth ? <Link navigate('/adminpanel')></Link> :  <Link to="/adminsignup"></Link> } 
            //  { auth ? navigate("/userpanel") :  <Link to="/usersignup"></Link> } 
        
    }
  return (
    
       <div className="register">
        <h1>Login</h1>
        
        <input className="inputbox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
        <input className="inputbox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
        {/* <button  className='button' type="button" onClick={userPanel} >Login</button> */}
        <button  className='button' type="button" onClick={signup}>signup</button>
        </div>
    
  )
}

export default UserLogin;
