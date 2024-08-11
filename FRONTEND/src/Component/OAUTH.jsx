import React from 'react'
import {Button} from "flowbite-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { signInFailure,signInStart,signInSuccess } from '../Redux/user/userSlice';
import {useDispatch,} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const OAUTH = () => {
  const auth = getAuth(app)
    const dispatch=useDispatch()
    const navigate= useNavigate()
    const handleGoogle= async()=>{
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({prompt:'select_account'})
      try {
        const resultFromGoogle = await signInWithPopup(auth,provider) 
     
        const response = await fetch('/api/google',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              username:resultFromGoogle.user.displayName,
              email:resultFromGoogle.user.email,
              photoUrl:resultFromGoogle.user.photoURL
          })
         })
         const responseData = await response.json();
         if(response.ok){
          dispatch(signInSuccess(responseData))
          navigate('/')
         }
      } catch (error) {
        console.log(error)                   
      }
  

   
      }
  return (
  <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogle}>
    <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    Continue with Google</Button>
  
  )
}

export default OAUTH
