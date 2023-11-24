import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import {NavLink} from 'react-router-dom';



const Students = () => {
    const [getuserdata, setUserdata ] = useState([]);
    console.log(getuserdata)
        const navigate = useNavigate();
       
        const getdata = async (e) => {
       
          console.log("hello");
         
              
  
              const res = await fetch("http://localhost:5000/getdata", {
                  method: 'get',
                  
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
  
              const data = await res.json();
              console.log(data)
  
              if(res.status === 404 || !data ){
                  
                console.log("error");
            }
            else{
              setUserdata(data)
               
            }
          }

          useEffect(()=> {
            getdata()
          },[])
  return (

    <>
    <Box sx={{ display: 'flex' }}>
   
  {/* <center> <h1>Total Students</h1></center> */}
   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
   <table class="table">
  <thead>
    <tr class="table-dark">
      <th scope="col">S.No</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
      <th scope="col">Course</th>
      <th scope="col" className='th'>Edit</th>
      
      
    </tr>
  </thead>
  <tbody>
    {
      getuserdata.map((element,id)=>{
        return(
          <>
          <tr>
      <th scope="row">{id + 1}</th>
      <td>{element.firstname}</td>
      <td>{element.lastname}</td>
      <td>{element.email}</td>
      <td>{element.contactnumber}</td>
      <td>{element.courses}</td>
      <td className="d-flex justify-content-between" >
        
        <NavLink to={`http://localhost:3000/viewstudent/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon/></button> </NavLink>
        
        
       
      </td>
    </tr>
          </>
        )
      })
    }
  
    
  </tbody>
</table>
       

      </Box>
   </Box>
  
   </>
  )
}

export default Students
