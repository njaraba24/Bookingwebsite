import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {

  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter()

  },[doctors, speciality]);

  return (
    <div className='mx-10'>
      <p className='text-gray-600'>Browse through top Kenyan Doctors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 text-gray-800'>
        <div className='flex flex-col text-sm gap-4 text-gray-600'>
        <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-backgroundc text-black" : ""}`}>General Physician</p>
        <p onClick={()=> speciality === 'Gynaecologist' ? navigate('/doctors') : navigate('/doctors/Gynaecologist')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynaecologist" ? "bg-backgroundc text-black" : "" }`}>Gyaenacologist</p>
        <p onClick={()=> speciality === 'Dentist' ? navigate('/doctors') : navigate('/doctors/Dentist')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dentist" ? "bg-backgroundc text-black" : ""}`}>Dentist</p>
        <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-backgroundc text-black" : ""}`}>Dermatologist</p>
        <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-backgroundc text-black" : ""}`}>Neurologist</p>
        <p onClick={()=> speciality === 'Gastroloelogist' ? navigate('/doctors') : navigate('/doctors/Gastroloelogist')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroloelogist" ? "bg-backgroundc text-black" : ""}`}>Gastroloelogist</p>
        <p onClick={()=> speciality === 'Nurse' ? navigate('/doctors') : navigate('/doctors/Nurse')} 
        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Nurse" ? "bg-backgroundc text-black" : ""}`}>Nurse</p>
      </div>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 px-3 sm:px-0'>
        {filterDoc.map((item, index)=>(
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
      </div>
    </div>
  )
}

export default Doctors
