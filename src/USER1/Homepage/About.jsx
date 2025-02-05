import React, { useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import './About.css';
import LanguageContext from './LanguageContext'; // Import LanguageContext

const About = () => {
  const { language } = useContext(LanguageContext); // Use context to access selected language

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  const content = {
    en: {
      title: 'Why Choose Us?',
      paragraph1: `Comfortable parking experience. Brokerage free. Genuine Owners.
                  Ensured security of your vehicle. Available for residents and
                  visitors. Surveillance parking. Simple steps to list property.
                  Earn money on the go. Available on app and website.
                  ParkSpot is part of this new initiative and incorporates various
                  features aimed at improving the parking experience for residents
                  and visitors. These will include removing the need for entry
                  barriers at car park entrances and exits for a seamless flow of
                  traffic, as vehicle plates will be registered via cameras.`,
      paragraph2: 'Get ParkSpot App'
    },
    ta: {
      title: 'எங்களை ஏற்றுக்கொள்ள ஏன்?',
      paragraph1: `மன அருமயக் கிருக்கை அனுபவம். வரவு இலவசமாக. உண்மையான உரிமையாளர்கள்.
                  உங்கள் வாகனத்தின் உறுதியாக காப்பாற்றல். நடைமுறை மற்றும் வருகிறவர்கள்.
                  காணொளித்த பார்க்கலாம். பணம் சம்பாதிக்க எளிதாகும் படி.
                  ஆப் மற்றும் வலைத்தளத்தில் கிடைக்கும்.
                  பார்க்ஸ்பாட் புதிய இயக்கத்தின் ஒரு பகுப்பு மற்றும் வருகிறவர்களுக்கு உட்கார்ந்த பார்க்கலாம்.
                  இவற்றில் நிலையான வாகன அனுபவத்தை மேம்படுத்துவதை மேம்படுத்துவதை லக்ஷிக்கணக்கான அமைப்புகளை சேர்க்கின்றன.
                  இவற்றில் வாகன பிரவேசம் மற்றும் வெளியேற்றத்திற்கான தேவையை நீக்கி
                  சரளமான இழுப்பு உடையதாக இருக்கும், ஏனைய சாலை பிளாக்கள் கேமராக்கள் வழியாக பதிவுசெய்யப்படும்.`,
      paragraph2: 'பார்க்ஸ்பாட் ஆப் அமைப்பைப் பெறுங்கள்'
    },
    hi: {
      title: 'हमें क्यों चुनें?',
      paragraph1: `आरामदायक पार्किंग अनुभव। ब्रोकरेज मुक्त। वास्तविक मालिक.
                  आपके वाहन की सुरक्षा सुनिश्चित की गई। निवासियों और आगंतुकों के लिए उपलब्ध है।
                  निगरानी पार्किंग। संपत्ति सूचीबद्ध करने के लिए सरल कदम।
                  चलते फिरते पैसे कमाएं। एप्लिकेशन और वेबसाइट पर उपलब्ध है।
                  पार्कस्पॉट इस नई पहल का हिस्सा है और निवासियों के लिए पार
                  किंग अनुभव को बेहतर बनाने के लिए विभिन्न विशेषताओं को समाहित करेगा।
                  इनमें से एक कार पार्क के प्रवेश और निकास के लिए प्रवेश बैरियर की आवश्यकता को हटाना शामिल होगा,
                  क्योंकि वाहन प्लेट कैमरों के माध्यम से पंजीकृत किए जाएंगे।`,
      paragraph2: 'पार्कस्पॉट एप्लिकेशन प्राप्त करें'
    }
  };

  const { title, paragraph1, paragraph2 } = content[language] || content.en; // Fallback to English if language context is undefined

  return (
    <section id="about">
      <div id="abt-cont">
        <div className="abt-items" data-aos="fade-right" data-aos-duration="1000">
          <div className="abt-text-content">
            <h1>{title}</h1>
            <p>{paragraph1}</p>
            <p><b>{paragraph2}</b></p>
          </div>
        </div>
        <div className="abt-items" data-aos="fade-left" data-aos-duration="1000">
          <img src="https://img.freepik.com/premium-vector/taxi-app-concept-illustrated_23-2148476377.jpg" alt="About Us" />
        </div>
      </div>
    </section>
  );
};

export default About;
