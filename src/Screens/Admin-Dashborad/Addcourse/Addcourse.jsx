import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { collection, addDoc} from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import MenuItem from '@mui/material/MenuItem';
import KeepMountedModal from '../../../components/Modal';

const currencies = [
  {
    value: 'Monday ,Wednesday ,Friday',
    label: 'MWF',

  },
  {
    value: 'Tuesday , Thursday , Saturday',
    label: 'TTS',
  },
  {
    value: 'Sunday, Tuesday , Friday',
    label: 'STF',
  },
];


const Addcourse = () => {

  async function AddCourseInFirebase(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const docRef = await addDoc(collection(db, "Course"), {
      TeacherName: data.get('Teachername'),
      WeekDay: data.get('Weekday'),
      CourseName: data.get('Coursename')
    });

    // data.get('Teachername') = ''
    // data.get('weekday') = ''
    // data.get('Coursename') = ''
  }


  


  return (
    <>
      <Card  variant="outlined" sx={{ marginTop: 5, marginLeft: 35, marginRight: 62 }}>
        <Typography sx={{ textAlign: 'center', marginTop: 2 }} variant="h4">Add Course</Typography>

        <Box component="form" noValidate onSubmit={AddCourseInFirebase}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>

            <TextField id="Teachername" name="Teachername" required label="Enter Teacher Name" variant="outlined" />
            <TextField sx={{ width: 216 }}
              required
              id="Weekday"
              name='Weekday'
              select
              label="Week days"
            >
              {currencies.map((option , index) => (
                <MenuItem key={index} value={option.label} >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField sx={{ marginTop: 2, marginLeft: 5, marginRight: 5, width: 460 }} fullWidth name='Coursename' required label="Course Name" id="Coursename" />
          
          <KeepMountedModal />
        </Box>
      </Card>
    </>
  )
}

export default Addcourse