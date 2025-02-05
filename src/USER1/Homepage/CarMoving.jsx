import React, { useEffect, useState } from "react";
import "./ScrollingContent.css";
import "./carmoving.css"; // Import the CSS file for car moving animations

const CarMoving = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const container = document.querySelector(".scrolling-content-body");
    const containerTop = container.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 2; // Set the trigger point to 50% of the screen height

    if (containerTop < triggerPoint) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const carImage = `${process.env.PUBLIC_URL}/assets/images/user/car_img.jpg`;
  const manImage = `${process.env.PUBLIC_URL}/assets/images/user/man.jpg`;

  return (
    <div className="pagemovingbackground">
      <div className="scrolling-content-body">
        <div className="anime-cont">
          <div className={`car ${scrolled ? "car-scrolled" : ""}`}>
            <img src={carImage} alt="Car" className="car-image" />
          </div>
          <div className="man" id="manicon">
            <img src={manImage} alt="Man" className="man-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarMoving;
