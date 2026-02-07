import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import productService from '../../services/productService';
import './LensPage.css';

const LensPage = () => {
    const navigate = useNavigate();
    const [lenses, setLenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'grid-small', 'grid-large', 'list'

    useEffect(() => {
        const fetchLenses = async () => {
            try {
                const data = await productService.getAllLenses();
                setLenses(data);
            }catch (error) {
                console.error('Error fetching lenses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLenses();
    }, []);

    // Placeholder features cho mỗi lens dựa trên lensType
    const getLensFeatures = (lensType) => {
        const featureMap = {
            'Single Vision': [
                { icon: '🛡️', label: 'Hạn chế bám hơi nước' },
                { icon: '💧', label: 'Hạn chế trầy xước' },
                { icon: '🔵', label: 'Giải pháp chắn ánh sáng xanh' },
                { icon: '✨', label: 'Ngăn ASR có hại' }
            ],
            'Bifocal': [
                { icon: '🛡️', label: 'Hạn chế bám hơi nước' },
                { icon: '✅', label: 'Hạn chế trầy xước' },
                { icon: '🔵', label: 'Đô bền cao' },
                { icon: '🔒', label: 'Phù hợp với mọi đáng mắt' }
            ],
            'Progressive': [
                { icon: '🛡️', label: 'Hạn chế bám hơi nước' },
                { icon: '⭕', label: 'Hạn chế hình ảnh chìm/thực' },
                { icon: '🔵', label: 'Đô bền cao nhận diện chính thực' },
                { icon: '💧', label: 'Ngăn ASR có hại' }
            ],
            'default': [
                { icon: '🛡️', label: 'Hạn chế bám hơi nước' },
                { icon: '✨', label: 'Chống chói' },
                { icon: '💧', label: 'Hạn chế trầy xước' },
                { icon: '🔵', label: 'Ngăn ASR có hại' }
            ]
        };
        return featureMap[lensType] || featureMap['default'];
    };

    // Placeholder images cho mỗi brand
    const getLensImage = (brand) => {
        // Dùng placeholder tương ứng brand
        return null; // Sẽ hiển thị brand name thay thế
    };

    const getTagline = () => '*Tuyệt vời trong tầm giá';

    return (
        <div className="lens-page">
            {/* Header - giống HomePage */}
            <header className="header">
                <div className="header-container">
                    <div className="logo" onClick={() => navigate('/homepage')} style={{ cursor: 'pointer' }}>
                        <img src={logo} alt="Anna Eyeglasses" />
                    </div>
                    <nav className="nav">
                        <a href="/homepage">Trang chủ</a>
                        <a href="#gong-kinh">Gọng Kính ▾</a>
                        <a href="/trong-kinh" className="active">Tròng kính</a>
                        <a href="#kinh-ram">Kính râm</a>
                        <a href="#cua-hang">Tìm cửa hàng</a>
                        <a href="#xem-them">Xem thêm ▾</a>
                    </nav>
                    <div className="header-actions">
                        <button className="icon-btn" onClick={() => navigate('/login')}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </button>
                        <button className="icon-btn">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                        <button className="icon-btn">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Banner Section */}
            <section className="lens-banner">
                <div className="lens-banner-container">
                    <div className="lens-banner-image">
                        <div className="lens-banner-placeholder">
                            <div className="banner-overlay-text">
                                <span className="banner-script">Danh mục</span>
                                <span className="banner-title-text">TRÒNG KÍNH</span>
                                <span className="banner-brand">ANNA EYEGLASSES</span>
                            </div>
                        </div>
                    </div>
                    <div className="lens-banner-info">
                        <h1 className="lens-page-title">TRÒNG KÍNH</h1>
                        <p className="lens-page-description">
                            Kính mắt Anna cung cấp đa dạng tròng kính từ các thương hiệu uy tín:
                            Kochi lens, Chemi, Essilor,... Cam kết 100% chính hãng, hỗ trợ thị lực tối ưu
                            và bảo vệ mắt toàn diện.
                        </p>
                    </div>
                </div>
            </section>

            {/* Toolbar */}
            <section className="lens-toolbar">
                <div className="lens-toolbar-container">
                    <div className="toolbar-left">
                        <div className="view-modes">
                            <button
                                className={`view-btn ${viewMode === 'grid-small' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid-small')}
                                title="Lưới nhỏ"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <rect x="1" y="1" width="7" height="7" rx="1" />
                                    <rect x="12" y="1" width="7" height="7" rx="1" />
                                    <rect x="1" y="12" width="7" height="7" rx="1" />
                                    <rect x="12" y="12" width="7" height="7" rx="1" />
                                </svg>
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'grid-large' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid-large')}
                                title="Lưới lớn"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <rect x="1" y="1" width="5" height="5" rx="1" />
                                    <rect x="8" y="1" width="5" height="5" rx="1" />
                                    <rect x="15" y="1" width="5" height="5" rx="1" />
                                    <rect x="1" y="8" width="5" height="5" rx="1" />
                                    <rect x="8" y="8" width="5" height="5" rx="1" />
                                    <rect x="15" y="8" width="5" height="5" rx="1" />
                                    <rect x="1" y="15" width="5" height="5" rx="1" />
                                    <rect x="8" y="15" width="5" height="5" rx="1" />
                                    <rect x="15" y="15" width="5" height="5" rx="1" />
                                </svg>
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="Danh sách"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <rect x="1" y="2" width="18" height="3" rx="1" />
                                    <rect x="1" y="8" width="18" height="3" rx="1" />
                                    <rect x="1" y="14" width="18" height="3" rx="1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="toolbar-center">
                        <span className="product-count">{lenses.length} sản phẩm</span>
                    </div>
                    <div className="toolbar-right">
                        <button className="filter-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Lens Grid */}
            <section className="lens-products">
                <div className="lens-products-container">
                    {loading ? (
                        <div className="lens-loading">
                            <div className="spinner"></div>
                            <p>Đang tải tròng kính...</p>
                        </div>
                    ) : lenses.length === 0 ? (
                        <div className="lens-empty">
                            <p>Không có tròng kính nào.</p>
                        </div>
                    ) : (
                        <div className={`lens-grid ${viewMode}`}>
                            {lenses.map((lens) => {
                                const features = getLensFeatures(lens.lensType);
                                return (
                                    <div key={lens.lensId}className="lens-card">
                                        {/* Card Top - Brand & Tagline */}
                                        <div className="lens-card-header">
                                            <h3 className="lens-brand-name">{lens.brand}</h3>
                                            <p className="lens-tagline">{getTagline()}</p>
                                        </div>

                                        {/* Features Row */}
                                        <div className="lens-features">
                                            {features.map((feature, index) => (
                                                <div key={index} className="lens-feature-item">
                                                    <div className="feature-icon">{feature.icon}</div>
                                                    <span className="feature-label">{feature.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Lens Image Area */}
                                        <div className="lens-card-image">
                                            <div className="lens-image-placeholder">
                                                <div className="lens-type-badge">{lens.lensType}</div>
                                                <div className="lens-brand-display">{lens.brand}</div>
                                            </div>
                                        </div>

                                        {/* Price & Info */}
                                        <div className="lens-card-footer">
                                            <span className="lens-price">
                                                {lens.basePrice
                                                    ? Number(lens.basePrice).toLocaleString('vi-VN') + 'đ'
                                                    : 'Liên hệ'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <h3>Góp ý</h3>
                            <p>Anna luôn lắng nghe để tốt hơn mỗi ngày.</p>
                            <button className="btn-feedback">ĐÓNG GÓP Ý KIẾN</button>
                        </div>
                        <div className="footer-col">
                            <h3>Hotline</h3>
                            <p className="hotline">19000359</p>
                            <h3>Email</h3>
                            <p className="email">marketing@kinhmatanna.com</p>
                        </div>
                        <div className="footer-col">
                            <div className="social-icons">
                                <button className="social-btn">📞</button>
                                <button className="social-btn">📘</button>
                                <button className="social-btn">ℹ️</button>
                                <button className="social-btn">📷</button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LensPage;
