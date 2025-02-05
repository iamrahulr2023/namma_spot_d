import React, { useState, useEffect, useContext } from 'react';
import './Nammaspotad.css';
import { Fade } from 'react-awesome-reveal'; // Import the Fade component from react-awesome-reveal
import LanguageContext from './LanguageContext'; // Import LanguageContext

const Nammaspotad = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useContext(LanguageContext); // Use LanguageContext to get the current language

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const serviceSection = document.getElementById('servicead');
            if (serviceSection) {
                const servicePosition = serviceSection.offsetTop;
                const windowHeight = window.innerHeight;
                if (scrollPosition > servicePosition - windowHeight / 1.5) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check if already scrolled into view
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const content = {
        en: {
            title: "Namma Spot!",
            subtitle: "Now Available For Website",
            description: "Download now and embark on a journey of seamless convenience and innovation. Stay tuned for the Play Store and iStore release – coming soon"
        },
        ta: {
            title: "நம்ம ஸ்பாட்!",
            subtitle: "இப்போது இணையதளத்திற்காக கிடைக்கிறது",
            description: "இப்பொழுது பதிவிறக்கம் செய்து பரம்பரை எளிமை மற்றும் புதுமையை கண்டு மகிழுங்கள். Play Store மற்றும் iStore வெளியீட்டிற்காக காத்திருங்கள் – விரைவில் வருகிறது"
        },
        hi: {
            title: "नम्मा स्पॉट!",
            subtitle: "अब वेबसाइट के लिए उपलब्ध",
            description: "अभी डाउनलोड करें और निर्बाध सुविधा और नवाचार की यात्रा पर निकलें। Play Store और iStore रिलीज़ के लिए बने रहें – जल्द ही आ रहा है"
        }
    };

    const { title, subtitle, description } = content[language];

    const adImage = `${process.env.PUBLIC_URL}/assets/images/user/WhatsApp Image 2024-05-27 at 13.34.57_237950bb.jpg`;

    return (
        <section id="servicead">
            <div className="service-containerad">
                <div className="service-itemsad">
                    <Fade left when={isVisible}> {/* Apply Fade animation */}
                        <img src={adImage} alt="Advertisement" />
                    </Fade>
                </div>
                <div className={`service-text-content ${isVisible ? 'show' : ''}`}>
                    <Fade right when={isVisible}> {/* Apply Fade animation */}
                        <h1>{title}</h1>
                        <h6>{subtitle}</h6>
                        <p>{description}</p>
                    </Fade>
                </div>
            </div>
        </section>
    );
};

export default Nammaspotad;
