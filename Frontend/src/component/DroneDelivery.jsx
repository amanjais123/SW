import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const AREA_CARDS = [
  {
    label: "IoT",
    img: "/iot.png",
    desc: "Connected devices, sensor integrations, and next-gen networking for smarter systems.",
  },
  {
    label: "Drone",
    img: "/drone1.png",
    desc: "Autonomous aerial tech for delivery, exploration, and real-time data capture.",
  },
  {
    label: "AI / ML",
    img: "/ai.png",
    desc: "Intelligent algorithms, data-driven insights and automation for innovation.",
  },
  {
    label: "3D Printing",
    img: "/3d.png",
    desc: "Rapid prototyping and additive manufacturing for ideas made tangible.",
  },
];

export default function DroneDelivery() {
  const [offset, setOffset] = useState(0);

  const AreaCards = () => (
    <div className="w-[90%] mx-auto flex flex-wrap gap-6 justify-center items-center mt-6 mb-12 z-20">
      {AREA_CARDS.map(({ label, img, desc }) => (
        <div
          key={label}
          className="group relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 bg-white/10 border border-white/20 shadow-lg w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] aspect-[3/4]"
        >
          {/* Image (80% height) */}
          <div className="relative h-[80%] w-full overflow-hidden">
            <img
              src={img}
              alt={label}
              className="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm"
            />
            {/* Hover text overlay */}
            <div className="absolute inset-0 flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-neutral-100 font-medium text-base text-center backdrop-blur-lg bg-black/40 rounded-xl px-4 py-2">
                {desc}
              </span>
            </div>
          </div>

          {/* Title (20% height) */}
          <div className="h-[20%] flex items-center justify-center px-2 bg-gradient-to-r from-orange-500/30 to-yellow-400/20">
            <span className="font-extrabold text-xl text-white tracking-wide drop-shadow-lg text-center">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );


const EVENTS = [
  {
    title: "SwiftWings'25",
    desc: "Experience the future of flight at our flagship drone innovation event — featuring autonomous drone challenges, high-speed aerial races, and immersive live demos.",
    img: "/sw25.png",
    link: "/events",
    reverse: false,
    reverseGradient: true, // light card
  },
  {
    title: "AI/ML Bootcamp",
    desc: "A power-packed hands-on program covering AI & Machine Learning fundamentals, real-world datasets, and building deployable AI-powered applications.",
    img: "/aibootcamp.png",
    link: "",
    reverse: true,
    reverseGradient: false, // dark card
  },
];

const EventsSection = () => (
  <section className="w-full max-w-6xl mx-auto mt-2 mb-10 flex flex-col gap-16 z-30">
    {/* Section Heading */}
    <h2 className="text-center text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-7">
      Upcoming Events
      <span className="block w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></span>
    </h2>

    {/* Event Cards */}
    {EVENTS.map(({ title, desc, img, link, reverse, reverseGradient }) => (
      <div
        key={title}
        className={`flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl shadow-xl px-6 py-7 transition-all duration-300 hover:scale-[1.02] ${
          reverse ? "md:flex-row-reverse" : ""
        } ${
          reverseGradient
            ? "bg-gradient-to-tl from-orange-100 via-orange-50 to-white text-gray-900"
            : "bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-black/70 text-neutral-100"
        }`}
        style={{ minHeight: "320px" }}
      >
        {/* Image Container with Opposite Background */}
        <div
          className={`w-full md:w-1/2 flex justify-center items-center rounded-2xl p-4 shadow-lg ${
            reverseGradient
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
              : "bg-gradient-to-tl from-orange-100 via-orange-50 to-white"
          }`}
        >
          {link ? (
            <a href={link} className="transition duration-200 hover:scale-105">
              <img
                src={img}
                alt={title}
                className="rounded-xl w-[350px] h-[220px] object-cover transition-all duration-300"
              />
            </a>
          ) : (
            <img
              src={img}
              alt={title}
              className="rounded-xl w-[350px] h-[220px] object-cover transition-all duration-300"
            />
          )}
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <h3
            className={`font-bold text-2xl md:text-3xl mb-3 leading-tight ${
              reverseGradient ? "text-orange-600" : "text-orange-400"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-lg md:text-xl leading-relaxed mb-4 ${
              reverseGradient ? "text-gray-700" : "text-neutral-100"
            }`}
          >
            {desc}
          </p>
          <a
            href={link || "#"}
            className="inline-block px-5 py-2 rounded-full font-medium bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    ))}
  </section>
);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-black via-black/70 via-50% to-yellow-80/60 relative overflow-hidden">
      {/* Top Section (Hero) */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 pt-10 md:pt-16">
        {/* Left: Text */}
        <div className="flex flex-col justify-center md:w-1/2 z-10 animate-fade-in-up">
          <div className="mb-1 tracking-wide text-orange-300 font-semibold text-4xl">
            Drone & IoT Club
          </div>
          <div className="font-extrabold text-5xl md:text-7xl leading-tight text-white mb-3 h-[90px]">
            <TypeAnimation
              sequence={[
                "Innovation.", 1200,
                "Explore.", 1200,
                "Intelligence.", 1200,
                "Technology.", 1200,
                "Automation.", 1200,
                "Inspiration.", 1200,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <div className="text-lg md:text-xl text-neutral-200 max-w-xl mb-5">
            We provide hands-on experience in IoT, Drone, and AI/ML.
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-full px-8 py-3 w-max shadow-lg transition duration-300">
            Explore Events
          </button>
        </div>

        {/* Right: Drone image */}
        <div className="flex items-center justify-center relative mt-6 md:mt-0 md:mr-[150px]">
          <img
            src="/drone.png"
            alt="Drone Delivery"
            className="w-[1000px] max-w-full drop-shadow-2xl animate-fade-in-left-bottom"
            style={{
              zIndex: 2,
              transform: `translateY(${offset}px) rotate(${offset * 0.05}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>
      </div>
<div className="w-full text-center">
  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-10 relative inline-block">
    Our Fields of Impact
    <span className="block w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></span>
  </h2>
</div>


      {/* Bottom Section (Cards) */}
      <AreaCards />
<div>
 <EventsSection />
</div>
         
    </div>
  );
}
