import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('dob', userData.dob);
      formData.append('address', userData.address);
      formData.append('gender', userData.gender);

      image && formData.append('image', image);

      const {data} = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {headers: {token}})

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }
  return userData && (
    <div className="max-w-lg flex flex-col ml-10 mt-5 gap-2 text-sm">
      {
        isEdit
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image): userData.image} alt="" />
            <img className="w-10 bg-gray-300 absolute bottom-0 right-12" src={image ? '': assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        :<img className="w-36 rounded" src={userData.image} alt="" />

      }

      {isEdit ? (
        <input className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      ) : (
        <h1 className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</h1>
      )}
      <hr className="bg-gray-400 border-none h-[1px]" />
      <p className="text-neutral-800 underline mt-3">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
        <p className="font-medium">Email Id</p>
        <p className="text-green-500">{userData.email}</p>
        <p className="font-medium">Phone</p>
        {isEdit ? (
          <input className="bg-gray-100 max-w-52"
            type="text"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          />
        ) : (
          <h1 className="text-green-500">{userData.phone}</h1>
        )}
        <p className="font-medium">Address</p>
        {isEdit ? (
          <p>
            <input className="bg-gray-100 max-w-52"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: e.target.value
                }))
              }
              value={userData.address?.address || userData.address || ''}
              type="text"
            />
            <br />
          </p>
        ) : (
          <p>{userData.address?.address || userData.address || ''}</p>
        )}
      </div>
      <div>
        <p className="text-neutral-800 underline mt-3">BASI INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender :</p>
          {isEdit ? (
            <select className="max-w-20 bg-gray-100"
              type="text"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...userData, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p>Birth date</p>
          {
            isEdit
            ? <input className="max-w-28 bg-gray-100" type="date" onChange={(e) =>
              setUserData((prev) => ({ ...userData, dob: e.target.value }))
            } value={userData.dob} />
            : <p className="text-gray-500">{userData.dob}</p>
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdit
          ? <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={updateUserProfileData}>Save</button>
          : <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
