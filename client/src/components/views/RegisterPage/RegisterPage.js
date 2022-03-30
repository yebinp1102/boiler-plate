import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
      return alert('비밀번호가 일치하지 않습니다.')
    }

    const body = {
      email,
      password,
      name
    }
    dispatch(registerUser(body))
      .then(res => {
        if(res.payload.success){
          navigate('/login')
        }
      })
  }

  return (
    <div className='flex-center'>
      <form className='flex-column' onSubmit={handleSubmit}>
        <label>이메일</label>
        <input type='email' value={email} onChange={handleEmail} />
        <label>이름</label>
        <input type='text' value={name} onChange={handleName} />
        <label>비밀번호</label>
        <input type='password' value={password} onChange={handlePassword} />
        <label>비밀번호 확인</label>
        <input type='password' value={confirmPassword} onChange={handleConfirm} />
        <br/>
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}

export default RegisterPage