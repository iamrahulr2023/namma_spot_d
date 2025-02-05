import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Wallet.css';
import { useLanguage } from '../../../USER1/Homepage/LanguageContext';

const translations = {
    en: {
        welcomeBack: "Welcome back",
        deposit: "Deposit",
        withdraw: "Withdraw",
        transfer: "Transfer",
        transactions: "Transactions"
    },
    ta: {
        welcomeBack: "மீண்டும் வருக",
        deposit: "வைப்பு",
        withdraw: "பின்வாங்க",
        transfer: "மாற்று",
        transactions: "பரிவர்த்தனைகள்"
    },
    hi: {
        welcomeBack: "वापसी पर स्वागत है",
        deposit: "जमा करें",
        withdraw: "निकालना",
        transfer: "स्थानांतरण",
        transactions: "लेनदेन"
    }
};

const WalletPage = () => {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    const [transactions, setTransactions] = useState([]);
    const [adminName, setAdminName] = useState("");
    const [totalBalance, setTotalBalance] = useState(0);
    const [profileImage, setProfileImage] = useState(localStorage.getItem('anotherProfileImageKey') || 'default-image-url');

    useEffect(() => {
        axios.get('http://localhost:3001/getconfirmb')
            .then(result => {
                if (Array.isArray(result.data)) {
                    setTransactions(result.data);
                } else {
                    setTransactions([result.data]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/getaname')
            .then(result => {
                if (result.data && result.data.name) {
                    setAdminName(result.data.name);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const balance = transactions.reduce((acc, transaction) => acc + (transaction.totalAmount || 0), 0);
        setTotalBalance(balance);
    }, [transactions]);

    return (
        <div className="body123">
            <div className="bodywallet">
                <div className="wallet-container">
                    <header className="wallet-header">
                        <div className="wallet-profile">
                            <img
                                src={profileImage}
                                alt="Profile"
                            />
                            <div className="wallet-welcome">
                                <h2>Hey {adminName}</h2>
                                <p>{t.welcomeBack}</p>
                            </div>
                        </div>
                        <div className="wallet-qr-code">
                            <img
                                src="https://th.bing.com/th/id/OIP.-9N4K3Syg-OgbET8dgDwqAHaHa?rs=1&pid=ImgDetMain"
                                alt="QR Code"
                            />
                        </div>
                    </header>
                    <div className="wallet-balance">
                        <h1>₹{totalBalance.toFixed(2)}</h1>
                    </div>
                    <div className="wallet-actions">
                        <button className="wallet-action-btn">{t.deposit}</button>
                        <button className="wallet-action-btn">{t.withdraw}</button>
                        <button className="wallet-action-btn">{t.transfer}</button>
                    </div>
                    <section className="wallet-transactions">
                        <div className="wallet-transactions-header">
                            <h3>{t.transactions}</h3>
                            <select>
                                <option value="June">June</option>
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April</option>
                                <option value="May">May</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select>
                        </div>
                        <ul className='ultag'>
                            {transactions.map((transaction, index) => (
                                <li key={index}>
                                    <div className="wallet-details">
                                        <p>{transaction.name}</p>
                                        <p className={`wallet-amount ${transaction.totalAmount >= 0 ? '' : 'wallet-negative'}`}>
                                        ₹{(transaction.totalAmount ?? 0).toFixed(2)}
                                        </p>
                                        <p>{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
