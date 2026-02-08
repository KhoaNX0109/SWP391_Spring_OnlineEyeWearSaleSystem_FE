import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import UserMenu from '../UserMenu/UserMenu';
import productService from '../../services/productService';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const [showFrameDropdown, setShowFrameDropdown] = useState(false);
    const [frames, setFrames] = useState([]);
    const [loadingFrames, setLoadingFrames] = useState(false);

    const handleFrameHover = async () => {
        setShowFrameDropdown(true);
        if (frames.length === 0 && !loadingFrames) {
            setLoadingFrames(true);
            try {
                const data = await productService.getAllFrames();
                setFrames(data);
            } catch (error) {
                console.error('Error fetching frames:', error);
            } finally {
                setLoadingFrames(false);
            }
        }
    };

    const handleFrameLeave = () => {
        setShowFrameDropdown(false);
    };

    const groupedFrames = frames.reduce((acc, frame) => {
        const category = frame.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(frame);
        return acc;
    }, {});

    const isActive = (path) => location.pathname === path;

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo">
                    <a href="/homepage">
                        <img src={logo}alt="Anna Eyeglasses" />
                    </a>
                </div>
                <nav className="nav">
                    <a href="/homepage" className={isActive('/homepage') || isActive('/') ? 'active' : ''}>Trang chủ</a>
                    <div
                        className="nav-dropdown"
                        onMouseEnter={handleFrameHover}
                        onMouseLeave={handleFrameLeave}
                    >
                        <a href="#products" className={isActive('/gong-kinh') ? 'active' : ''}>Gọng Kính ▾</a>
                        {showFrameDropdown && (
                            <div className="dropdown-menu">
                                {loadingFrames ? (
                                    <div className="dropdown-loading">Đang tải...</div>
                                ) : (
                                    <div className="dropdown-content">
                                        <div className="dropdown-columns">
                                            {Object.keys(groupedFrames).length > 0 ? (
                                                <>
                                                    <div className="dropdown-col">
                                                        <h4>Chất liệu</h4>
                                                        <ul>
                                                            <li><a href="#titan">Gọng Titan</a></li>
                                                            <li><a href="#nhua">Gọng Nhựa</a></li>
                                                            <li><a href="#kim-loai">Gọng Kim Loại</a></li>
                                                            <li><a href="#pha-kim">Gọng nhựa pha kim loại</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="dropdown-col">
                                                        <h4>Hình dáng</h4>
                                                        <ul>
                                                            <li><a href="#oval">Gọng Kính Oval</a></li>
                                                            <li><a href="#tron">Gọng Kính Tròn</a></li>
                                                            <li><a href="#vuong">Gọng Kính Vuông</a></li>
                                                            <li><a href="#chu-nhat">Gọng Kính Chữ Nhật</a></li>
                                                            <li><a href="#ba-giac">Gọng Kính Ba Giác</a></li>
                                                            <li><a href="#mat-meo">Gọng Kính Mắt Mèo</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="dropdown-col">
                                                        <h4>Bộ sưu tập</h4>
                                                        <ul>
                                                            <li><a href="#tet">Tết An Chill</a></li>
                                                            <li><a href="#titan-col">The Titan</a></li>
                                                            <li><a href="#keo">Kéo Lụa</a></li>
                                                        </ul>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="dropdown-empty">Không có sản phẩm</div>
                                            )}
                                        </div>
                                        <div className="dropdown-images">
                                            <img src="/products/glasses1.jpg" alt="Frame 1" />
                                            <img src="/products/glasses2.jpg" alt="Frame 2" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <a href="/trong-kinh" className={isActive('/trong-kinh') ? 'active' : ''}>Tròng kính</a>
                    <a href="#sunglasses">Kính râm</a>
                    <a href="#stores">Tìm cửa hàng</a>
                    <a href="#about">Xem thêm</a>
                </nav>
                <div className="header-actions">
                    <UserMenu />
                    <button className="icon-btn">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                    <button className="icon-btn">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
