import React, { useEffect } from 'react';
import { useState } from 'react';
import Sidenav from '../Sidenav';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Python from './Python';
import Java from './Java';
import Ml from './Ml';
import Mern from './Mern';
import { useNavigate } from 'react-router-dom';
const Courses = () => {
    
   const navigate=useNavigate();
   const Mern=()=>{
        navigate("/mern")
   }
   
   const Python=()=>{
      navigate("/python")
 }
 const Java=()=>{
   navigate("/java")
}
const Ml=()=>{
   navigate("/ml")
}


 
    return (
        <>
     <Navbar/>
        <Box sx={{ display: 'flex' }}>
        <Sidenav/>
        {/* <h1 className='course'>Courses</h1> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <Box className="box">

         <div className='cont'>
            <div class="box">

               <button className='course' onClick={Mern}>Mern</button>
               <button  className='course' onClick={Python}>Python</button>

            </div>
            <div class="box">

               <button className='course' onClick={Java}>Java</button>
               <button className='course' onClick={Ml}>ML</button>

            </div>
         </div>
         </Box>
        </Box>
        </Box>
        
        </>
       )
}

export default Courses;
