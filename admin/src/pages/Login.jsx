import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setAtoken, backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext)
    const navigate = useNavigate();

    const onSubmitHandler = async (event)=> {
        event.preventDefault();
        try {
            // Clear both tokens first
            localStorage.removeItem('aToken');
            localStorage.removeItem('dToken');
            setAtoken('');
            setDToken('');

            if (state === 'Admin') {
                const {data} = await axios.post(`${backendUrl}/api/admin/login`, {
                    email,
                    password
                });
                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAtoken(data.token);
                    navigate('/admin-dashboard');
                } else {
                    toast.error(data.message);

                }
            } else {
                const {data} = await axios.post(`${backendUrl}/api/doctor/login`, {
                    email,
                    password
                });
                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    navigate('/doctor-dashboard');
                } else {
                    toast.error(data.message)
                }
            }
        } catch(error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary m-1'>{state}</span>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        className='border border-[#dadada] rounded w-full p-2 mt-1' 
                        type="email" 
                        required 
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        className='border border-[#dadada] rounded w-full p-2 mt-1' 
                        type="password" 
                        required 
                    />
                </div>
                <button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {state === 'Admin' 
                    ? <p>Doctor Login?<span className='text-primary m-1 cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p> 
                    : <p>Admin login?<span className='text-primary m-1 cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>}
            </div>
        </form>
    );
};

export default Login;
