import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidenav from '../Sidenav'
import Navbar from './Navbar';
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import CsvUploader from './AddCSV';


const AddStudents = () => {
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [currentaddress, setCurrentAddress] = useState();
    const [permanentaddress, setPermanentAddress] = useState();
    const [institutename, setInstituteName] = useState();
    const [highestqualification, setHighestQualification] = useState();
    const [contactnumber, setContactNumber] = useState();
    const [alternatenumber, setAlternateNumber] = useState();
    const [gender, setGender] = useState();
    const [courses, setCourses] = useState();
    const [referalcode, setReferalCode] = useState();

    
    
const navigate = useNavigate()
    const register = async (e) => {
        e.preventDefault();
        console.log("hello");
       
            

            const res = await fetch("http://localhost:5000/addstd", {
                method: 'post',
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password,
                    currentaddress,
                    permanentaddress,
                    institutename,
                    highestqualification,
                    gender,
                    courses,
                    contactnumber,
                    alternatenumber,
                    referalcode
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data)

            if(res.status === 404 || !data ){
                alert("Please Fill All The Fields In Form ");
                console.log("error");
            }
            else{
                alert("Data added")
            }
           
            

        //    const data= await std.json();
        //     console.warn(data);
        //     localStorage.setItem("addstudents", JSON.stringify(std));
        
   

    }

    



    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                {/* <h1>Add students</h1> */}
                <CsvUploader/>

                <div className='container'>

                    <form className="register">
                        <h3>Student register</h3>
                        <div>
                            <label>First Name:</label>
                            < input className="inputbox" type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div>
                            <label>Last Name:</label>
                            < input className="inputbox" type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div>
                            <label>Email:</label>
                            < input className="inputbox" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label>Password:</label>
                            < input className="inputbox" type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div>
                            <label>Current Address:</label>
                            < input className="inputbox" type='text' value={currentaddress} onChange={(e) => setCurrentAddress(e.target.value)} />
                        </div>

                        <div>
                            <label>Permamnent Address:</label>
                            < input className="inputbox" type='text' value={permanentaddress} onChange={(e) => setPermanentAddress(e.target.value)} />
                        </div>

                        <div>
                            <label>Institute Name:</label>
                            < input className="inputbox" type='text' value={institutename} onChange={(e) => setInstituteName(e.target.value)} />
                        </div>

                        <div>
                            <label>Highest Qualification:</label>
                            < input className="inputbox" type='text' value={highestqualification} onChange={(e) => setHighestQualification(e.target.value)} />
                        </div>

                        <div className='radio'>
                            <label>Gender:</label>
                            < input type='radio' value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> <span>Male</span>
                            < input type='radio' value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> <span>Female</span>
                            < input type='radio' value="Other" checked={gender === "Other"} onChange={(e) => setGender(e.target.value)} /> <span>Other</span>
                        </div>

                        <div>
                            <label>Courses:</label>
                            < input type='text' value={courses} onChange={(e) => setCourses(e.target.value)} className='inputbox' />
                        </div>

                        <div>
                            <label>Contact No:</label>
                            < input className="inputbox" type='number' value={contactnumber} onChange={(e) => setContactNumber(e.target.value)} />
                        </div>

                        <div>
                            <label>Alternate No:</label>
                            < input className="inputbox" type='number' value={alternatenumber} onChange={(e) => setAlternateNumber(e.target.value)} />
                        </div>

                        <div>
                            <label>Referal Code:</label>
                            < input className="inputbox" type='text' value={referalcode} onChange={(e) => setReferalCode(e.target.value)} />
                        </div>

                        <button type='button' className='button' onClick={register} >Submit</button>


                    </form>

                </div>




                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                </Box>
            </Box>

        </>
    )
}

export default AddStudents;




