import React, { useState } from 'react'
import { useEffect } from 'react';
import Sidenav from '../Sidenav'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';

const Update = () => {
    // hello world


    const [inpval, setINP] = useState({
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
        gender: " ",
        referalcode: " "

    })
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    // const [firstname, setFirstName] = useState();
    // const [lastname, setLastName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [currentaddress, setCurrentAddress] = useState();
    // const [permanentaddress, setPermanentAddress] = useState();
    // const [institutename, setInstituteName] = useState();
    // const [highestqualification, setHighestQualification] = useState();
    // const [courses,setCourses] = useState();
    // const [contactnumber, setContactNumber] = useState();
    // const [alternatenumber, setAlternateNumber] = useState();
    // const [gender, setGender] = useState();
    // const [referalcode, setReferalCode] = useState();

    // const [getuserdata,setUserdata] = useState([])
    // console.log(getuserdata)


    const { id } = useParams("");
    console.log(id)

    const getdata = async () => {

        // console.log("hello");



        const res = await fetch(`http://localhost:5000/getuser/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        console.log(data)

        if (res.status === 404 || !data) {

            console.log("error");
        }
        else {

            setINP(data)
            console.log("get data")
        }
    }

    useEffect(() => {
        getdata()
    }, []);



    const updateuser = async (e) => {
        e.preventDefault();
        console.log("hello");

        const { firstname, lastname, email, password, currentaddress, permanentaddress, institutename, courses, highestqualification, gender, contactnumber, alternatenumber, referalcode } = inpval;
        const res2 = await fetch(`http://localhost:5000/updateuser/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                currentaddress,
                permanentaddress,
                institutename,
                courses,
                highestqualification,
                gender,
                contactnumber,
                alternatenumber,
                referalcode
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data2 = await res2.json();
        console.warn(data2);
        // localStorage.setItem("addstudents", JSON.stringify(data));
        if (res2.status === 422 || !data2) {
            alert("fill the data");
        }
        else {

            alert("data updated successfully")

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
                        <h3>Update Student</h3>
                        <div>
                            <label>First Name:</label>
                            < input className="inputbox" type='text' name='firstname' value={inpval.firstname} onChange={setdata} />
                        </div>

                        <div>
                            <label>Last Name:</label>
                            < input className="inputbox" type='text' name='lastname' value={inpval.lastname} onChange={setdata} />
                        </div>

                        <div>
                            <label>Email:</label>
                            < input className="inputbox" type='email' name='email' value={inpval.email} onChange={setdata} />
                        </div>

                        <div>
                            <label>Password:</label>
                            < input className="inputbox" type='text' name='password' value={inpval.password} onChange={setdata} />
                        </div>

                        <div>
                            <label>Current Address:</label>
                            < input className="inputbox" type='text' name='currentaddress' value={inpval.currentaddress} onChange={setdata} />
                        </div>

                        <div>
                            <label>Permamnent Address:</label>
                            < input className="inputbox" type='text' name='permanentaddress' value={inpval.permanentaddress} onChange={setdata} />
                        </div>

                        <div>
                            <label>Institute Name:</label>
                            < input className="inputbox" type='text' name='institutename' value={inpval.institutename} onChange={setdata} />
                        </div>

                        <div>
                            <label>Highest Qualification:</label>
                            < input className="inputbox" type='text' name='highestqualification' value={inpval.highestqualification} onChange={setdata} />
                        </div>

                        <div className='radio'>
                            <label>Gender:</label>
                            < input type='radio' value="Male" name='gender' checked={inpval.gender === "Male"} onChange={setdata} /> <span>Male</span>
                            < input type='radio' value="Female" name='gender' checked={inpval.gender === "Female"} onChange={setdata} /> <span>Female</span>
                            < input type='radio' value="Other" name='gender' checked={inpval.gender === "Other"} onChange={setdata} /> <span>Other</span>
                        </div>

                        <div>
                            <label>Courses:</label>
                            < input type='text' value={inpval.courses} name='courses' onChange={setdata} className='inputbox' />
                        </div>

                        <div>
                            <label>Contact No:</label>
                            < input className="inputbox" type='number' name='contactnumber' value={inpval.contactnumber} onChange={setdata} />
                        </div>

                        <div>
                            <label>Alternate No:</label>
                            < input className="inputbox" type='number' name='alternatenumber' value={inpval.alternatenumber} onChange={setdata} />
                        </div>

                        <div>
                            <label>Referal Code:</label>
                            < input className="inputbox" type='text' name='referalcode' value={inpval.referalcode} onChange={setdata} />
                        </div>

                        <button type='button' className='button' onClick={updateuser} >Submit</button>


                    </form>

                </div>




                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                </Box>
            </Box>

        </>
    )
}

export default Update;
