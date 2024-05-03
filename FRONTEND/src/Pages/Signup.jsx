
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button,  Label, Spinner, TextInput } from "flowbite-react";
import { ImGoogle3 } from "react-icons/im";
import OAUTH from '../Component/OAUTH';

const Signup = () => {
  const [formData, setFormdata] = useState({
    username:"",
    email:"",
    password:"",
  });

  const[errorMessage,SetErrormessage]=useState(null)
  const[isloading,setIsLoading]=useState(false)
  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim()
    }));
  };
  const signup = async (e) => {
    e.preventDefault();
    if(!formData.username|| !formData.password || !formData.email){
     return SetErrormessage('Please fill out all required field')
    }
    try {
      setIsLoading(true)
      SetErrormessage(null)
      const response = await fetch('/api/signup', {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      if(responseData.success===false){
        return SetErrormessage(responseData.message)
      }
      setIsLoading(false)
      if(response.ok){
        navigate('/Signin')
        // window.location.href='https://facebook.com'
      }
    } catch (error) {
      SetErrormessage(error.message)
     setIsLoading(false)
    }
 
  }

  return (
    <div className='min-h-screen mt-20'>
       <div className='flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        <div className='left flex-1' >
          <Link to="/" className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Amenze's</span>Blog
          </Link>
          <p className='text-sm mt-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, quod quis quam, quae nobis culpa quisquam nesciunt ex excepturi rem repellat perferendis molestias minus atque ducimus suscipit eveniet sed iste!
            You can sign up with your email or Google.
          </p>
        </div>
        <div className='right flex-1'>
          <form className="flex max-w-md flex-col gap-2" onSubmit={signup}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username">Username</Label>
              </div>
              <TextInput type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Your username"  />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@flowbite.com" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink'   type="submit" disabled={isloading}>
             {isloading?
             <>
             <Spinner size='sm'/>
             <span className='pl-3'>Loading...</span>
             </>
             : 'Sign Up'
            }
            </Button>
            <OAUTH/>
          </form>
        
          <div className='lex gap-5 text-sm mt-5'>
            <span>Have an account?</span>
            <Link className='text-blue-500' to='/signin'>Sign in</Link>
          </div>
          {errorMessage && <Alert className='mt-4' color='failure'>{errorMessage}</Alert>}
        </div>
       </div>
    </div>
  );
};

export default Signup;


