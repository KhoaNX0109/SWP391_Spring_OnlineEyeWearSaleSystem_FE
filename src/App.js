import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import HomePage from './pages/HomePage/HomePage';
import LensPage from './pages/LensPage/LensPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/trong-kinh" element={<LensPage />} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/" element={<Navigate to="/homepage" replace />} />
            </Routes>
        </Router>
    );
}
//end

export default App;
