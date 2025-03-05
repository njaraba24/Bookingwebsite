import React from "react";
import { assets } from "../assets/assets";

const Aboutus = () => {
  return (
    <>
      <div className="my-10 flex md:flex-row gap-12 mx-12 justify-around">
        {/* Left side */}
        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600">
          <p className="">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit . Ut ullam
            amet praesentium a fugiat aliquam explicabo quos vel culpa sed.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            deleniti error obcaecati, incidunt fugit optio ex laudantium saepe
            nulla ipsum.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
            repellendus voluptas blanditiis. Velit, qui nostrum doloribus
            commodi animi voluptatibus consequuntur!
          </p>
          <p className="text-gray-800">Our Vision</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            dignissimos quam, nobis rem temporibus nihil quo dolores ipsa
            suscipit nostrum ex hic, totam itaque, dolor doloremque recusandae
            architecto corrupti voluptate. Inventore id soluta, provident iure
            accusantium dolor nam quod commodi.
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
