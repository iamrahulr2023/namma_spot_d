import React, { useContext } from 'react';
import './Footer.css';
import LanguageContext from './LanguageContext'; // Import LanguageContext

const Footer = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      connect: "Connect with us on social networks:",
      nammaspotTitle: "NAMMASPOT",
      nammaspotDescription: "NammaSpot is your ultimate parking solution. Find and reserve parking spots in real-time, making your parking experience hassle-free.",
      servicesTitle: "SERVICES",
      services: [
        "Find Parking",
        "Reserve Spot",
        "Monthly Plans",
        "Corporate Solutions"
      ],
      developedByTitle: "DEVELOPED BY",
      developedBy: [
        "Thamilarasan GP",
        "Rahul R",
        "Majidhusian J",
        "Joyandrew S"
      ],
      contactTitle: "CONTACT",
      contactDetails: [
        "NammaSpot, Inc.",
        "support@nammaspot.com",
        "+1 234 567 8901"
      ],
      copyright: "© 2024 Copyright",
    },
    ta: {
      connect: "சமூக ஊடகங்கள் மூலம் எங்களை தொடர்பு கொள்ளுங்கள்:",
      nammaspotTitle: "NAMMASPOT",
      nammaspotDescription: "நம்மஸ்பாட் உங்கள் கடைசி உரிமையான லீசிங் வசதி. நேர்மிகச் சேகரி மற்றும் சர்வதேச கச்சேரி இடங்களை காணவும் மற்றும் கடவுச்சீட்டுகள் இணைக்கவும், உங்கள் செல்லமாக நிறுத்தும் அனுபவம்.",
      servicesTitle: "சேவைகள்",
      services: [
        "விளையாட்டு இடத்தை கண்டுபிடி",
        "பதிவு இடம்",
        "மாதாந்திர திட்டங்கள்",
        "சட்ட நிறுவனங்கள்"
      ],
      developedByTitle: "முடிவாக",
      developedBy: [
        "தமிழரசன் G P",
        "ராகுல் R",
        "மஜித்ஹுஸியான் ஜே",
        "ஜோய் ஆண்ட்ரூ S"
      ],
      contactTitle: "தொடர்பு",
      contactDetails: [
        "நம்மஸ்பாட், இன்க்",
        "support@nammaspot.com",
        "+1 234 567 8901"
      ],
      copyright: "© 2024 உரிமை கேள்வி",
    },
    hi: {
      connect: "सामाजिक नेटवर्क पर हमारे साथ कनेक्ट करें:",
      nammaspotTitle: "NAMMASPOT",
      nammaspotDescription: "नमस्पॉट आपकी अंतिम पार्किंग समाधान है। वास्तविक समय में पार्किंग स्थान खोजें और आरक्षित करें, जिससे आपके पार्किंग अनुभव को परेशानी मुक्त बनाया जा सके।",
      servicesTitle: "सेवाएँ",
      services: [
        "पार्किंग खोजें",
        "अर्ज़ी दीजिए",
        "मासिक योजनाएँ",
        "कॉर्पोरेट समाधान"
      ],
      developedByTitle: "विकसित किया गया द्वारा",
      developedBy: [
        "थमिलारासन जी.पी",
        "राहुल आर",
        "माजिदुसियन जे",
        "जॉयएंड्रू एस"
      ],
      contactTitle: "संपर्क करें",
      contactDetails: [
        "नमास्पोट, इंक",
        "support@nammaspot.com",
        "+1 234 567 8901"
      ],
      copyright: "© 2024 कॉपीराइट",
    }
  };

  const {
    connect,
    nammaspotTitle,
    nammaspotDescription,
    servicesTitle,
    services,
    developedByTitle,
    developedBy,
    contactTitle,
    contactDetails,
    copyright
  } = content[language];

  return (
    <footer className="footer">
      <div className="footer-top">
        <p>{connect}</p>
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Google"><i className="fab fa-google"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16">
  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
</svg>{nammaspotTitle}</h4>
          <p>{nammaspotDescription}</p>
        </div>
        
        <div className="footer-section">
          <h4>{servicesTitle}</h4>
          <ul>
            {services.map((service, index) => (
              <li key={index}><a href="#">{service}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>{developedByTitle}</h4>
          <ul>
            {developedBy.map((developer, index) => (
              <li key={index}>{developer}</li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>{contactTitle}</h4>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg>{contactDetails[0]}</p>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
</svg>{contactDetails[1]}</p>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg>{contactDetails[2]}</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>{copyright} <a href="http://nammaspot.com">nammaspot.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
