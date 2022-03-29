import React, { useEffect } from 'react'
import axios from 'axios'

const LandingPage = () => {
  useEffect(()=>{
    axios.get('/api/hello')
      .then(res => console.log(res));
  },[])
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage