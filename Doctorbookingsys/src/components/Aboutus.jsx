import React from "react";
import { assets } from "../assets/assets";

const Aboutus = () => {
  return (
    <>
      <div className="my-10 flex md:flex-row gap-12 mx-12 justify-around">
        {/* Left side */}
        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600">
          <p className="">
           Welcome to Docspot, Kenya’s trusted online platform for booking medical appointments 
            with certified healthcare professionals. Whether you need a gynecologist, dentist, nurse, 
            or any other specialist, our platform makes it easy to find, schedule, and manage your healthcare 
            appointments from the comfort of your home.
          </p>
          <p>
             We are committed to improving healthcare accessibility 
            by connecting patients with experienced medical practitioners across the country. With a user-friendly 
            interface and a secure booking system, we ensure a seamless experience for both patients and doctors. Your health is our priority!ur!
          </p>
          <p className="text-gray-800">Our Vision</p>
          <p>
            To revolutionize healthcare access in Kenya by providing 
            a seamless, convenient, and reliable platform that connects patients
            with trusted medical professionals, ensuring quality healthcare for all.
          </p>
        </div>
        {/* Right side */}
        <div>
          <img
            className="w-full md:max-w-[360px] rounded-xl shadow-xl"
            src={assets.about}
            alt=""
          />
        </div>
      </div>
      <div className="text-xl my-4 mx-6">
        <p>
          Why <span className="text-gray-700 font-semibold">Chose Us</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20 mx-4">
        <div className="border px-10 py-8 sm:py-16 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white text-gray-600 cursor-pointer transition-all duration-300">
          <b>Efficiency</b>
          <p>Streamlined Appointment scheduling that fits into your busy life</p>
        </div>
        <div className="border px-10 py-8 sm:py-16 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white text-gray-600 cursor-pointer transition-all duration-300">
          <b>Convinience</b>
          <p>Access to a network of healthcare proffesionals in Kenya</p>
        </div>
        <div className="border px-10 py-8 sm:py-16 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white text-gray-600 cursor-pointer transition-all duration-300">
          <b>Personalization</b>
          <p>Tailored recomendations and reminders to help you stay on top</p>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
