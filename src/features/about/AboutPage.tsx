import React from 'react';
import GlossyBackground from '../../components/GlossyBackground';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <>
      <GlossyBackground />
      <div className="relative min-h-screen bg-transparent text-white flex flex-col lg:flex-row items-center justify-center p-8 overflow-hidden">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col justify-center items-start p-8 z-10">
          {/* Logo */}
          <div className="absolute top-8 left-8 text-4xl font-bold orbitron">
            Y.
          </div>

          <h1 className="text-6xl font-bold mb-8 orbitron">ABOUT</h1>
          <div className="w-full h-0.5 bg-white mb-8"></div>
          <p className="text-xl leading-relaxed mb-8 max-w-xl">
            Hey, my name is Yosua Hares
          </p>
          <Link to="#" className="text-white text-lg no-underline group">
            <span className="flex items-center">
              <span className="mr-2">↓</span> resume
              <span
                className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex justify-center items-center p-8 relative">
          <div className="relative w-[450px] h-[550px] rounded-3xl flex items-center justify-center overflow-hidden">
            {/* Image */}
            <img
            //   src="https://i.imgur.com/2X0Q2Yj.jpeg" // Placeholder image, replace with actual image if available
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Three dots menu */}
          <div className="absolute top-1/4 right-1/4 flex flex-col gap-1 transform translate-x-1/2 -translate-y-1/2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
