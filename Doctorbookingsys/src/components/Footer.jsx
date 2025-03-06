import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-40 text-sm'>
        {/*  left side  */}
        <div>
            <img onClick={() => { navigate('/'); scrollTo(0, 0); }} className='mb-5 w-40 cursor-pointer' src={assets.logo2} alt="" />
            <p className='w-full md:w-2/3 text-gray-800 leading-6'>
               Docspot is a reliable online platform in Kenya that connects patients with qualified healthcare professionals. 
                Easily book appointments with specialists like gynecologists, dentists, nurses, and more—all in one place. Your health, your convenience!</p>
        </div>
        {/*  center  */}
        <div className=''>
            <p className='text-xl font-medium mb-5'>
                Company
            </p>
            <ul className='flex flex-col gap-2 text-gray-800 '>
                <a href=""><li className='hover:text-primary' onClick={()=> navigate('/')}>Home</li></a>
                <a href=""><li className='hover:text-primary' onClick={()=> navigate('/about')}>About Us</li></a>
                <a href=""><li className='hover:text-primary' onClick={()=> navigate('/contact')}>Contact us</li></a>
                <a href=""><li className='hover:text-primary' onClick={()=> navigate('')}>Register as a Doctor</li></a>

            </ul>
        </div>
        {/*  right side  */}
        <div>
            <p className='text-xl font-medium mb-5'>
                GET IN TOUCH
            </p>
            <ul className='flex flex-col gap-2 text-gray-800'>
                <li>+254705030488</li>
                <li>groupiv@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ Group iv All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
