import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = React.useState({ });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const navigate = useNavigate();
  
  const handleChange = async (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }

   // deletethis  console.log(formData); 
  
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username ||!formData.email ||!formData.password) {
      return setErrorMessage('Please provide all the required fields');

    }
    // call your API to sign up user here
try {
  setLoading(true);
  setErrorMessage(null);
  const res = await fetch('/api/auth/signup', {
     method: 'POST',
     headers: {'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (data.success === false) {
    setLoading(false);
     return setErrorMessage(data.message);
 
 } 
 else {
  setSuccessMessage(data.message);
    setLoading(false);
    setErrorMessage(null);

   }
   
   if (res.ok) {
    navigate('/signin');
  }
}
catch (error) {
  setErrorMessage(error.message);
  setLoading(false);
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
<Label value='Username'/>
<TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
</div>

<div>
<Label value='Email'/>
<TextInput type='email' placeholder='Email@email.com' id='email' onChange={handleChange}/>
</div>

<div>
<Label value='Password'/>
<TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
</div>

<Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>

  {
  loading ? (
  <>
      <Spinner size='sm' />
    <span className='pl-3'>Loading... </span>
  </>

   ) : 'Sign Up'  
   }
 
</Button>
<OAuth />
      </form>
    <div className='mt-5'>
    <span>Already have an account? </span>
    <Link to="/signin" className='text-blue-500 font-bold'>
    Sign in
    </Link>
    </div>
    {errorMessage && (    
      <Alert className='mt-5' color='failure'>{errorMessage}</Alert>

)}

{successMessage && (    
      <Alert className='mt-5' color='success'>{successMessage}</Alert>

)}

  </div>
</div>

</div>

  
  )
}
