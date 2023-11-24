import { Container } from '@mui/material'
import React from 'react';
import{Link} from 'react-router-dom'
import Profile from './Profile';
import Test from './Test';
import Students from './Students';
import ChangePassword from './ChangePassword';

const FacultyDashboard = () => {

  return (
    <div>
        <Container>
      <h1>Faculty Dashboard</h1>
      <ul className='facultydashboard'>
      <li><Link to='/profile'>Profile</Link></li>
      <li><Link to='/changepassword'>Change Password</Link></li>
      <li><Link to='/students'>Students</Link></li>
      <li><Link to='/test'>Test</Link></li>
        

      </ul>
      </Container>
    </div>
  )
}

export default FacultyDashboard
