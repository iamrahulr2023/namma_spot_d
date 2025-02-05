// Service.js
import React, { useState, useEffect, useContext } from 'react';
import './Service.css';
import LanguageContext from './LanguageContext';

const content = {
  en: {
    title: 'WHOM WE SERVE',
    text: "Whether you've got a garage to fill, you're trying to improve curb management in your city, or you're managing parking for a big event, ParkMobile solutions can help.",
    items: [
      'Municipalities',
      'Transit & airports',
      'Automotive OEMs',
      'Fleets & business',
      'Event venues',
      'Private operators',
      'College campuses'
    ]
  },
  ta: {
    title: 'எங்களை யார் சேவிக்கிறார்கள்',
    text: 'நீங்கள் ஒரு கேரேஜை நிரப்ப விரும்புகிறீர்கள் என்றாலும், உங்கள் நகரில் கர்ப் மேலாண்மையை மேம்படுத்த முயற்சிக்கிறீர்கள், அல்லது பெரிய நிகழ்ச்சிக்கான பார்க்கிங்கை நிர்வகிக்கிறீர்கள் என்றாலும், ParkMobile தீர்வுகள் உதவ முடியும்.',
    items: [
      'மாநகராட்சி',
      'போக்குவரத்து மற்றும் விமான நிலையங்கள்',
      'வாகன உற்பத்தியாளர்கள்',
      'ஏஜென்சிகள் மற்றும் தொழில்',
      'நிகழ்ச்சி இடங்கள்',
      'தனியார் ஆபரேட்டர்கள்',
      'கல்லூரி வளாகங்கள்'
    ]
  },
  hi: {
    title: 'हम किसकी सेवा करते हैं',
    text: 'चाहे आपके पास भरने के लिए एक गैराज हो, आप अपने शहर में कर्ब प्रबंधन में सुधार करने की कोशिश कर रहे हों, या आप एक बड़े आयोजन के लिए पार्किंग का प्रबंधन कर रहे हों, पार्कमोबाइल समाधान मदद कर सकते हैं।',
    items: [
      'नगरपालिकाएँ',
      'ट्रांज़िट और हवाई अड्डे',
      'ऑटोमोटिव ओईएम',
      'बेड़े और व्यवसाय',
      'इवेंट स्थल',
      'निजी ऑपरेटर',
      'कॉलेज परिसर'
    ]
  }
};

const Service = () => {
  const { language } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const serviceSection = document.getElementById('service');
      if (serviceSection) {
        const servicePosition = serviceSection.offsetTop;
        const windowHeight = window.innerHeight;
        if (scrollPosition > servicePosition - windowHeight / 1.5) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { title, text, items } = content[language];

  return (
    <section id="service">
      <div id="service-container">
        <div className="service-items">
          <img
            src="https://4kwallpapers.com/images/walls/thumbs_3t/16803.jpg"
            alt="img"
          />
        </div>
        <div className={`service-items service-text-content ${isVisible ? 'show' : ''}`}>
          <h1>{title}</h1>
          <p>{text}</p>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Service;
