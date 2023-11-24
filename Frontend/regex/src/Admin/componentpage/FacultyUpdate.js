import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import Navbar from './Navbar'
import Sidenav from '../Sidenav'
import { useParams } from 'react-router-dom';

const FacultyUpdate = () => {
    // const [element, setFacultydata] = useState([])
    // console.log(element) 
    const [faculty, setFaculty] = useState({
        firstname: " ",
        lastname: " ",
        email: " ",
        password: " ",
        currentaddress: " ",
        permanentaddress: " ",
        institutename: " ",
        highestqualification: " ",
        courses: " ",
        contactnumber: " ",
        alternatenumber: " ",
        gender: " "
       
    
    })
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFaculty((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
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
        setFaculty(data)
         console.log(" get data")
      }
   }
   useEffect(()=>{
    getfaculty()
   },[])

   const updatefacultie = async(e)=>{
    e.preventDefault();

    const { firstname, lastname, email, password, currentaddress, permanentaddress, institutename, highestqualification, gender, courses, contactnumber, alternatenumber } = faculty;
    const add2 = await fetch(`http://localhost:5000/updatefaculty/${id}`,{
        method: 'PATCH',
        body:JSON.stringify({
            firstname, lastname, email, password, currentaddress, permanentaddress, institutename, highestqualification, gender, courses, contactnumber, alternatenumber
        }),

        headers: {
           'Content-Type': 'application/json',
        }
    })
    const data2 = await add2.json();
    console.log(data2);

    if(add2.status === 422 || !data2){
        alert("please fill the form")
    }
    else{
        alert("data add")
    }
   }
    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                {/* <h1>Add students</h1> */}

                <div className='container'>

                    <form className="register">
                        <h3>Update Faculty</h3>
                        <div>
                            <label>First Name:</label>
                            < input className="inputbox" type='text' name='firstname' value={faculty.firstname} onChange={setdata} />
                        </div>

                        <div>
                            <label>Last Name:</label>
                            < input className="inputbox" type='text' name='lastname' value={faculty.lastname} onChange={setdata} />
                        </div>

                        <div>
                            <label>Email:</label>
                            < input className="inputbox" type='email' name='email' value={faculty.email} onChange={setdata} />
                        </div>

                        <div>
                            <label>Password:</label>
                            < input className="inputbox" type='text' name='password' value={faculty.password} onChange={setdata} />
                        </div>

                        <div>
                            <label>Current Address:</label>
                            < input className="inputbox" type='text' name='currentaddress' value={faculty.currentaddress} onChange={setdata} />
                        </div>

                        <div>
                            <label>Permamnent Address:</label>
                            < input className="inputbox" type='text' name='permanentaddress' value={faculty.permanentaddress} onChange={setdata} />
                        </div>

                        <div>
                            <label>Institute Name:</label>
                            < input className="inputbox" type='text' name='institutename' value={faculty.institutename} onChange={setdata} />
                        </div>

                        <div>
                            <label>Highest Qualification:</label>
                            < input className="inputbox" type='text' name='highestqualification' value={faculty.highestqualification} onChange={setdata} />
                        </div>

                        <div className='radio'>
                            <label>Gender:</label>
                            < input type='radio' value="Male" name='gender' checked={faculty.gender === "Male"} onChange={setdata} /> <span>Male</span>
                            < input type='radio' value="Female" name='gender' checked={faculty.gender === "Female"} onChange={setdata} /> <span>Female</span>
                            < input type='radio' value="Other" name='gender' checked={faculty.gender === "Other"} onChange={setdata} /> <span>Other</span>
                        </div>

                        <div>
                            <label>Courses:</label>
                            < input type='text' value={faculty.courses} name='courses' onChange={setdata} className='inputbox' />
                        </div>

                        <div>
                            <label>Contact No:</label>
                            < input className="inputbox" type='number' name='contactnumber' value={faculty.contactnumber} onChange={setdata} />
                        </div>

                        <div>
                            <label>Alternate No:</label>
                            < input className="inputbox" type='number' name='alternatenumber' value={faculty.alternatenumber} onChange={setdata} />
                        </div>


                        <button type='button' className='button' onClick={updatefacultie} >Submit</button>


                    </form>

                </div>




                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                </Box>
            </Box>

        </>
    )
}

export default FacultyUpdate
