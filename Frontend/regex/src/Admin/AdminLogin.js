import { useState } from "react"
import Admin from "./Admin";
import { Link, useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";



const AdminLogin=()=>{
    const[email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = localStorage.getItem("admin")
    const signup=()=>{
    
          navigate('/AdminSignup')
    }

    const AdminPanel=()=>{
    
        
            // { auth ? <Link navigate('/adminpanel')></Link> :  <Link to="/adminsignup"></Link> } 
             { auth ? navigate("/adminpanel") :  <Link to="/adminsignup"></Link> } 
        
    }
        
    
    // const signup = () => navigate('/AdminSignup');
    return(
        <div className="register">
        <h1>Login</h1>
        
        <input className="inputbox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
        <input className="inputbox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
        <button  className='button' type="button" onClick={AdminPanel} >Login</button>
        <button  className='button' type="button" onClick={signup}>signup</button>
        </div>
    )

}
export default AdminLogin;