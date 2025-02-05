import React, { useContext } from 'react';
import './ParkingPal.css';
import { useLanguage } from '../../USER1/Homepage/LanguageContext';

const translations = {
  en: {
    title: "Do You Have an Empty  Space?",
    description: "Start earning from your unused parking space. Whether you'd like to rent your driveway during working hours or an underground space in an apartment block all month long, ParkingPal will help you find your perfect motorist.",
    button: "Rent Out Your Space"
  },
  ta: {
    title: "உங்களிடம் காலியான காரிடம் உள்ளதா?",
    description: "உங்கள் பயன்படுத்தப்படாத காரிடம் இருந்து வருமானம் பெற தொடங்குங்கள். நீங்கள் வேலை நேரங்களில் உங்கள் கார் நிறுத்துமிடத்தை வாடகைக்கு விட விரும்புகிறீர்களா அல்லது மாதம் முழுவதும் ஒரு அடுக்குமாடி அடிப்படை இடத்தில், ParkingPal உங்களுக்கு உங்கள் சரியான வாகனத்தை கண்டுபிடிக்க உதவும்.",
    button: "உங்கள் இடத்தை வாடகைக்கு விடுங்கள்"
  },
  hi: {
    title: "क्या आपके पास खाली कार स्पेस है?",
    description: "अपने अप्रयुक्त पार्किंग स्थान से कमाई करना शुरू करें। चाहे आप काम के घंटों के दौरान अपने ड्राइववे को किराए पर देना चाहें या पूरे महीने के लिए अपार्टमेंट ब्लॉक में एक भूमिगत स्थान, ParkingPal आपको अपने सही मोटरिस्ट को खोजने में मदद करेगा।",
    button: "अपनी जगह किराए पर दें"
  }
};

function ParkingPal() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="parkingpal-container">
      <main className="parkingpal-main-content">
        <div className="parkingpal-hero">
          <h1 className="parkingpal-hero-title">{t.title}</h1>
          <p className="parkingpal-hero-description">{t.description}</p>
       <a href="https://docs.google.com/forms/d/1tD_R2q0lh93USymZcDvcn0nvT9n4M81kEtkIvfM57I4/viewform?edit_requested=true&edit_requested=true" > <button className="parkingpal-hero-button">{t.button}</button></a>
        </div>
      </main>
    </div>
  );
}

export default ParkingPal;
