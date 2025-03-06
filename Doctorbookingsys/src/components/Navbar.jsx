import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();

  const {token, setToken, userData} = useContext(AppContext)

  const [showmenu, setShowmenu] = useState(false);

  const logout = ()=> {
    setToken(false);
    localStorage.removeItem('token');
  }



  return (
    <div className='flex items-center justify-between text-sm mx-9  py-4  
    border-b border-b-gray-400 background-#FAFAF8
    '>
      <img onClick={()=>navigate('/')} className='w-32 cursor-pointer' src={assets.logo2} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary' />
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>Doctors</li>
            <hr className='border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary' />
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary' />
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 w-3/5 m-auto hidden bg-primary' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData
          ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-auto h-10 rounded-full' src={userData.image || assets.upload_area} alt="Profile" />
            <img className='w-2.5' src="/src/assets2/dropdown.png" alt="" />
            <div className='hidden group-hover:block absolute w-fit top-10 right-0 bg-white shadow-md p-5 rounded-md z-10'>
              <div className='min-w-max  flex flex-col gap-2'>
                <p onClick={()=> navigate('/my-profile')} className='hover:bg-gray-100 py-2 rounded-xl px-2'>My Profile</p>
                <p onClick={()=> navigate('/my-appointments')} className='hover:bg-gray-100 py-2 rounded-xl px-2'> My Appointments</p>
                <p onClick={logout} className='hover:bg-gray-100 py-2 rounded-xl px-2'> Logout</p>
              </div>
            </div>
          </div>
          :<button onClick={()=> navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>

        }
        <img onClick={()=>setShowmenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
        {/** Mobile menu */}
        <div className={`${showmenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden transition-all bg-white`}>
          <div className='flex items-center justify-between px-4 py-6'>
            <img className='w-36' src={assets.logo2} alt="" />
            <img className='w-7 cursor-pointer' onClick={()=>setShowmenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 px-5 mt-5 text-lg font-medium'>
            <NavLink onClick={()=> setShowmenu(false)} to='/'>Home</NavLink>
            <NavLink onClick={()=> setShowmenu(false)} to='/doctors'>All Doctors</NavLink>
            <NavLink onClick={()=> setShowmenu(false)} to='/about'>About</NavLink>
            <NavLink onClick={()=> setShowmenu(false)} to='/contact'>Contact</NavLink>
          </ul>
        </div>
</div>
    </div>
  )
}

export default Navbar
