import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import AdminSignup from './Admin/AdminSignup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Admin from './Admin/Admin';
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/AdminPanel';

import Sidenav from './Admin/Sidenav';
import Navbar from './Admin/componentpage/Navbar';

import AddStudents from './Admin/componentpage/AddStudents';
import TotalStudents from './Admin/componentpage/TotalStudents';
import Courses from './Admin/componentpage/Courses';
import AddFaculty from './Admin/componentpage/AddFaculty';
import Faculty from './Admin/componentpage/Faculty';


import Detail from './Admin/componentpage/Detail';
import Update from './Admin/componentpage/Update';
import FacultyDetail from './Admin/componentpage/FacultyDetail';
import FacultyUpdate from './Admin/componentpage/FacultyUpdate';

import Main from './Admin/componentpage/quizz/Main';
import Quizz from './Admin/componentpage/quizz/Quizz'



import UserLogin from './Admin/componentpage/Userlogin';
import UserSignup from './Admin/componentpage/Usersignup';


import Mern from './Admin/componentpage/Mern';
import Java from './Admin/componentpage/Java';
import Ml from './Admin/componentpage/Ml';
import Python from './Admin/componentpage/Python';

import FacultyDashboard from './Admin/componentpage/FacultyDashboard';

import "bootstrap/dist/css/bootstrap.css"
import Profile from './Admin/componentpage/Profile';
import Students from './Admin/componentpage/Students';
import Test from './Admin/componentpage/Test';
import ChangePassword from './Admin/componentpage/ChangePassword';
import ViewStudents from './Admin/componentpage/viewStudents';
import StdProfile from './StudentPanel/StdProfile';
import StudentDashboard from './StudentPanel/StudentDashboard';
import UpcomingTest from './StudentPanel/UpcomingTest';
import Performance from './StudentPanel/Performance';
import StdPassword from './StudentPanel/StdPassword';
import AddQuiz from './Admin/componentpage/quizz/AddQuiz';

import Notice from './Admin/componentpage/Notice';
import TimeTable from './Admin/componentpage/timetable';
import GetTimeTable from './Admin/componentpage/getTimeTable';

// import {Row, Col, Container, DropdownButton, Dropdown, Button, ButtonGroup} from 'react-bootstrap'
// import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
// import { AppBar } from '@mui/material';
// import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';






function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => { //to show alert messages
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <div className="App">

      <BrowserRouter>



        {/* <Nav /> */}
        <Routes>
          <Route path="/home" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About US</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/course" element={<h1>Courses</h1>} />
          <Route path="/user" element={<h1>User</h1>} />

          {/* <Route path="/admin" element={<Admin/>} /> */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/logout" element={<h1>Logout</h1>} />

          <Route path="/sidenav" element={<Sidenav />} />
          <Route path="/navbar" element={<Navbar />} />


          <Route path="/addstudents" element={<AddStudents />} />
          <Route path="/totalstudents" element={<TotalStudents />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/update/:id" element={<Update />} />


          <Route path="/courses" element={<Courses />} />

          <Route path="/mern" element={<Mern />} />
          <Route path="/python" element={<Python />} />
          <Route path="/java" element={<Java />} />
          <Route path="/ml" element={<Ml />} />



          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/facultydetail/:id" element={<FacultyDetail />} />
          <Route path="/facultyupdate/:id" element={<FacultyUpdate />} />
          <Route path="/facultydashboard" element={<FacultyDashboard />} />
          <Route path="/viewstudent/:id" element={<ViewStudents />} />

          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<Quizz />} />
          <Route path="/addquiz" element={<AddQuiz/>} />
          <Route path="/upload-timetable" element={<TimeTable/>} />
          <Route path="/pdf/:id" element={<GetTimeTable/>} />







          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/userlogin" element={<UserLogin />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/students" element={<Students />} />
          <Route path="/test" element={<Test />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          <Route path='/stdprofile' element={<StdProfile />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/upcomingtest" element={<UpcomingTest />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/upcomingtest" element={<UpcomingTest />} />
          <Route path="/stdpassword" element={<StdPassword />} />

          <Route  path='/notice' element={<Notice/>}/>
          </Routes>
      </BrowserRouter>

      <Footer />



    </div>
  );
}

export default App;
