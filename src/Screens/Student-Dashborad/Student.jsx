import React, { useState } from 'react'
import Drawer2 from '../../components/Drawer2'
import StudentIdCard from '../../components/Card'
import { onAuthStateChanged , signOut  } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../config/firebase/config'
import { useNavigate } from 'react-router-dom';


const Student = () => {

  // NAVIGATION
  const navigate = useNavigate()

  // STATES
  const [StudentName , setStudentName] = useState()
  const [StudentEmail , setStudentEmail] = useState()
  const [StudentCourse , setStudentCourse] = useState()
  const [StudentImage , setStudentImage] = useState()


  onAuthStateChanged(auth,async (user) => {
    if (user) {
      const uid = user.uid;
      const q = query(collection(db, "AdmissionForm"), where("StudentUid", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        setStudentName(doc.data().FirstName +" "+ doc.data().LastName)
        setStudentEmail(doc.data().Email)
        setStudentCourse(doc.data().Course)
        setStudentImage(doc.data().StudentImage)

      });
    } else {
    }
  });


  function logout(){
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });
    
  }



  return (
    <>
      <Drawer2 Logut={logout}/>
      <StudentIdCard names={StudentName} email={StudentEmail} course={StudentCourse} image={StudentImage} />
    </>
  )
}

export default Student