import React from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
  return (
    <>
    <h1>Student Dashboard</h1>
    <ul className='studentdashboard'>
      <li><Link to='/stdprofile'>Profile</Link></li>
      <li><Link to='/stdpassword'>Change Password</Link></li>
      <li><Link to='/upcomingtest'>test</Link></li>
      <li><Link to='/performance'>Performance</Link></li>
        

      </ul>

    </>
  )
}

export default StudentDashboard
