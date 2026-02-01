import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import loginBg from '../../assets/login-bg.png';
import signupBg from '../../assets/signup-bg.png';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(formData.username, formData.password);
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignup(!isSignup);
        setError('');
        setFormData({ username: '', password: '' });
    };

    return (
        <div className="login-container">
            <div className={`login-left ${isSignup ? 'slide-right' : ''}`} style={{ backgroundImage: `url(${isSignup ? signupBg : loginBg})` }}>
                <div className="login-content">
                    <h1>See the world clearly</h1>
                    <p>Discover our premium collection of handcrafted eyewear designed for modern visionaries.</p>
                </div>
            </div>

            <div className={`login-right ${isSignup ? 'slide-left' : ''}`}>
                <div className="login-form-wrapper">
                    <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="subtitle">{isSignup ? 'Sign up to get started' : 'Please sign in to your account'}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {!isSignup && (
                                <button type="button" className="forgot-password" onClick={() => alert('Forgot password feature coming soon')}>Forgot password?</button>
                            )}
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <button className="google-button">
                        <img src="https://www.google.com/favicon.ico" alt="Google" />
                        Sign in with Google
                    </button>

                    <p className="signup-link">
                        {isSignup ? "Already have an account? " : "Don't have an account? "}
                        <button type="button" onClick={toggleMode}>
                            {isSignup ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
