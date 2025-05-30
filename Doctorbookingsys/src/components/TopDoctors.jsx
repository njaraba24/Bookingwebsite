import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-4 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors from our team</h1>
      <p className='sm:w-1/3 text-center text-sm'>These are the Trusted Doctors in our team right now</p>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0,10).map((item, index)=>(
            <div onClick={()=> navigate(`/appointment/${item._id}`)} className='border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-backgroundc' src={item.image} alt="" />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-center ${item.available ? 'text-primary' : 'text-red-500'}`}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-primary' : 'bg-red-500'}  rounded-full`}></p>
                        <p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-gray-950 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-950 text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-primary text-white py-3 px-12 rounded-full mt-10 font-medium hover:bg-backgroundc hover:text-gray-900'>More</button>
    </div>
  )
}

export default TopDoctors
