import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './UserMenu.css';

const UserMenu = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const isLoggedIn = authService.isAuthenticated();
    const user = authService.getCurrentUser();

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setShowDropdown(false);
        navigate('/login');
    };

    // Chưa đăng nhập → icon đăng nhập
    if (!isLoggedIn) {
        return (
            <button className="user-menu-btn" onClick={() => navigate('/login')} title="Đăng nhập">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
            </button>
        );
    }

    // Đã đăng nhập → icon user + dropdown
    return (
        <div className="user-menu-wrapper" ref={dropdownRef}>
            <button
                className="user-menu-btn logged-in"
                onClick={() => setShowDropdown(!showDropdown)}
                title={user?.fullName || 'Tài khoản'}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </button>

            {showDropdown && (
                <div className="user-dropdown">
                    {/* User Info Header */}
                    <div className="user-dropdown-header">
                        <div className="user-dropdown-avatar">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#aaa">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        </div>
                        <div className="user-dropdown-info">
                            <span className="user-dropdown-name">{user?.fullName || 'User'}</span>
                            <span className="user-dropdown-email">{user?.email || ''}</span>
                        </div>
                    </div>

                    <div className="user-dropdown-divider"></div>

                    {/* Menu Items */}
                    <button className="user-dropdown-item" onClick={() => { setShowDropdown(false); navigate('/profile'); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Trang cá nhân</span>
                    </button>

                    <button className="user-dropdown-item" onClick={() => { setShowDropdown(false); navigate('/profile'); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <span>Đơn hàng của tôi</span>
                    </button>

                    <div className="user-dropdown-divider"></div>

                    <button className="user-dropdown-item logout" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
