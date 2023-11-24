import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import Sidenav from '../Sidenav'
import Navbar from './Navbar';
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
import { NavLink, useParams } from 'react-router-dom';

const FacultyDetail = () => {
  const [element, setFacultydata] = useState([])
  console.log(element) 
  const {id} = useParams(" ")

  const getfaculty = async () => {
      


    const add = await fetch(`http://localhost:5000/facultyview/${id}`, {
       method: 'get',

       headers: {
          'Content-Type': 'application/json',
       },
    });

    const data = await add.json();
    console.log(data)

    if (add.status === 404 || !data) {
       alert("error")
       console.log("error")
    }
    else {
       setFacultydata(data)
       console.log(" get data")
    }
 }
 useEffect(()=>{
  getfaculty()
 },[])

 const deletefaculty = async(id)=>{
  
  const add2 = await fetch(`http://localhost:5000/deletefaculty/${id}`,{
     method: "DELETE",
     headers: {
       'Content-Type': 'application/json',
   }
  })

  const deletedata = await add2.json();
  console.log(deletedata)

  if(add2.status === 422 || !deletedata){
     console.log("error");
  }
  else{
     console.log("faculty data deleted")
     getfaculty();
  }
}
 
  return (
    <>
    <Navbar />
     <Sidenav />
    <div className='size'>
      <h1 className='details'>Profile</h1>
      <hr className='line'></hr>
      <Card sx={{maxwidth: 900}}>
        <CardContent>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5s1RX9JYk5XAvX3lVbNmM6XKQ9UlCEKoqmg&usqp=CAU" style={{ width: 80 }} alt="profile" />
              <h2 className='mt-3'><BadgeIcon /> First Name: <span >{element.firstname}</span></h2>
              <h2 className='mt-3'><BadgeIcon /> Last Name: <span >{element.lastname}</span></h2>
              <h2 className='mt-3'><EmailIcon /> Email:<span >{element.email}</span></h2>
              <h2 className='mt-3'><CallIcon /> Contact:<span >{element.contactnumber}</span></h2>
              <h2 className='mt-3'><LaptopChromebookIcon /> Course:<span>{element.courses}</span></h2>
              <h2 className='mt-3'><VpnKeyIcon /> Password:<span>{element.password}</span></h2>

            </div>

            <div className='right_view  col-lg-6 col-md-6 col-12'>
              <div className='add-btn'>
                <NavLink to={`http://localhost:3000/facultyupdate/${element._id}`}><button className='btn btn-primary mx-2'><EditIcon /></button></NavLink>
                <button className='btn btn-danger' onClick={()=>deletefaculty(element._id)}><DeleteIcon /></button>
              </div>
              <h2 className='mt-3'><SchoolIcon /> Qualifications: <span>{element.highestqualification}</span></h2>
              <h2 className='mt-3'><HomeIcon /> Current Address: <span>{element.cuurentaddress}</span></h2>
              <h2 className='mt-3'><MapsHomeWorkIcon /> Permanenet Address: <span>{element.permanentaddress}</span></h2>
              <h2 className='mt-3'><BusinessIcon /> Institute Name: <span>{element.institutename}</span></h2>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    </>
  )
}

export default FacultyDetail
