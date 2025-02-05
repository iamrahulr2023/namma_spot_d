import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from './LanguageContext'; // Adjust the import path if needed
import './Navbar.css';
import axios from 'axios'; 

const translations = {
    en: {
        home: "Home",
        company: "Company",
        whyUs: "Why Us",
        discover: "Discover",
        contactUs: "Contact Us",
        findNearby: "Find nearby you",
        login: "Login",
        profile: "My Profile",
        myBooking: "My Booking",
        notification: "Notification",
        becomeSeller: "Become a Seller",
        help: "Help",
        logout: "Logout",
        welcome: "Hi, "
    },
    ta: {
        home: "முகப்பு",
        company: "நிறுவனம்",
        whyUs: "எங்கள் மீது",
        discover: "கண்டறியவும்",
        contactUs: "எங்களை தொடர்பு கொள்ள",
        findNearby: "உங்களுக்கு அருகில் தேடு",
        login: "உள்நுழை",
        profile: "எனது சுயவிவரம்",
        myBooking: "எனது பதிவு",
        notification: "அறிவிப்பு",
        becomeSeller: "விற்பனையாளராகவும்",
        help: "உதவி",
        logout: "வெளியேறு",
        welcome: "வணக்கம், "
    },
    hi: {
        home: "होम",
        company: "कंपनी",
        whyUs: "हमारे बारे में",
        discover: "खोजें",
        contactUs: "संपर्क करें",
        findNearby: "आसपास खोजें",
        login: "लॉग इन करें",
        profile: "मेरी प्रोफ़ाइल",
        myBooking: "मेरी बुकिंग",
        notification: "सूचना",
        becomeSeller: "विक्रेता बनें",
        help: "मदद",
        logout: "लॉगआउट",
        welcome: "नमस्ते, "
    }
};

const Navbar = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language] || translations.en;

    const [isNavbarOpaque, setIsNavbarOpaque] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem('profileImage') || 'default-image-url' // Replace 'default-image-url' with an actual default image URL
    );

    useEffect(() => {
        const fetchName = async () => {
            try {
                const result = await axios.get('http://localhost:3001/getname');
                setUserName(result.data.name.slice(0, 6)); // Slice name to limit to 6 characters
            } catch (err) {
                console.error('Error fetching name:', err);
            }
        };

        fetchName();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsNavbarOpaque(window.pageYOffset > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <header>
            <nav className={`navbar ${isNavbarOpaque ? 'opaque' : ''}`} aria-label="Main Navigation">
                <div className="logo">
                    <p>NAMMASPOT</p>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">{t.home}</Link></li>
                    <li><a href="#servicead">{t.company}</a></li>
                    <li><a href="#about">{t.whyUs}</a></li>
                    <li><a href="#service">{t.discover}</a></li>
                    <li><a href="#u-contact">{t.contactUs}</a></li>
                </ul>
                <div className="nav-icons">
                    <a aria-label="Find nearby location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                    </a>
                    <Link to="/map">{t.findNearby}</Link>
                    <Link to="/login">{t.login}</Link>
                    <div className="nav-item dropdown" onClick={toggleSidebar}>
                        <a aria-label="Toggle sidebar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="sidebar-profile-img" 
                     style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', marginBottom: '40px',marginTop: '-30px', marginLeft: '90px' }}
                />
                <ul>
                    <h5 className="user-Welcome" aria-label="User welcome message">{t.welcome}  {userName}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-laughing" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M12.331 9.5a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5"/>
                        </svg>
                    </h5>
                    <li><Link to="/profile">{t.profile}</Link></li>
                    <li><Link to="/mybooking">{t.myBooking}</Link></li>
                    <li><Link to="/notification2">{t.notification}</Link></li>
                    <li><Link to="/alogin">{t.becomeSeller}</Link></li>
                    <li><Link to="#con-cont" className="nav-link">{t.help}</Link></li>
                    <li><Link to="/login">{t.logout}</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
