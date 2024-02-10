import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar, Avatar, CircularProgress, Container, Toolbar, Tooltip } from '@mui/material';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const Singlecourse = () => {

  const params = useParams()
  const [Coursename , setCoursename] = useState()
  const [Teachername , setTeachername] = useState()
  const [Day , setDay] = useState()
  const [StudentList , setStudentList] = useState([])



  useEffect(() => {


   async function GetCourseInfirease() {
      const q = query(collection(db, "Course") );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        if(doc.id === params.id){
          setCoursename(doc.data().CourseName)
          setTeachername(doc.data().TeacherName)
          setDay(doc.data().WeekDay)
          return
        }
      });
    }
    GetCourseInfirease()


  }, [])


  useEffect(()=>{

    async function GetStudentlist(){
      const q = query(collection(db, "AdmissionForm") , where("Course" , '==' , Coursename) );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        StudentList.push({docId: doc.id , ...doc.data()})
        setStudentList([...StudentList])
      });
    console.log(StudentList);

    }
    GetStudentlist()    

  }, [Coursename])




 




  return (
    <>
    {Coursename ?   <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{textAlign: 'center' ,mb: 1.5 }} variant="h4" component="div">
          {Coursename}  
       </Typography>
        <Typography sx={{  textAlign: 'center' }} color="text.secondary">
          {`Coursed by: ${Teachername}`}
        </Typography>
        <Typography sx={{textAlign: 'center'}} variant="body2">
          {`Day: ${Day}`}
        </Typography>
      </CardContent>
      
    </Card>: <CircularProgress sx={{marginLeft: 65 , marginTop: 2}} />  }

    {StudentList ?
     StudentList.map((item , index)=>{
      return(
        <>
      <AppBar key={index}  position="static" sx={{marginBottom: 2 , marginTop: 2 }}>
      <Container  sx={{display: 'flex',  justifyContent: 'space-between' }} maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <Avatar alt="Remy Sharp" src={item.StudentImage} />
            </Tooltip>
          </Box>
          <Typography
          key={index}
            variant="h6"
            noWrap
            component="a"
            sx={{
              ml: 2,
              display: { xs: 'none', md: 'flex'  },
              
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {item.FirstName + item.LastName} 
          </Typography>
          {/* <Typography
          key={index}

            variant="h5"
            noWrap
            component="a"
            sx={{
              ml: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {item.FirstName + item.LastName} 
            
          </Typography> */}

        </Toolbar>
      </Container>

    </AppBar>




    </>
      )
    })
     
     : <CircularProgress sx={{marginLeft: 65 , marginTop: 2}} />  } 
    
    </>
  )
}

export default Singlecourse