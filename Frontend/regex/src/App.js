import logo from './logo.svg';
import './App.css';
import AdminSignup from './Admin/AdminSignup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Admin from './Admin/Admin';
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/AdminPanel';
import AddStudents from './Admin/AddStudents';
// import "bootstrap/dist/css/bootstrap.css"
// import {Row, Col, Container, DropdownButton, Dropdown, Button, ButtonGroup} from 'react-bootstrap'
// import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

// import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import Students from './Admin/Students';
import AllStudents from './Admin/AllStudents';
import Sidenav from './Admin/Sidenav';
import TotalStudents from './Admin/TotalStudents';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      {/* <Nav /> */}
      <Routes>
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About US</h1>} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
        <Route path="/courses" element={<h1>Courses</h1>} />
        {/* <Route path="/admin" element={<Admin/>} /> */}
        <Route path="/user" element={<h1>User</h1>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
        <Route path="/AdminSignup" element={<AdminSignup />} />
        <Route path="/adminpanel" element={<AdminPanel />} />

        <Route path="/addstudents" element={<AddStudents />} />
        <Route path="/allstudents" element={<AllStudents />} />

        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/totalstudents" element={<TotalStudents/>}></Route>
        
      </Routes>
      </BrowserRouter>
      <Footer />

      
      
     </div>
  );
}

export default App;
