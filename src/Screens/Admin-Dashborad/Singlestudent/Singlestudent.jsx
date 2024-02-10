import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase/config'
import { useEffect } from 'react';
import AdminIdCard from '../../../components/Card2';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const Singlestudent = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [Names , setNames] = useState()
  const [Email ,setEmail] = useState()
  const [Image , setImage] = useState()
  const [Address , setAddress] = useState()
  const [Course , setCourse] = useState()
  const [Gender , setGender] = useState()



  useEffect(() => {
   async function GetStudentfromFirebase() {
      const q = query(collection(db, "AdmissionForm"), where("StudentUid", "==", params.id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setNames(doc.data().FirstName + doc.data().LastName)
        setEmail(doc.data().Email)
        setImage(doc.data().StudentImage)
        setAddress(doc.data().Address)
        setGender(doc.data().Gender)
        setCourse(doc.data().Course)
      });

    }
    GetStudentfromFirebase()
  }, [])




  return (
    <>
    <ArrowBackIosIcon onClick={()=>{navigate('/Admin/allstudent')}} sx={{color: 'black' , cursor:'Pointer'}}></ArrowBackIosIcon>
    <AdminIdCard email={Email} image={Image} names={Names} course={Course} address={Address} gender={Gender} /> <br />
           
    </>

  )
}

export default Singlestudent