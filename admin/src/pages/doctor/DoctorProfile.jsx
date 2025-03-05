import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {dToken, profileData, getProfileData, setProfileData, backendUrl} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }
      
      const {data} = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {headers: {dToken}});
      if (data.success){
       toast.success(data.message);
       setIsEdit(false);
       getProfileData();
        
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
      
    }
  }

  useEffect(() => {
    if (dToken){
      getProfileData();
    }
  }, [dToken])
  return profileData && (
    <div>
      <div className='flex gap-4 flex-col m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/*displaying doctor information */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
            </div>
             {/*displaying doctor about */}

             <div>
              <p className='flex items-center gap-1 font-medium text-neutral-800 mt-3'>
                About:
              </p>
              <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>
                {profileData.about}
              </p>
             </div>
             <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees} /> : profileData.fees}</span></p>

             <div className='flex gap-2 py-2'>
              <p>Address:</p>
              <p className='text-sm'>{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address: e.target.value}))} value={profileData.address} /> :profileData.address}</p>
             </div>
             <div className='flex gap-1 pt-2'>
              <input onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
              <label htmlFor="">Available</label>
             </div>
             {
              isEdit ?
              <button onClick={updateProfile} className='px-5 py-2 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              :<button onClick={()=> setIsEdit(true)} className='px-5 py-2 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
             }
          </div>
        </div>
      </div>
  )
}

export default DoctorProfile
