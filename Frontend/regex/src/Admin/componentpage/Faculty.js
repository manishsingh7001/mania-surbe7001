import React, { useEffect, useState } from 'react'
import Sidenav from '../Sidenav'
import Navbar from './Navbar'
import { Box } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FacultyDetail from './FacultyDetail';
import { NavLink, useNavigate } from 'react-router-dom'


const Faculty = () => {
   const navigate = useNavigate();
   const [element, setFacultydata] = useState([])
   console.log(element)

   // const navigate = useNavigate()
   // const view = () => {
   //    navigate('/facultydetail')
   // }
   // const update = () => {
   //    navigate('/facultyupdate')
   // }


   const getfaculty = async (e) => {



      const add = await fetch("http://localhost:5000/getfaculty", {
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

   useEffect(() => {
      getfaculty();
   }, []);

   const deletefaculty = async (id) => {

      const add2 = await fetch(`http://localhost:5000/deletefaculty/${id}`, {
         method: "DELETE",
         headers: {
            'Content-Type': 'application/json',
         }
      })

      const deletedata = await add2.json();
      console.log(deletedata)

      if (add2.status === 422 || !deletedata) {
         console.log("error");
      }
      else {
         console.log("faculty data deleted")
         navigate("/faculty")
      }
   }


   return (
      <>
         <Navbar />

         <Box sx={{ display: 'flex' }}>
            <Sidenav />
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
                        element.map((element, id) => {
                           return (
                              <>
                                 <tr>
                                    <th scope="row">{id + 1}</th>
                                    <td>{element.firstname}</td>
                                    <td>{element.lastname}</td>
                                    <td>{element.email}</td>
                                    <td>{element.contactnumber}</td>
                                    <td>{element.courses}</td>
                                    <td className="d-flex justify-content-between" >

                                       <NavLink to={`http://localhost:3000/facultydetail/${element._id}`}> <button className='btn btn-success' ><RemoveRedEyeIcon /></button> </NavLink>
                                       <NavLink to={`http://localhost:3000/facultyupdate/${element._id}`}><button className='btn btn-primary'><EditIcon /></button></NavLink>
                                       <button className='btn btn-danger' onClick={() => deletefaculty(element._id)}><DeleteIcon /></button>
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

export default Faculty
