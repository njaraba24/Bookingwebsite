import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='bg-backgroundc lg:h-[70vh] md:h-fit m-0 px-20 lg:overflow-hidden rounded-xl'>
        <div className='flex md:flex-row flex-col justify-between items-center'>
          <div className='md:w-1/2 flex flex-col justify-center items-start gap-1 py-10 md:gap-0'>
            <h1 className='text-4xl lg:text-5xl text-gray-700 font-bold py-6'>
            Healthcare automation at
            your hands
          </h1>
          <p className='text-2xl lg:text-3xl'>Browse through our list of trusted doctors
            from the comfort of your home
          </p>
          <a href=""><button onClick={()=>navigate('/doctors')} className='bg-primary text-white mt-6 px-8 py-3 rounded-full 
          font-semibold hover:bg-white hover:text-black '>Book Appoinment</button></a>
        </div>
        <div className=' relative justify-center md:hidden lg:block'>
        <img src="/src/assets2/docs.png" alt=""  className='h-[80vh] w-auto'/>
        </div>
        
      </div>
      
    </div>
    <div>

    </div>
    </>
    
  )
}

export default Header
