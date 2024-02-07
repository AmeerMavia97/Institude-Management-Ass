import React from 'react'
import PersistentDrawerRight from '../../components/Drawer'
import { Box, Button } from '@mui/material'
import { Routes , Route } from 'react-router-dom'
import Allcourse from '../Admin-Dashborad/Allcourse/Allcourse'
import Addcourse from '../Admin-Dashborad/Addcourse/Addcourse'
import Allstudent from '../Admin-Dashborad/Allstudent/Allstudent'
import Singlecourse from '../Admin-Dashborad/Singlecourse/Singlecourse'

const Admin = () => {
  return (
    <>
    <PersistentDrawerRight screen={
      <Box>
        <Routes>
          <Route path='/' element={<Allcourse/>} />
          <Route path='/addcourse' element={<Addcourse/>} />
          <Route path='/allstudent' element={<Allstudent/>} />
          <Route path='/singlecourse' element={<Singlecourse/>} />
        </Routes>

      </Box>
    }/>
    </>

  )
}

export default Admin