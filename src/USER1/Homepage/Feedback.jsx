import React, { useState, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import './Feedback.css';
import LanguageContext from './LanguageContext.jsx'; // Adjust the import as needed

const translations = {
    en: {
        feedback: "Feedback",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your Email",
        messagePlaceholder: "Your message here",
        send: "Send"
    },
    ta: {
        feedback: "கருத்து",
        namePlaceholder: "உங்கள் பெயரை உள்ளிடவும்",
        emailPlaceholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
        messagePlaceholder: "உங்கள் செய்தியை இங்கே",
        send: "அனுப்பு"
    },
    hi: {
        feedback: "प्रतिपुष्टि",
        namePlaceholder: "अपना नाम दर्ज करें",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
        messagePlaceholder: "अपना संदेश यहाँ लिखें",
        send: "भेजें"
    }
};

const Feedback = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language] || translations.en;

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        AOS.init(); // Initialize AOS
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="u-contact" data-aos="fade-up" data-aos-duration="1000">
            <div id="con-cont">
                <div className={`con-items ${scrolled ? 'scrolled' : ''}`} data-aos="fade-right" data-aos-duration="1000">
                    <img src="https://static.vecteezy.com/system/resources/previews/008/129/217/original/searching-for-location-vector.jpg" alt="img" />
                </div>
                <div className="con-items con-text-content" data-aos="fade-left" data-aos-duration="1000">
                    <h1 id="feedbackname">{t.feedback}</h1>
                    <form>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={t.namePlaceholder}
                        />
                        <input
                            type="email"
                            className="form-control"
                            placeholder={t.emailPlaceholder}
                        />
                        <textarea
                            className="form-control"
                            placeholder={t.messagePlaceholder}
                        ></textarea>
                        <button className="btnssignin">{t.send}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Feedback;
