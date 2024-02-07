import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from '../../Screens/login/Login'
import Admissionform from '../../Screens/Admissionform/Admissionform'
import Admin from '../../Screens/Admin-Dashborad/Admin'
import Student from '../../Screens/Student-Dashborad/Student'

const Routing = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='' element={<Login/>}/>
        <Route path='Admission' element={<Admissionform/>}/>
        <Route path='Admin/*' element={<Admin/>}/>
        <Route path='student' element={<Student/>}/>
    </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default Routing