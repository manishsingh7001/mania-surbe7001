// import React, { useState } from 'react'
// import AdminPanel from './AdminPanel';
// import { Container } from 'react-bootstrap';
// import Sidenav from './Sidenav';
// // import { First } from 'react-bootstrap/esm/PageItem';
// // import Select from 'react-select';



// const AddStudents = () => {
//     const [firstName, setFirstName] = useState();
//     const [LastName, setLastName] = useState();
//     const [Email, setEmail] = useState();
//     const [Password, setPassword] = useState();
//     const [CurrentAddress, setCurrentAddress] = useState();
//     const [PermamentAddress, setPermamentAddress] = useState();
//     const [InstituteName, setInstituteName] = useState();
//     const [HighestQualification, setHighestQualification] = useState();
//     const [Gender, setGender] = useState();
//     const [Courses, setCourses] = useState();
//     const [ContactNO, setContactNO] = useState();
//     const [AlternateNo, setAlternateNo] = useState();
//     const [ReferalCode, setReferalCode] = useState();

// //        const Data={
// //         firstName:firstName,
// //     LastName:LastName,
// //          Email:Email,
// //          Password:Password,
// //          CurrentAddress:CurrentAddress,
// //          PermamentAddress:PermamentAddress,
// //          InstituteName:InstituteName,
// //          HighestQualification:HighestQualification,
// //         Gender:Gender,
// //    Courses:Courses,
// //     ContactNO:ContactNO,
// //      AlternateNo:AlternateNo,
// //      ReferalCode:ReferalCode

// //     }}
// }
//  const Submit = (e) => {
//    e.preventDefault();
//     console.warn();
// console.log(Data);
    
//     const submit = async (e) => {
//         try {
//             e.preventDefault();
//             console.warn(firstName, LastName, Gender, Email, ReferalCode, Password);
//             let result = await fetch('http://localhost:5000/addstudent', {
//                 method: 'post',
//                 body: JSON.stringify({
//                     firstName,
//                     LastName,
//                     Email,
//                     Password,
//                     CurrentAddress,
//                     PermamentAddress,
//                     InstituteName,
//                     HighestQualification,
//                     Gender,
//                     Courses,
//                     ContactNO,
//                     AlternateNo,
//                     ReferalCode

//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!result.ok) {
//                 throw new Error(`Request failed with status ${result.status}`);
//             }

//             result = await result.json();
//             console.warn(result);
//             localStorage.setItem("addstudent", JSON.stringify(result));
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     return (

//         <div  >
//             {/* <AdminPanel />
//             <AddStudents/>
//             <h1>add stduent</h1> */}


//              <form className='registerform' >
//                 <h1>Student Register</h1>
//                 <div className='formbody'>
//                     <div>
//                         <label className='studentlabel'>First Name:</label>
//                         <input className='studentinput' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Last Name:</label>
//                         <input className='studentinput' type='text' value={LastName} onChange={(e) => setLastName(e.target.value)}></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Email:</label>
//                         <input className='studentinput' type='Email' value={Email} onChange={(e) => setEmail(e.target.value)}></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Password:</label>
//                         <input className='studentinput' type='text' value={Password} onChange={(e) => setPassword(e.target.value)} ></input>
//                     </div>

//                     <div>
//                         <label className='studentlabel'>Current Address:</label>
//                         <input className='studentinput' type='text' value={CurrentAddress} onChange={(e) => setCurrentAddress(e.target.value)}></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Permanent Address:</label>
//                         <input className='studentinput' type='text' value={PermamentAddress} onChange={(e) => setPermamentAddress(e.target.value)} ></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Institute Name:</label>
//                         <input className='studentinput' type='text' value={InstituteName} onChange={(e) => setInstituteName(e.target.value)}></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Highest Qualification:</label>
//                         <input className='studentinput' type='text' value={HighestQualification} onChange={(e) => setHighestQualification(e.target.value)}></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Gender:</label>
//                         <input type='radio' name="mygender" value="Male" checked={Gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male
//                         <input type='radio' name="mygender" value="Female" checked={Gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female
//                         <input type='radio' name="mygender" value="Other" checked={Gender === "Other"} onChange={(e) => setGender(e.target.value)} /> Other
//                     </div>
//                     <br />
//                     <div>
//                         <label className='studentlabel'>Courses:</label>
//                         <select value={Courses} onChange={(e) => setCourses(e.target.value)}>
//                             <option value="">Select Course</option>
//                             <option value="python">Python</option>
//                             <option value="MERN">MERN</option>
//                             <option value="ML">Machine Learning</option>
//                             <option value="java">Java</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Contact No:</label>
//                         <input className='studentinput' type='number' value={ContactNO} onChange={(e) => setContactNO(e.target.value)} ></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Alternate Contact No:</label>
//                         <input className='studentinput' type='number' value={AlternateNo} onChange={(e) => setAlternateNo(e.target.value)} ></input>
//                     </div>
//                     <div>
//                         <label className='studentlabel'>Referal Code:</label>
//                         <input className='studentinput' type='text' value={ReferalCode} onChange={(e) => setReferalCode(e.target.value)} ></input>
//                     </div>
//                     <div>
//                         <button className='button' type="button" onClick={submit}>submit</button>
//                     </div>
//                 </div>
//             </form> 


//         </div>
//     )
// }

// export default AddStudents;




// // import React from 'react'
// // import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
// // import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// // import Radio from '@material-ui/core/Radio';
// // import RadioGroup from '@material-ui/core/RadioGroup';
// // import FormControlLabel from '@material-ui/core/FormControlLabel';
// // import FormControl from '@material-ui/core/FormControl';
// // import FormLabel from '@material-ui/core/FormLabel';
// // import Checkbox from '@material-ui/core/Checkbox';
// // const AddStudents = () => {
// //     const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
// //     const headerStyle = { margin: 0 }
// //     const avatarStyle = { backgroundColor: '#1bbd7e' }
// //     const marginTop = { marginTop: 5 }
// //     return (
// //         <Grid>
// //             <Paper elevation={20} style={paperStyle}>
// //                 <Grid align='center'>
// //                     <Avatar style={avatarStyle}>
// //                         <AddCircleOutlineOutlinedIcon />
// //                     </Avatar>
// //                     <h2 style={headerStyle}>Sign Up</h2>
// //                     <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
// //                 </Grid>
// //                 <form>
// //                     <TextField fullWidth label='Name' placeholder="Enter your name" />
// //                     <TextField fullWidth label='Email' placeholder="Enter your email" />
// //                     <FormControl component="fieldset" style={marginTop}>
// //                         <FormLabel component="legend">Gender</FormLabel>
// //                         <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
// //                             <FormControlLabel value="female" control={<Radio />} label="Female" />
// //                             <FormControlLabel value="male" control={<Radio />} label="Male" />
// //                         </RadioGroup>
// //                     </FormControl>
// //                     <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
// //                     <TextField fullWidth label='Password' placeholder="Enter your password"/>
// //                     <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
// //                     <FormControlLabel
// //                         control={<Checkbox name="checkedA" />}
// //                         label="I accept the terms and conditions."
// //                     />
// //                     <Button type='submit' variant='contained' color='primary'>Sign up</Button>
// //                 </form>
// //             </Paper>
// //         </Grid>
// //     )
// // }

// // export default AddStudents;
