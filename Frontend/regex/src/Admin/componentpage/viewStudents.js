import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import Sidenav from '../Sidenav'
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import SchoolIcon from '@mui/icons-material/School';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import { NavLink, useNavigate } from 'react-router-dom';



const ViewStudents = () => {
    const {id} = useParams("") 
    console.log(id)
  
    const navigate = useNavigate();
  
    const [ getuserdata,setUserdata] = useState([]);
    console.log(getuserdata)
    
    
  
  
    const getdata = async () => {
       
      console.log("hello");
     
          
  
          const res = await fetch(`http://localhost:5000/getuser/${id}`, {
              method: 'get',
              
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          const data = await res.json();
          // console.log(data)
  
          if(res.status === 404 || !data ){
              
              console.log("error");
          }
          else{
            setUserdata(data)
             
          }
        }
  
        useEffect(()=>{
          getdata()
        },[])
  return (
    <div>
      <div className='size'>
      <h1 className='details'>Profile</h1>
      <hr className='line'></hr>
      <Card sx={{maxwidth: 900}}>
        <CardContent>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5s1RX9JYk5XAvX3lVbNmM6XKQ9UlCEKoqmg&usqp=CAU" style={{ width: 80 }} alt="profile" /> */}
              <h2 className='mt-3'><BadgeIcon /> First Name: <span >{getuserdata.firstname}</span></h2>
              <h2 className='mt-3'><BadgeIcon /> Last Name: <span >{getuserdata.lastname}</span></h2>
              <h2 className='mt-3'><EmailIcon /> Email:<span >{getuserdata.email}</span></h2>
              <h2 className='mt-3'><CallIcon /> Contact:<span >{getuserdata.contactnumber}</span></h2>
              <h2 className='mt-3'><LaptopChromebookIcon /> Course:<span>{getuserdata.courses}</span></h2>
              <h2 className='mt-3'><VpnKeyIcon /> Password:<span>{getuserdata.password}</span></h2>

            </div>

            <div className='right_view  col-lg-6 col-md-6 col-12'>
              <div className='add-btn'>
              </div>
              <h2 className='mt-3'><SchoolIcon /> Qualifications: <span>{getuserdata.highestqualification}</span></h2>
              <h2 className='mt-3'><HomeIcon /> Current Address: <span>{getuserdata.currentaddress}</span></h2>
              <h2 className='mt-3'><MapsHomeWorkIcon /> Permanenet Address: <span>{getuserdata.permanentaddress}</span></h2>
              <h2 className='mt-3'><BusinessIcon /> Institute Name: <span>{getuserdata.institutename}</span></h2>
              <h2 className='mt-3'>Refferal Code: <span>{getuserdata.referalcode}</span></h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    
   
    </div>
  )
}

export default ViewStudents
