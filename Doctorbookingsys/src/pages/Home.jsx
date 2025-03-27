import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';

const Home = () => {
   useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = "https://cdn.jsdelivr.net/npm/@denserai/embed-chat@1/dist/web.min.js";
    script.onload = () => {
      window.Chatbot.init({
        chatbotId: "e14fec1a-3b9b-469c-8c45-27c97a15c1b1",
      });
    };
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
