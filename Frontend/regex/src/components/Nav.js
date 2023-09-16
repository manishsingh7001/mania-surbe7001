import React from 'react';
import {Link} from 'react-router-dom';
import AdminSignup from '../Admin/AdminSignup';
import Admin from '../Admin/Admin';
import  {useNavigate} from 'react-router-dom'

 const Nav = ()=> {
  const auth = localStorage.getItem("admin")
  const navigate = useNavigate();
  const logout=()=>{
      console.warn("hello")
      localStorage.clear()
      navigate('/adminsignup')
  }
  return (
    <div>
      <img className='logo'
      src="https://media.licdn.com/dms/image/C561BAQFfFoktpKwiOA/company-background_10000/0/1590136243420/regexsoftware_cover?e=1693767600&v=beta&t=Py0mvzWdwXYWhFN4YN7j0sAhN6LUIqN9P1phBMRr960"
      alt=""/>
      <ul className='nav-ul'>
        <li> <Link to="/home">Home</Link> </li>
        <li> <Link to="/about">About Us</Link> </li>
        <li> <Link to="/contact">Contact Us</Link> </li>
        <li> <Link to="/courses">Courses</Link> </li>
        <li> <Link to="/user">User</Link> </li>
        <li> <Link to="/admin"></Link> </li>
       
        <li> { auth ? <Link onClick={logout} to="/AdminLogin">Logout</Link> :  <Link to="/adminsignup"></Link> } </li>
      </ul>
    </div>
  )
}

export default Nav;
