import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    console.log(email, password)
  },[email, password])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      email,
      password
    }
    dispatch(loginUser(body))
      .then(res => {
        if(res.payload.loginSuccess){
          navigate('/')
        }else{
          alert('에러 발생')
        }
      })
  }

  return (
    <div className='flex-center'>
      <form className='flex-column' onSubmit={handleSubmit}>
        <label>이메일</label>
        <input type='email' value={email} onChange={handleEmail} />
        <label>비밀번호</label>
        <input type='password' value={password} onChange={handlePassword} />
        <br/>
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}

export default LoginPage