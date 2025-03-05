import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import AllApointments from './pages/admin/AllApointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointment from './pages/doctor/DoctorAppointment';
import DoctorProfile from './pages/doctor/DoctorProfile';

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return atoken || dToken ? (
    <div className='bg-[#f8f9fd]'>
     <ToastContainer />
     <Navbar />
     <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* admin routes */}
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<Dashboard/>} />
        <Route path='/all-appointments' element={<AllApointments/>} />
        <Route path='/add-doctor' element={<AddDoctor/>} />
        <Route path='/doctor-list' element={<DoctorsList/>} />

        {/* doctor routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
        <Route path='/doctor-appointments' element={<DoctorAppointment/>} />
        <Route path='/doctor-profile' element={<DoctorProfile/>} />
      </Routes>
     </div>
    </div>
  ): (
    <>
    <Login />
    <ToastContainer/>
    </>
  )
}

export default App;
