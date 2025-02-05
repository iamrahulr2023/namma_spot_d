import React, { useEffect, useState, useContext } from 'react';
import './ScrollingContent.css';
import { Link } from 'react-router-dom';
import LanguageContext from './LanguageContext';

const ScrollingContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language } = useContext(LanguageContext); // Use LanguageContext to get the current language

  const handleScroll = () => {
    const container = document.querySelector('.coontainer');
    const containerTop = container.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 2;

    if (containerTop < triggerPoint) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const content = {
    en: {
      largeText: "Are You a Parking Provider?",
      smallText: "Whether you've got a garage to fill, you're managing parking"
    },
    ta: {
      largeText: "நீங்கள் ஒரு பார்கிங் வழங்குநரா?",
      smallText: "நீங்கள் ஒரு கேரேஜை நிரப்ப முயற்சிக்கிறீர்களா, நீங்கள் பார்கிங்கை நிர்வகிக்கிறீர்களா"
    },
    hi: {
      largeText: "क्या आप पार्किंग प्रदाता हैं?",
      smallText: "चाहे आपके पास भरने के लिए एक गैराज हो, आप पार्किंग का प्रबंधन कर रहे हों"
    }
  };

  const { largeText, smallText } = content[language];

  return (
    <div className="scrolling-content-body">
      <Link to="/alogin" style={{ textDecoration: 'none' }}>
        <div className="coontainer">
          <div className={`arroww ${scrolled ? 'arroow-scrolled' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-right-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
            </svg>
          </div>
          <div className={`content ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <p className={`large-text ${scrolled ? 'large-text-scrolled' : ''}`}>{largeText}</p>
            <p>{smallText}</p>
          </div>
       
        </div>
      </Link>
     
     
    </div>
  );
};

export default ScrollingContent;
