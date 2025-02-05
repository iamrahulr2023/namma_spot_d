import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Sales.css';
import { useLanguage } from '../../USER1/Homepage/LanguageContext';

const SalesTable = () => {
    const [mapData, setMapData] = useState([]);
    const [lastUserName, setLastUserName] = useState('N/A');
    const { language } = useLanguage();

    useEffect(() => {
        axios.get('http://localhost:3001/getconfirmb')
            .then(result => {
                if (Array.isArray(result.data)) {
                    setMapData(result.data);
                } else {
                    setMapData([result.data]);
                }
                if (result.data && result.data.name) {
                    setLastUserName(result.data.name);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const translateMonths = {
        en: ['June', 'February', 'March', 'April', 'May', 'Jannuary', 'July', 'August', 'September', 'October', 'November', 'December'],
        ta: [ 'ஜூன்', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே','ஜனவரி', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
        hi: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
    };

    return (
        <div className="body12">
            <div className="container12">
                <header className="header">
                    <h1><TranslateText text="My Sales" /></h1>
                    <div className="top-right">
                        <select>
                            {translateMonths[language].map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                </header>
                <p className="today">Today</p>
                <div className="table-container">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th><TranslateText text="Name" /></th>
                                <th><TranslateText text="Slot" /></th>
                                <th><TranslateText text="Price" /></th>
                                <th><TranslateText text="Date" /></th>
                                <th><TranslateText text="Place" /></th>
                                <th><TranslateText text="Vehicle No" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(mapData) && mapData.map((mapItem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{mapItem.name || lastUserName}</td>
                                    <td>{mapItem.slotNumbers ? mapItem.slotNumbers.join(', ') : 'N/A'}</td>
                                    <td>{mapItem.totalAmount || 'N/A'}</td>
                                    <td>{mapItem.date || 'N/A'}</td>
                                    <td>{mapItem.city || 'N/A'}</td>
                                    <td>{mapItem.vehicleno || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const TranslateText = ({ text }) => {
    const { language } = useLanguage();

    const translations = {
        en: {
            'My Sales': 'My Sales',
            Name: 'Name',
            Slot: 'Slot',
            Price: 'Price',
            Date: 'Date',
            Place: 'Place',
            'Vehicle No': 'Vehicle No'
        },
        ta: {
            'My Sales': 'என் விற்பனைகள்',
            Name: 'பெயர்',
            Slot: 'ஸ்லோட்',
            Price: 'விலை',
            Date: 'தேதி',
            Place: 'இடம்',
            'Vehicle No': 'வாகன எண்'
        },
        hi: {
            'My Sales': 'मेरी बिक्री',
            Name: 'नाम',
            Slot: 'स्लॉट',
            Price: 'मूल्य',
            Date: 'तारीख',
            Place: 'स्थान',
            'Vehicle No': 'वाहन संख्या'
        }
    };

    return translations[language][text] || text;
};

export default SalesTable;