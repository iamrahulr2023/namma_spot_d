import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal"; // Import the Fade component from react-awesome-reveal
import ParkingFooter from "./Footer";
import ParkingPal from "./ParkingPal";
import "./AHome.css";
import { useLanguage } from '../../USER1/Homepage/LanguageContext';

const logoImage = `${process.env.PUBLIC_URL}/assets/images/admin/namma_spot_logo4.jpg`;

const translations = {
  en: {
    welcome: "Welcome to NammaSpot",
    adminPanel: "Admin Panel",
    home: "Home",
    features: "Features",
    comments: "Comments",
    contact: "Contact",
    support: "Support",
    addSlots: "Add Slots",
    easyBooking: "Easy Booking",
    securePayments: "Secure Payments",
    support24: "24/7 Support",
    feedbackJohn: "\"ParkEasy made finding parking so much easier. Highly recommend!\"",
    feedbackJane: "\"A great service with excellent customer support.\"",
    feedbackMark: "\"I never worry about parking anymore, thanks to ParkEasy.\"",
    contactFormName: "Your Name",
    contactFormEmail: "Your Email",
    contactFormMessage: "Your Message",
    sendMessage: "Send Message",
    profile: "My Profile",
    mySales: "My Sales",
    wallet: "Wallet",
    Myslots:"Myslots",
    help: "Help",
    logout: "Logout",
    getComments: "Get comments from the user and Develop your business",
    adminHomePageIntro1: "This is the admin home page for managing the car parking booking system.",
    adminHomePageIntro2: "Use the navigation menu to access different functionalities such as managing bookings, checking your wallet, seeking help, and more."
  },
  ta: {
    welcome: "நம்மாஸ்பாடிற்கு வரவேற்கின்றோம்",
    adminPanel: "அட்விஸ் மேலடக்கப்",
    home: "இல்லையே",
    features: "விளக்கம்",
    comments: "கருத்துகள்",
    contact: "தொடர்பு",
    support: "காரணம்",
    addSlots: "சேடலைச் சேர்க்கவும்",
    easyBooking: "ஆரா ஆரா",
    securePayments: "தனித்தமான பையை",
    support24: "24/7 ஆதரவு",
    feedbackJohn: "\"ParkEasy மேடை எடுக்கும் சந்திப்புக்கு மிகக் எளிதாக உள்ளது. அதிகம் பரிந்துரை!\"",
    feedbackJane: "\"ஒரு அருமையான சேவை மற்றும் சிறப்பான வாடிக்கையாளர் ஆதரவு.\"",
    feedbackMark: "\"ParkEasy அனேகமாகவே மேகத்தால் நிறைவு செய்கிறேன்.\"",
    contactFormName: "உங்கள் பெயர்",
    contactFormEmail: "உங்கள் மின்னஞ்சல்",
    contactFormMessage: "உங்கள் செய்தி",
    sendMessage: "அஞ்சல் செய்தி அனுப்பவும்",
    profile: "சுயவிவரம்",
    mySales: "எனது விற்பனை",
    wallet: "காசு",
    Myslots:"எனது இடங்கள்",
    help: "உராய்வு",
    logout: "வெளியேறு",
    getComments: "பயனரிடமிருந்து கருத்துக்களைப் பெறுகிறது மற்றும் உங்கள் வணிகத்தை அப்படியே மேம்படுத்துகிறது",
    adminHomePageIntro1: "இது கார் பார்க்கிங் புத்தகம் மேலாண்மை முகப்பு பக்கம் ஆகும்.",
    adminHomePageIntro2: "வழிசெலுத்துதல் மெனுவை பயன்படுத்தி விவரங்களை செயல்படுத்துவது, உங்கள் பட்ஜெட்களை சரிசெய்து, உங்கள் வாலடையைச் சரிபார்க்கும், உதவி தேடுகிறது மற்றும் மேலும் பல விபரங்களைப் பெறுகிறது."
  },
  hi: {
    welcome: "नमामि देशमुख",
    adminPanel: "प्रशासन पैनल",
    home: "घर",
    features: "लक्षण",
    comments: "टिप्पणियाँ",
    contact: "संपर्क",
    support: "सहारा",
    addSlots: "स्लॉट्स जोड़ें",
    easyBooking: "आसान बुकिंग",
    securePayments: "सुरक्षित भुगतान",
    Myslots:"मेरे स्लॉट",
    support24: "24/7 समर्थन",
    feedbackJohn: "\"पार्कइजी ने पार्किंग ढूंढने में बहुत आसानी की। अत्यधिक अनुशंसा की!\"",
    feedbackJane: "\"एक शानदार सेवा और उत्कृष्ट ग्राहक सहायता।\"",
    feedbackMark: "\"अब मुझे पार्किंग की चिंता नहीं है, पार्कइजी के लिए धन्यवाद।\"",
    contactFormName: "आपका नाम",
    contactFormEmail: "आपकी ईमेल",
    contactFormMessage: "आपका संदेश",
    sendMessage: "संदेश भेजें",
    profile: "मेरा प्रोफ़ाइल",
    mySales: "मेरे बिक्री",
    wallet: "वॉलेट",
    help: "मदद",
    logout: "लॉगआउट",
    getComments: "उपयोगकर्ता से टिप्पणियाँ प्राप्त करें और अपने व्यवसाय को विकसित करें",
    adminHomePageIntro1: "यह कार पार्किंग बुकिंग सिस्टम का प्रबंधन करने के लिए एडमिन होम पेज है।",
    adminHomePageIntro2: "नेविगेशन मेनू का उपयोग करके विभिन्न फ़ंक्शन को पहुंचने के लिए जैसे कि बुकिंग प्रबंधन, अपना वॉलेट चेक करना, मदद खोजना, और अधिक।"
  }
};

