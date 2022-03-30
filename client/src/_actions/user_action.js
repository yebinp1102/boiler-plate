import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from './types'

export function loginUser(body){
  const req = axios.post('/api/users/login', body)
    .then(res => res.data)
  return {
    type: LOGIN_USER,
    payload: req
  }
}

export function registerUser(body){
  const req = axios.post('/api/users/register', body)
    .then(res => res.data)
  return {
    type: REGISTER_USER,
    payload: req
  }
}

export function auth(){

  const request = axios.get('/api/users/auth')
    .then(res => res.data)
  
  return{
    type: AUTH_USER,
    payload: request
  }
}