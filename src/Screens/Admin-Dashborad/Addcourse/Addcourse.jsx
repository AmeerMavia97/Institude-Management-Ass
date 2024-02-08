import { X } from '@mui/icons-material'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import MenuItem from '@mui/material/MenuItem';
import { useState  } from 'react';

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


  const [courseAdd, setCourseAdd] = useState([])



  async function AddCourseInFirebase(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const docRef = await addDoc(collection(db, "Course"), {
      TeacherName: data.get('Teachername'),
      WeekDay: data.get('Weekday'),
      CourseName: data.get('Coursename')
    });
  }

  // useEffect(()=>{
  //   async function GetCourseInfirebase() {
  //     const q = query(collection(db, "Course"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       courseAdd.push({docId: doc.id, ...doc.data() })
  //     setCourseAdd([...courseAdd])
  
  //     });
  
  
  //   }
  //   GetCourseInfirebase()

  // }, [])
  

  // console.log(courseAdd[0].CourseName);

  return (
    <>
      <Card  variant="outlined" sx={{ marginTop: 5, marginLeft: 35, marginRight: 62 }}>
        <Typography sx={{ textAlign: 'center', marginTop: 2 }} variant="h4">Add Course</Typography>

        <Box component="form" noValidate onSubmit={AddCourseInFirebase}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>

            <TextField id="Teachername" name="Teachername" label="Enter Teacher Name" variant="outlined" />
            <TextField sx={{ width: 216 }}
              id="Weekday"
              name='Weekday'
              select
              label="Week days"
            >
              {currencies.map((option) => (
                <MenuItem  >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField sx={{ marginTop: 2, marginLeft: 5, marginRight: 5, width: 460 }} fullWidth name='Coursename' label="Course Name" id="Coursename" />
          <Button type='submit' sx={{ marginTop: 3, width: 460, marginLeft: 5, marginBottom: 4 }} variant="contained" disableElevation>
            Add Course
          </Button>
        </Box>
      </Card>
    </>
  )
}

export default Addcourse