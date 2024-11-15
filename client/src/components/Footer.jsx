import { Footer, FooterDivider } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsLinkedin, BsTiktok} from 'react-icons/bs'


export default function FooterCom() {
  return (

<Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'> 
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Rizwan</span>Blog
         </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                <Footer.Title title='About Us' />   
                <Footer.LinkGroup col>
                   <Footer.Link 
                   href='https://www.google.com/'
                   target='_blank'
                   rel='noopener noreferrer'
                   >
                    Google
                   </Footer.Link>
                   <Footer.Link 
                   href='https://www.facebook.com/'
                   target='_blank'
                   rel='noopener noreferrer'
                   >
                    FaceBook
                   </Footer.Link>
                </Footer.LinkGroup>


                </div>
                <div>
                <Footer.Title title='Follow Us' />   
                <Footer.LinkGroup col>
                   <Footer.Link 
                   href='https://www.google.com/'
                   target='_blank'
                   rel='noopener noreferrer'
                   >
                    Google
                   </Footer.Link>
                   <Footer.Link 
                   href='https://www.facebook.com/'
                   target='_blank'
                   rel='noopener noreferrer'
                   >
                    FaceBook
                   </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Follow Us' />   
                <Footer.LinkGroup col>
                   <Footer.Link 
                   href='https://www.google.com/'
                   target='_blank'
                   rel='noopener noreferrer'
                   >
                    Google
                   </Footer.Link>
                   <Footer.Link 
                   href='https://www.facebook.com/'
                   target='_blank'
                   rel='noopener noreferrer'
                   >
                    FaceBook
                   </Footer.Link>
                </Footer.LinkGroup>
                </div>

            </div>
            
        </div>
        <FooterDivider />
<div className='w-full sm:flex sm:items-center sm:justify-between font-bold'> 
<Footer.Copyright 
        href='#' 
        by='Rizwan Blog'
        year={new Date().getFullYear()}
        />
<div className='flex gap-6 mt-4 sm:mt-4 sm:justify-center'> 
    <Footer.Icon href='' icon={BsFacebook}/>
    <Footer.Icon href='' icon={BsInstagram}/>
    <Footer.Icon href='' icon={BsLinkedin}/>
    <Footer.Icon href='' icon={BsTiktok}/>
    </div>

</div>

    </div>
</Footer>
 

  )
}
