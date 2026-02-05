import React from 'react';
import logo from '../../assets/logo.png';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-logo">
                <img src={logo} alt="Anna Optics" />
            </div>
        </div>
    );
};

export default LoadingScreen;
