import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('/api/users/logout')
      .then(res =>{
        if(res.data.success){
          navigate('/login')
        }else{
          alert('로그아웃에 실패 했습니다.')
        }
      })
  }

  return (
    <div className='flex-center'>
      <h2>시작 페이지</h2>
      <button onClick={handleLogout}>로그아웃</button>
    </div>

  )
}

export default LandingPage