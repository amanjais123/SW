import React, { useEffect, useState } from "react";
import planeImg from "/plane.png";

const FlyingPlane = ({ targetRef }) => {
  const [position, setPosition] = useState({ x: window.innerWidth, y: 200 });

  useEffect(() => {
    if (!targetRef.current) return;

    const startX = window.innerWidth + 50; // start offscreen
    const startY = 200;

    const targetRect = targetRef.current.getBoundingClientRect();
    const endX = targetRect.left + targetRect.width / 2 - 24; 
    const endY = targetRect.top + targetRect.height / 2 - 12;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 3000, 1); 

      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress;

      setPosition({ x, y });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [targetRef]);

  return (
    <img
      src={planeImg}
      alt="Flying Plane"
      className="absolute w-12 sm:w-16"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "rotate(10deg)",
        transition: "transform 0.1s linear",
      }}
    />
  );
};

export default FlyingPlane;
