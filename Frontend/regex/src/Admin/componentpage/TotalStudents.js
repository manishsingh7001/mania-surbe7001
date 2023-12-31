import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidenav from '../Sidenav'
import { Box } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar'
import {NavLink} from 'react-router-dom';
import Update from './Update'
import AddStudents from './AddStudents'
import Detail from './Detail';



const TotalStudents = () => {
  
  const [getuserdata, setUserdata ] = useState([]);
      const navigate = useNavigate();
     
      const getdata = async () => {
        try {
          const res = await fetch("http://localhost:5000/getdata", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("adminToken"),
            },
          });
      
          if (res.status === 401) {
            // Handle unauthorized access
            console.log("Unauthorized access. Redirect to login page.");
            navigate("/admin/login");
            return;
          }
      
          const responseData = await res.json();
      
      
          if (Array.isArray(responseData.data)) {
            // Update the state with the received data
            setUserdata(responseData.data);
          } else {
            // Handle other cases (e.g., 404 or invalid response)
            console.log("Unexpected response:", res.status, responseData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      
      useEffect(() => {
        getdata();
      }, []);
      




const deletestd = async (id)=> {
  // eslint-disable-next-line no-restricted-globals
  if(confirm("Are you sure you want to delete this student?")){
  const res2 = await fetch(`http://localhost:5000/delete-student/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + localStorage.getItem("adminToken"),
  }
  })
  const deleteuser = await res2.json();
  console.log(deleteuser);

  if(res2.status === 422 || !deleteuser){
    console.log("error");
  }
  else{
    console.log("student deleted successfully");
    navigate("/admin/totalstudents")
  }
}
}



  return (
   <>
   <Navbar/>

   <Box sx={{ display: 'flex' }}>
   <Sidenav/>
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
      <td className="d-flex justify-content-between">
        
      {localStorage.getItem("adminToken") ? (
        <NavLink to={`http://localhost:3000/admin/students/detail/${element._id}`}>
          <button className='btn btn-success'><RemoveRedEyeIcon/></button>
        </NavLink>
      ) : null}

      
       
       <NavLink to={`http://localhost:3000/admin/students/update/${element._id}`}><button  className='btn btn-primary'><EditIcon/></button></NavLink> 
       <button className='btn btn-danger' onClick={()=>deletestd(element._id)}><DeleteIcon/></button>
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

export default TotalStudents
