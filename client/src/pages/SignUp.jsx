import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = React.useState({

  })
  
  const handleChange = async (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }

     console.log(formData);
  
const handleSubmit = async (e) => {
    e.preventDefault();
    // call your API to sign up user here
try {

  const res = await fetch('/api/auth/signup', {

     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
   });
   const data = await res.json();
   console.log(data);
 } 
 
catch (error) {
  console.log(error);

};
 
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

<Button gradientDuoTone='purpleToPink' type='submit'>

  Sign Up
 
</Button>
    </form>
    <div className='mt-5'>
    <p><span>Already have an account? </span>
    <Link to="/signin" className='text-blue-500 font-bold'>Sign in</Link></p>
    </div>
  </div>
</div>

</div>

  
  )
}
