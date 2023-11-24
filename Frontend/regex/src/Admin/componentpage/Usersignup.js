import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
       
    })

    const collectData = async () => {
        console.warn(name, email, password)
        let result = await fetch('http://localhost:5000/usersignup', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result))
        // if(result){
        //     navigate('/admin')
        // }
    }
  return (
<div className="register">
    <h1>Register</h1>
    <input className="inputbox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name Here" />
    <input className="inputbox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
    <input className="inputbox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
    <button onClick={collectData} className='button' type="button">Signin</button>
</div>
  )
}

export default UserSignup
