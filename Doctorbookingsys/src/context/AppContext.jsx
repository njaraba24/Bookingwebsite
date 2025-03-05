import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



export const AppContext = createContext()

const AppContextProvider = (props)=> {

    const currencySymbol = 'Ksh ';

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [doctors, setDoctors] = useState([]);
const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): false);

    const [userData, setUserData] = useState(false);




    const getDoctorsData = async () => {
        setIsLoading(true);
        try {
            console.log("Fetching doctors data...");
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success){
                console.log("Doctors data fetched successfully:", data.doctors);
                setDoctors(data.doctors);
            }else{
                console.error("Error fetching doctors data:", data.message);
                toast.error(data.message);
            }
        }catch (error){
            console.error("Error in getDoctorsData:", error);
            toast.error(error.message || "Failed to fetch doctors data");
        } finally {
            setIsLoading(false);
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/user/get-profile`, {headers: {token}})
            if (data.success){
                setUserData(data.userData);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

    const value = {
        doctors,
        getDoctorsData,
        isLoading,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    };

    useEffect(()=>{
        getDoctorsData();
    },[])

    useEffect(()=>{
        if (token){
            loadUserProfileData();
        }else{
            setUserData(false);
        }
    },[token])
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContextProvider