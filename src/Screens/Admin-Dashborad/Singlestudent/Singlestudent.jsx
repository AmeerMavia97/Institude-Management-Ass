import React from 'react'
import { useParams } from 'react-router-dom';

const Singlestudent = () => {

    const params = useParams()

    console.log(params);

    console.log('hello');

  return (
    <>
    <h1 >hello</h1>
    </>

  )
}

export default Singlestudent