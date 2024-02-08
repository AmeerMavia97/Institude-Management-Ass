import * as React from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Allcourse = () => {

  const [Allcoursedata , setAllcoursedata] = useState([])


  useEffect(() => {
   
  async  function GetCourse(){
      const q = query(collection(db, "Course"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        Allcoursedata.push({docId: doc.id, ...doc.data() })
        setAllcoursedata([...Allcoursedata])
        // setCourse(doc.data().CourseName)
        // setWeekday(doc.data().WeekDay)
      
      });
    }
    GetCourse()


  }, [])




  function handleChange(index){
    console.log("helo" ,index );
  }





  return (

    <>
     
    {Allcoursedata.map((item , index)=>{
      return(
    <Card onClick={()=>{handleChange(index)}} sx={{ minWidth: 275 , marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {item.CourseName}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {`Course By: ${item.TeacherName}`}
        </Typography>
        <Typography variant="body2">
        {`Course By: ${item.WeekDay}`}
        </Typography>
      </CardContent>

    </Card> 
      )
    
    })}

    </>
 
    
  );
}

export default Allcourse