import * as React from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Singlestudent from '../Singlestudent/Singlestudent';


function Allstudent() { 

  const navigate = useNavigate()
  const [AllStudentdata , setAllStudentdata] = useState([])


async  function deleteStudent(index){
    await deleteDoc(doc(db, "AdmissionForm", AllStudentdata[index].docId));
    AllStudentdata.splice(index, 1)
    setAllStudentdata([...AllStudentdata])
  }


  useEffect(() => {
  
  async  function GetAllstudent(){
      const q = query(collection(db, "AdmissionForm"), where("Type" , "==" , "Student"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        AllStudentdata.push({docId: doc.id, ...doc.data() })
        setAllStudentdata([...AllStudentdata])
        // setCourse(doc.data().CourseName)
        // setWeekday(doc.data().WeekDay)
      
      });
    }
    GetAllstudent()

  }, [])

  function handlechange(index){
    console.log(index);
    navigate(`/Admin/singlestudent/${index}`)
  

  }


  return (
    <>
    {AllStudentdata.map((item , index)=>{
      return(
        <>
      <AppBar  onClick={()=>{handlechange(item.StudentUid)}}  position="static" sx={{marginBottom: 2 }}>
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
       <DeleteIcon key={index} onClick={()=>{deleteStudent(index)}} sx={{ display: { xs: 'flex',   } , marginTop: 2  }} /> 

      </Container>

    </AppBar>




    </>
      )
    })}
    </>
  );
}
export default Allstudent;