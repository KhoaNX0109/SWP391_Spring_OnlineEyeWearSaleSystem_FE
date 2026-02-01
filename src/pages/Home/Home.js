import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Eyewear Store</h1>
                <div className="user-info">
                    <span>Welcome, {user?.fullName || 'User'}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <main className="home-content">
                <div className="welcome-card">
                    <h2>Welcome to Eyewear Store</h2>
                    <p>You have successfully logged in!</p>
                    <div className="user-details">
                        <p><strong>Name:</strong> {user?.fullName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Username:</strong> {user?.username}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
