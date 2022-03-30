import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null){
  // option: null(누구나 접근 0), true(로그인한 유저만 접근0), false(로그인 안한 유저만 출입0)
  function AuthenticationCheck(props){
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    useEffect(()=>{
      dispatch(auth()).then(res=>{
        console.log(res)
        // 로그인 하지 않은 상태
        if(!res.payload.isAuth){
          if(option){
            navigate('/login')
          }
        }else{
          // 로그인 한 상태. 어드민이 아닌데 어드민 페이지 방문한 경우
          if(adminRoute && !res.payload.isAdmin){
            navigate('/')
          }else{ 
            navigate('/')
          }
        }
      })
    },[])
    return(
      <SpecificComponent {...props}/>
    )
  }

  return <AuthenticationCheck /> // AuthenticationCheck라는 함수 반환
}