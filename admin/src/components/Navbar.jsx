import React, { useContext } from 'react'
import { assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

const {atoken, setAtoken} = useContext(AdminContext)
const {dToken, setDToken} = useContext(DoctorContext)

const navigate = useNavigate()

    const logout = () => {
      navigate('/')
      atoken && setAtoken('')
      atoken &&  localStorage.removeItem('dToken')
      dToken && setDToken('')
      dToken &&  localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-md'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 cursor-pointer' src={assets.logo2} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm rounded-full py-2 px-6'>Logout</button>
    </div>
  )
}

export default Navbar
