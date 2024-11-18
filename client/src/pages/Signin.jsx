import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData, setFormData] = React.useState({ });
  const {loading, error: errorMessage} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = async (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (!formData.email && !formData.password) {
      return dispatch(signInFailure('Please provide all the required fields'));
    }
    else if (!formData.email) {
      
      return dispatch(signInFailure('Please type email'));

    }
    else if (!formData.password) {
      
      return dispatch(signInFailure('Please type password'));

    }


    // call your API to sign up user here
try {
dispatch (signInStart());
  const res = await fetch('/api/auth/signin', {
     method: 'POST',
     headers: {'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (data.success === false) {
     return dispatch(signInFailure(data.message));
 } 
 
   
   if (res.ok) {
    dispatch(signInSuccess(data));
    navigate('/');
  }
}
catch (error) {

dispatch(signInFailure(error.message));

  
 
}
 
     };
  return (
     <div className='min-h-screen mt-10'>

<div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
  {/* left */}
<div className='flex-1'>
<Link to="/" className='font-bold dark:text-white text-5xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Rizwan's</span>Blog
         </Link>
<p className='text-sm mt-5'>
  Sign up to create a new account or login to your existing account. If you don't have an account, you can create one below.
 
</p>
  
</div>
  {/* right */}

  <div className='flex-1'>

    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>


<div>
<Label value='Email'/>
<TextInput type='email' placeholder='Email@email.com' id='email' onChange={handleChange}/>
</div>

<div>
<Label value='Password'/>
<TextInput type='password' placeholder='************' id='password' onChange={handleChange}/>
</div>

<Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>

  {
  loading ? (
  <>
      <Spinner size='sm' />
    <span className='pl-3'>Loading... </span>
  </>

   ) : 'Sign In'  
   }
 
</Button>
<OAuth />
    </form>
    <div className='mt-5'>
    <span>Don't have an account? </span>
    <Link to="/signup" className='text-blue-500 font-bold'>
    Sign Up
    </Link>
    </div>
    {errorMessage && (    
      <Alert className='mt-5' color='failure'>{errorMessage}</Alert>

)}

  </div>
</div>

</div>

  
  )
}
