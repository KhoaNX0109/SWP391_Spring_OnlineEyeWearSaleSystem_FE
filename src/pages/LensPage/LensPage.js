import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import productService from '../../services/productService';
import './LensPage.css';

const LensPage = () => {
    const [lenses, setLenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'grid-small', 'grid-large', 'list'

    useEffect(() => {
        const fetchLenses = async () => {
            try {
                const data = await productService.getAllLenses();
                setLenses(data);
            } catch (error) {
                console.error('Error fetching lenses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLenses();
    }, []);

    // SVG feature icons
    const featureIcons = {
        shield: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
        droplet: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
        eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
        check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
        lock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
        sun: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
        circle: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>
    };

    // Placeholder features cho moi lens dua tren lensType
    const getLensFeatures = (lensType) => {
        const featureMap = {
            'Single Vision': [
                { icon: featureIcons.shield, label: 'Hạn chế bám hơi nước' },
                { icon: featureIcons.droplet, label: 'Hạn chế trầy xước' },
                { icon: featureIcons.eye, label: 'Giải pháp chắn ánh sáng xanh' },
                { icon: featureIcons.sun, label: 'Ngăn ASR có hại' }
            ],
            'Bifocal': [
                { icon: featureIcons.shield, label: 'Hạn chế bám hơi nước' },
                { icon: featureIcons.check, label: 'Hạn chế trầy xước' },
                { icon: featureIcons.eye, label: 'Độ bền cao' },
                { icon: featureIcons.lock, label: 'Phù hợp với mọi dáng mắt' }
            ],
            'Progressive': [
                { icon: featureIcons.shield, label: 'Hạn chế bám hơi nước' },
                { icon: featureIcons.circle, label: 'Hạn chế hình ảnh chìm/thực' },
                { icon: featureIcons.eye, label: 'Độ bền cao nhận diện chính thực' },
                { icon: featureIcons.droplet, label: 'Ngăn ASR có hại' }
            ],
            'default': [
                { icon: featureIcons.shield, label: 'Hạn chế bám hơi nước' },
                { icon: featureIcons.sun, label: 'Chống chói' },
                { icon: featureIcons.droplet, label: 'Hạn chế trầy xước' },
                { icon: featureIcons.eye, label: 'Ngăn ASR có hại' }
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
            <Header />

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
                                    <div key={lens.lensId} className="lens-card">
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
                                <button className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </button>
                                <button className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </button>
                                <button className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </button>
                                <button className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LensPage;
