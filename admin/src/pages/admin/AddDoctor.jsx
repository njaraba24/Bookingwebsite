import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { backendUrl, atoken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Validate token exists
      if (!atoken) {
        toast.error("Authentication token missing. Please login again.");
        return;
      }

      if (!docImg) {
        return toast.error("Please select a doctor's image");
      }

      // Validate file type
      if (!docImg.type.startsWith('image/')) {
        return toast.error("Please select a valid image file");
      }

      // Validate file size (5MB max)
      if (docImg.size > 5 * 1024 * 1024) {
        return toast.error("Image size should not exceed 5MB");
      }

      // Create form data
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("phone", phone);
      formData.append("address", address);

      // Log form data for debugging
      console.log('Form data being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value);
      }

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: { 
            atoken,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      // Log response for debugging
      console.log('Server response:', data);

      if (data.success) {
        toast.success(data.message);
        // Reset form after successful submission
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setDegree("");
        setPhone("");
        setAddress("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error
        if (error.response.status === 401) {
          toast.error("Invalid or expired token. Please login again.");
        } else {
          toast.error(error.response.data.message || "Failed to add doctor");
        }
      } else if (error.request) {
        // Request made but no response
        toast.error("Server not responding. Please try again later.");
      } else {
        // Other errors
        toast.error("Failed to add doctor. Please try again.");
      }
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (!file.type.startsWith('image/')) {
                  toast.error("Please select a valid image file");
                  return;
                }
                if (file.size > 5 * 1024 * 1024) {
                  toast.error("Image size should not exceed 5MB");
                  return;
                }
                setDocImg(file);
              }
            }}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />
          <p>
            Upload Doctor,
            <br />
            image
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Enter doctor name"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2 outline-primary"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2 outline-primary"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2 outline-primary"
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>fee</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2 outline-primary"
                type="number"
                placeholder="fee"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2 outline-primary"
                name=""
                id=""
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroentologist">Gastroentologist</option>
                <option value="Nurse">Nurse</option>
                <option value="Dentist">Dentist</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Phone (e.g., +254705030488)</p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Enter phone number with country code"
                pattern="^\+[1-9]\d{1,14}$"
                title="Phone number must start with + followed by country code and number"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="border rounded px-3 py-2 outline-primary"
                type="text"
                placeholder="Address"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="About doctor"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-6 py-2 rounded-full text-white mt-4"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
