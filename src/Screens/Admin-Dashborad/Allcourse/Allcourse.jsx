import * as React from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions, CardMedia, CircularProgress } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Allcourse = () => {

  const navigate = useNavigate()
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
    navigate(`/Admin/singlecourse/${index}`)
  }





  return (

    <>
     
    {Allcoursedata.length > 0 ?  Allcoursedata.map((item , index)=>{
      return(
        <Card key={index} onClick={()=>{handleChange(item.docId)}} sx={{marginLeft: 46 , marginTop:1 , display: 'flex' ,  maxWidth: 290 }}>
        <CardActionArea>
        <CardContent>
          <Typography sx={{textAlign: 'center' , marginTop: 2}} gutterBottom variant="h5" component="div">
          {item.CourseName}
          </Typography>
          <Typography sx={{textAlign: 'center' }}  variant="body2" color="text.secondary">
          {`Course By: ${item.TeacherName}`} <br />
          </Typography>
          <Typography sx={{textAlign: 'center' , marginTop: 1 , marginBottom: 2}}  variant="body2" color="text.secondary">
          {`Day: ${item.WeekDay}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

      )
    
    }) : <CircularProgress sx={{marginLeft: 65 , marginTop: 2}} /> 
  }




    </>
 
    
  );
}

export default Allcourse