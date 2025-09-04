import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen min-h-screen text-white">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          src="/bgv1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-24 text-center md:text-left">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            showContent ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
  
          <TypeAnimation
            sequence={["SwiftWings'25", 2000, "", 800]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-5xl sm:text-5xl md:text-8xl font-extrabold drop-shadow-lg mb-4"
            style={{ fontFamily: 'Transformers' }}
          />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-yellow-400 mt-3 drop-shadow-md">
            Rule the Skies. Conquer the Ground.
          </h2>

          <p className="mt-4 sm:mt-6 max-w-full sm:max-w-xl md:max-w-2xl text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed mx-auto md:mx-0">
            Prepare for the ultimate RC fixed-wing drone showdown — precision
            flying, cutting-edge engineering, and adrenaline-packed aerial battles.
            Push the limits of innovation and claim your place among the legends.
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center md:justify-start">
            <button
              ref={buttonRef}
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                         bg-gradient-to-r from-yellow-500 to-orange-600 text-white 
                         font-semibold shadow-lg transform skew-x-12 
                         hover:from-orange-600 hover:to-yellow-500 
                         transition-transform hover:scale-105"
            >
              <span className="skew-x-[-12deg] text-sm sm:text-base md:text-lg">
                Register Now
              </span>
              <FaArrowRight className="skew-x-[-12deg] text-sm sm:text-base md:text-lg" />
            </button>
          </div>
        </div>
      </section>

{/* Team Section */}
<section className="relative z-10 bg-white/10 backdrop-blur-md py-16 px-6 sm:px-12 md:px-24">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-12">
   Patron
  </h2>


  {/* Patron (VC Sir) */}
  <div className="w-full flex justify-center mb-12">
    <div className="w-[70%] bg-white/10 p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 hover:scale-105 transition-transform">
      {/* Image left */}
      <img
        src="/VC2.png"
        alt="VC"
        className="w-40 h-40 rounded-full object-cover border-4 border-yellow-500"
      />

      {/* Text right */}
      <div className="text-center md:text-left">
        <h3 className="text-3xl font-semibold">Prof. JP Saini</h3>
        <p className="text-lg text-gray-300">Vice Chancellor</p>
        <p className="mt-4 text-gray-200 italic">
          "Proud to support young innovators shaping the skies of tomorrow."
        </p>
      </div>
    </div>
  </div>
  <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-8">
   Faculty Members
  </h2>
  {/* Faculty Section (aligned with VC card width) */}
  <div className="w-full flex justify-center">
    <div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-10">
      {/* Faculty Advisor */}
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
        <img
          src="/sks.jpg"
          alt="Chair man"
          className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-yellow-500"
        />
        <h3 className="mt-4 text-xl font-semibold">Prof. SK Soni</h3>
        <p className="text-sm text-gray-300">Chairman</p>
        <p className="mt-2 text-gray-200 italic">
          "Guiding minds to reach new heights in technology and innovation."
        </p>
      </div>

      {/* Event Coordinator */}
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
        <img
          src="/rajansir.jpg"
          alt="Event Coordinator"
          className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-yellow-500"
        />
        <h3 className="mt-4 text-xl font-semibold">Prof. Rajan Mishra</h3>
        <p className="text-sm text-gray-300">Event Coordinator</p>
        <p className="mt-2 text-gray-200 italic">
          "Excited to organize a platform for aerial excellence and teamwork."
        </p>
      </div>
    </div>
  </div>
  <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-4 mt-8">
   Student Leads
  </h2>
    <div className="w-full flex justify-center mt-12">
    <div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* President */}
      <div className="bg-white/10 p-4 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
        <img
          src="/vijit2.jpg"
          alt="President"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-yellow-500"
        />
        <h3 className="mt-3 text-lg font-semibold">Vijit Bhadana</h3>
        <p className="text-sm text-gray-300">President</p>
      </div>

      {/* Vice President 1 */}
      <div className="bg-white/10 p-4 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
        <img
          src="/ujjwal.jpg"
          alt="Vice President"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-yellow-500"
        />
        <h3 className="mt-3 text-lg font-semibold">Ujjwal Singh</h3>
        <p className="text-sm text-gray-300">Vice President</p>
      </div>

      {/* Vice President 2 */}
      <div className="bg-white/10 p-4 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
        <img
          src="/ayush2.jpg"
          alt="Vice President"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-yellow-500"
        />
        <h3 className="mt-3 text-lg font-semibold">Ayush Kannojia</h3>
        <p className="text-sm text-gray-300">Vice President</p>
      </div>

      {/* Vice President 3 */}
      <div className="bg-white/10 p-4 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
        <img
          src="/devesh.png"
          alt="Vice President"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-yellow-500"
        />
        <h3 className="mt-3 text-lg font-semibold">Devesh Yadav</h3>
        <p className="text-sm text-gray-300">Vice President</p>
      </div>
    </div>
  </div>

<h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-6 mt-8">
  Developers
</h2>
<div className="w-full flex justify-center mt-8">
  <div className="w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Dev 1 */}
    <div className="bg-white/10 p-4 rounded-2xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
      <div className="flex items-center gap-4">
        <img
          src="/aman2.jpg"
          alt="Developer 1"
          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
        />
        <div>
          <h3 className="text-lg font-semibold">Aman Jaiswal</h3>
          <p className="text-sm text-gray-300">ECE(IoT) 3rd year</p>
        </div>
      </div>
      <div className="flex gap-3">
        <a
          href="https://www.instagram.com/ace_aman_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-400"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/amanjais00/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400"
        >
          <FaLinkedin size={22} />
        </a>
      </div>
    </div>

    {/* Dev 2 */}
    <div className="bg-white/10 p-4 rounded-2xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
      <div className="flex items-center gap-4">
        <img
          src="/rajneesh.jpg"
          alt="Developer 2"
          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
        />
        <div>
          <h3 className="text-lg font-semibold">Rajneesh Yadav</h3>
          <p className="text-sm text-gray-300">ECE 3rd year</p>
        </div>
      </div>
      <div className="flex gap-3">
        <a
          href="https://www.instagram.com/rajneeshyadav._/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-400"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/rajneesh0507/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400"
        >
          <FaLinkedin size={22} />
        </a>
      </div>
    </div>
  </div>
</div>
</section>



      {/* Footer */}
      <footer className="w-full bg-black/70 backdrop-blur-md py-6 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-24 text-gray-200">
        <div className="flex items-center gap-6 mb-4 md:mb-0 justify-center md:justify-start">
          <a href="mailto:2023041208@mmmut.ac.in@email.com">
            <FaEnvelope size={20} className="hover:text-yellow-400 transition-colors" />
          </a>
          <a href="https://www.instagram.com/drone_iot_club.mmmut?igsh=dzVtM25ueXRhaWE=" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} className="hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://www.linkedin.com/company/drone-iot-club-mmmut/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} className="hover:text-blue-500 transition-colors" />
          </a>
        </div>
        <p className="text-xs sm:text-sm md:text-sm text-gray-300 text-center md:text-left">
          &copy; {new Date().getFullYear()} SwiftWings. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
