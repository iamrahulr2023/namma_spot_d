import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Usernotification.css'; // Import the CSS file for styling
import { useLanguage } from '../../Homepage/LanguageContext';

const Usernotification = () => {
  const [data, setData] = useState([]);
  const { language } = useLanguage(); // Use the useLanguage hook to access language

  const translations = {
    en: {
      notifications: "Notifications",
      noNotifications: "No notifications available",
      cancel: "Cancel"
    },
    ta: {
      notifications: "அறிவிப்புகள்",
      noNotifications: "அறிவிப்புகள் இல்லை",
      cancel: "ரத்து செய்"
    },
    hi: {
      notifications: "सूचनाएं",
      noNotifications: "कोई सूचनाएं उपलब्ध नहीं हैं",
      cancel: "रद्द करें"
    }
  };

  const { notifications, noNotifications, cancel } = translations[language] || translations.en;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios.get('http://localhost:3001/getnoti')
      .then(result => setData(result.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deletenoti/${id}`)
      .then(() => {
        setData(data.filter(noti => noti._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="notifications-container">
      <h2 className='noti'>{notifications}</h2>
      {data.length > 0 ? (
        data.map(noti => (
          <div key={noti._id} className="notification-boxssss">
            <div className="notification-content">
              <p>{noti.noti}</p>
              <span className="notification-date">{new Date(noti.date).toLocaleString()}</span>
              <button className="delete-button" onClick={() => handleDelete(noti._id)}>{cancel}</button>
            </div>
          </div>
        ))
      ) : (
        <p>{noNotifications}</p>
      )}
    </div>
  );
};

export default Usernotification;