function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const t = translations[language] || translations.en;

  return (
    <div className="admin-dashboard-body">
      <nav className="navbar navbar-expand-lg navbar-dark" id="admin-dashboard-navbar">
        <div className="container-fluid">
          <div className="nav-img">
            <img src={logoImage} alt="Logo" className="navbar-logo" />
          </div>

          <div className="collapse navbar-collapse" id="admin-navbar-content">
            <ul className="navbar-nav mx-auto">
              <Fade bottom cascade>
                <li className="nav-item">
                  <a className="nav-link" href="#ahome">{t.home}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#a-features">{t.features}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#a-comments">{t.comments}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#a-contact">{t.contact}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#a-support">{t.support}</a>
                </li>
              </Fade>
            </ul>
            <button className="btn p-2 my-lg-0 my-2" id="myprofile-btn" onClick={toggleSidebar}>
              Menu
            </button>
            <li className="nav-item">
              <Link to="/verify">
                <svg id="svgss" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-qr-code-scan" viewBox="0 0 16 16">
                  <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                  <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                  <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                  <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                  <path d="M12 9h2V8h-2z" />
                </svg>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <main className="admin-main-content admin-section" id="ahome">
        <Fade bottom>
          <h1>{t.welcome}</h1>
          <h2 id="ad-pan-text">{t.adminPanel}</h2>
          <p>
            This is the admin home page for managing the car parking booking system.
          </p>
          <p>
            Use the navigation menu to access different functionalities such as managing bookings, checking your
            wallet, seeking help, and more.
          </p>
        </Fade>

        <div className="admin-container">
          <Fade bottom>
            <div className="admin-box">
              <Link to="/Adminmap">
                <h2>{t.addSlots}</h2>
              </Link>
              <p>Add the parking slots to your area</p>
            </div>
          </Fade>
        </div>
      </main>

      <section className="admin-section" id="a-features">
        <div className="features" id="features">
          <Fade bottom>
            <h2>{t.features}</h2>
            <div className="feature">
              <div className="feature-item">
                <h3>{t.easyBooking}</h3>
                <p>Book your parking spot with just a few clicks.</p>
              </div>
              <div className="feature-item">
                <h3>{t.securePayments}</h3>
                <p>All transactions are securely processed.</p>
              </div>
              <div className="feature-item">
                <h3>{t.support24}</h3>
                <p>Our support team is available around the clock.</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      <ParkingPal />
      <section className="admin-section" id="a-comments">
        <h2>What Our Users Say</h2>
        <div class="testimonial">
          <div className="testimonial-item">
            <p>
              "ParkEasy made finding parking so much easier. Highly recommend!"
            </p>
            <h3>- John Doe</h3>
          </div>
          <div className="testimonial-item">
            <p>"A great service with excellent customer support."</p>
            <h3>- Jane Smith</h3>
          </div>
          <div className="testimonial-item">
            <p>"I never worry about parking anymore, thanks to ParkEasy."</p>
            <h3>- Mark Wilson</h3>
          </div>
          <h4>Get comments from the user and Develop your business</h4>
        </div>
      </section>

      <section className="admin-section" id="a-contact">
        <Fade bottom>
          <h2>{t.contact}</h2>
          <form>
            <input type="text" placeholder={t.contactFormName} required />
            <input type="email" placeholder={t.contactFormEmail} required />
            <textarea rows="5" placeholder={t.contactFormMessage} required></textarea>
            <div type="submit" id="adminhomesubmitbtn">{t.sendMessage}</div>
          </form>
        </Fade>
      </section>

      <ParkingFooter />
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/aprofile">{t.profile}</Link>
          </li>
          <li>
            <Link to="/Adminmap">{t.addSlots}</Link>
          </li>
          <li>
            <Link to="/sales">{t.mySales}</Link>
          </li>
          <li>
            <Link to="/wallet">{t.wallet}</Link>
          </li>
        
        
          <li>
            <Link to="/Myslots">{t.Myslots}</Link>
          </li>
          <li>
            <Link to="/verify">Verify</Link>
          </li>
          <li>
            <a className="nav-link" href="#a-contact">{t.help}</a>
          </li>
          <li>
            <Link to="/">{t.logout}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminHome;
