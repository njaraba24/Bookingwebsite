import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { div, text } from 'framer-motion/client';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const {docId} = useParams();
  const {doctors, currencySymbol, backendUrl, getDoctorsData, token, userData} = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlot([])
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(today.getHours() > 10 ? currentDate.getHours() + 1: 10);
        currentDate.setMinutes(currentDate.getMinutes() < 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
        
        // Format date for checking booked slots
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let slotDate = day + "_" + month + "_" + year;
        
        // Check if slot is already booked
        const isBooked = docInfo?.slotsBooked?.[slotDate]?.includes(formattedTime);
        
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked: isBooked
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  }

  const bookAppointment = async () => {
    if (!token || !userData) {
      toast.warn('Please login to book appointment');
      return navigate('/login');
    }
    try {
      const date = docSlot[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      if (!slotTime) {
        return toast.error('Please select a time slot');
      }

      if (!docInfo) {
        return toast.error('Doctor information not found');
      }

      // Check if slot is already booked before making the request
      const currentSlot = docSlot[slotIndex].find(slot => slot.time === slotTime);
      if (currentSlot?.isBooked) {
        return toast.error('This slot is already booked. Please select a different time slot.');
      }

      const payload = {
        userId: userData._id,
        DocId: docInfo._id,
        SlotDate: slotDate,
        SlotTime: slotTime
      };

      console.log('Appointment payload:', payload);

      const {data} = await axios.post(`${backendUrl}/api/user/book-appointment`, 
        payload, 
        {headers:{token}}
      );

      if (data.success) {
        toast.success('Appointment booked successfully');
        setSlotTime(''); // Reset selected slot
        setSlotIndex(0); // Reset selected day
        await getDoctorsData(); // Refresh all doctors data
        await fetchDocInfo(); // Get updated doctor info
        await getAvailableSlots(); // Refresh available slots
        navigate('/my-appointments');
      } else {
        if (data.message === 'Slot already booked') {
          toast.error('This slot is already booked. Please select a different time slot.');
          // Refresh data to show updated slot status
          await getDoctorsData();
          await fetchDocInfo();
          await getAvailableSlots();
          setSlotTime(''); // Clear selected slot since it's now booked
        } else {
          toast.error(data.message || 'Failed to book appointment');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return docInfo && (
    <div className='mt-10 mx-5'>
      {/** Doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-backgroundc w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 roundend-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-grey-900 font-medium text-2xl'>
            {docInfo.name}
          <img className='w-5' src={assets.verified_icon} alt="" />
          </p> 
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-600'>About <img src={assets.info_icon} alt="" /></p>
              <p>{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
            </p>
        </div>
      </div>
      {/** Booking slots */}
      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-6'>
        <p className='text-2xl'>Booking slots</p>
        <div className='flex gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot.map((item, index) => (
            <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-3 py-2'>
          {docSlot.length && docSlot[slotIndex].map((item, index) => (
            <p 
              onClick={() => !item.isBooked && setSlotTime(item.time)} 
              className={`text-sm text-center font-light flex-shrink-0 py-2 px-3 rounded-full 
                ${item.isBooked 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : item.time === slotTime 
                    ? 'bg-primary text-white cursor-pointer' 
                    : 'text-gray-500 border border-gray-300 cursor-pointer'}`} 
              key={index}
            >
              {item.time.toLowerCase()}
              {item.isBooked && <span className="ml-1">(Booked)</span>}
            </p>
          ))}
        </div>
        <div>
          <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light py-3 px-10 rounded-full my-6'>Book Appoinment</button>
        </div>
      </div>
      {/** Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
