import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [Appointments, setAppointments] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (SlotDate) => {
    const dateArray = SlotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  }

  const getUserAppointment = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/appointments`, {headers:{token}})
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {appointmentId}, {headers:{token}})
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getDoctorsData();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  
  const appointmentMpesaPay = async (appointmentId) => {

    try {
      const {data} = await axios.post(`${backendUrl}/api/user/mpesa-payment`, {appointmentId}, {headers:{token}})
      if (data.success) {
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }

  },[token])
  return (
    <div className='mx-16'>
      <p className='pb-3 mt-12 font-medium text-gray-700 border-b'> My Appointments</p>
      <div>
        {Appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-backgroundc' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 tect-sm text-gray-700'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-gray-600 font-medium mt-1'>Address:</p>
              <p className='text-xs'> {item.docData.address}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time</span> {slotDateFormat(item.SlotDate)} | {item.SlotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && !item.isCompleted && <button onClick={()=> appointmentMpesaPay(item._id)} className='text-sm text-center hover:bg-primary hover:text-white transition-all duration-500 py-2 rounded-md sm:min-w-48 border'>Pay Now</button>}
              {!item.cancelled && !item.isCompleted &&  <button onClick={()=> cancelAppointment(item._id)} className='text-sm text-center hover:bg-red-600 hover:text-white transition-all duration-500 py-2 rounded-md sm:min-w-48 border'>Cancel Appointment</button>}
              {item.cancelled && !item.isCompleted &&  <p className='sm:min-w-48 py-2 border text-sm text-center text-red-600'>Cancelled</p>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border-green-500 border rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment;
