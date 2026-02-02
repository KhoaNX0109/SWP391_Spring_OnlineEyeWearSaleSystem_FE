import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/" element={<Navigate to="/homepage" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
