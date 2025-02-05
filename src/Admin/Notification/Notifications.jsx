import React, { useState } from 'react';
import './Notification.css';

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [language, setLanguage] = useState('en');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const translations = {
        en: {
            notifications: {
                title: 'Notifications',
                tabs: {
                    upcoming: 'Upcoming',
                    onHold: 'On hold',
                    past: 'Past',
                    cancelled: 'Cancelled'
                },
                actions: {
                    decline: 'Decline',
                    accept: 'Accept',
                    cancel: 'Cancel',
                    call: 'Call'
                }
            }
        },
        ta: {
            notifications: {
                title: 'அறிவிப்புகள்',
                tabs: {
                    upcoming: 'வருகைகள்',
                    onHold: 'நிலுவையில்',
                    past: 'கடந்த',
                    cancelled: 'ரத்துசெய்யப்பட்டது'
                },
                actions: {
                    decline: 'மறுக்கு',
                    accept: 'ஏற்க',
                    cancel: 'ரத்து செய்',
                    call: 'அழை'
                }
            }
        }
    };

    const t = (key) => {
        return translations[language].notifications[key];
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="bodynotification">
            <div className="container">
                <header className="header">
                    <h1 className='noti'>{t('title')}</h1>
                    <div className="top-right">
                        <button onClick={() => handleLanguageChange('en')}>English</button>
                        <button onClick={() => handleLanguageChange('ta')}>தமிழ்</button>
                    </div>
                </header>

                <nav className="navigation">
                    {Object.keys(t('tabs')).map(tabKey => (
                        <button
                            key={tabKey}
                            className={`nav-btn ${activeTab === tabKey ? 'active' : ''}`}
                            onClick={() => handleTabClick(tabKey)}
                        >
                            {t('tabs')[tabKey]}
                        </button>
                    ))}
                </nav>

                {Object.keys(t('tabs')).map(tabKey => (
                    <div key={tabKey} className={`notifications ${activeTab === tabKey ? '' : 'hidden'}`}>
                        {/* Notification cards will go here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
