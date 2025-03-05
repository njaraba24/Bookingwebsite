import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='text-center text-2xl pt-10 text-gray-700 mx-12'>
      <div>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 justify-center text-sm'>
        <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center gap-6 items-start text-gray-600'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>Muranga University</p>
          <p className='text-gray-500'>+254705030488 <br />Groupiv@gmail.com</p>
          <p className='font-semibold'>Register as a Doctor</p>
          <p className='text-gray-500'>Explore opportunities at DocSpot</p>
          <button className='border border-black rounded-2xl px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
