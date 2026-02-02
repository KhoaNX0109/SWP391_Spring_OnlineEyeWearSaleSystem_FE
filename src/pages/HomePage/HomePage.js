import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const bestSellers = [
        { id: 1, name: 'GK.M GỌNG NI LỤA AN221363 (50,18,145)', price: '390.000đ', image: '/products/glasses1.jpg' },
        { id: 2, name: 'GK. GỌNG NI LỤA CỨNG AN266 (52,17,145)', price: '800.000đ', image: '/products/glasses2.jpg' },
        { id: 3, name: 'GK. GỌNG CỐT TIM LOẠI AN220625...', price: '650.000đ', image: '/products/glasses3.jpg' },
        { id: 4, name: 'GK.M GỌNG CÀNG MỀM LOẠI AN221415...', price: '400.000đ', image: '/products/glasses4.jpg' }
    ];

    const newProducts = [
        { id: 5, name: 'Gọng kính thời trang, mã hàng: TR27075', price: '280.000đ', image: '/products/glasses5.jpg' },
        { id: 6, name: 'Gọng kính thời trang, mã hàng: TN3291', price: '1.520.000đ', image: '/products/glasses6.jpg' },
        { id: 7, name: 'Gọng kính thời trang, mã hàng: TITTC 04...', price: '580.000đ', image: '/products/glasses7.jpg' },
        { id: 8, name: 'Gọng kính thời trang, mã hàng: S01010', price: '580.000đ', image: '/products/glasses8.jpg' }
    ];

    const collections = [
        { id: 1, name: 'THẾ TITAN', image: '/collections/collection1.jpg' },
        { id: 2, name: 'KÉO LỤA', image: '/collections/collection2.jpg' },
        { id: 3, name: 'THẾ TITAN', image: '/collections/collection3.jpg' }
    ];

    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <img src={logo} alt="Anna Eyeglasses" />
                    </div>
                    <nav className="nav">
                        <a href="#home">Trang chủ</a>
                        <a href="#products" className="active">Gọng Kính</a>
                        <a href="#lenses">Tròng kính</a>
                        <a href="#sunglasses">Kính râm</a>
                        <a href="#stores">Tìm cửa hàng</a>
                        <a href="#about">Xem thêm</a>
                    </nav>
                    <div className="header-actions">
                        <button className="icon-btn" onClick={() => navigate('/login')}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </button>
                        <button className="icon-btn">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                        <button className="icon-btn">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3"></path>
                                <path d="M9 2v4h6V2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Tết An Chill 2026</h1>
                        <div className="hero-badges">
                            <div className="badge">
                                <span className="badge-label">SALE</span>
                                <span className="badge-value">40%</span>
                            </div>
                            <div className="badge">
                                <span className="badge-value">1K</span>
                                <span className="badge-label">GỌNG KÍNH</span>
                            </div>
                            <div className="badge">
                                <span className="badge-label">TÚI MÙ</span>
                                <span className="badge-value">KÍNH</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/hero-couple.jpg" alt="Tết An Chill" />
                    </div>
                </div>
            </section>

            {/* Best Seller Section */}
            <section className="section best-seller">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">BEST SELLER</h2>
                        <div className="section-tabs">
                            <button className="tab active">Gọng kính</button>
                            <button className="tab">Tròng Kính</button>
                            <button className="tab">Kính râm</button>
                            <button className="tab-more">Xem tất cả →</button>
                        </div>
                    </div>
                    <div className="product-grid">
                        {bestSellers.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <div className="product-logo">
                                        <svg width="30" height="30" viewBox="0 0 40 40">
                                            <path d="M20 5L25 15L35 15L27 22L30 32L20 26L10 32L13 22L5 15L15 15Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <img src={product.image} alt={product.name} />
                                    <p className="brand-name">anna eyeglasses</p>
                                </div>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                            </div>
                        ))}
                    </div>
                    <button className="btn-view-more">XEM TOÀN BỘ SẢN PHẨM</button>
                </div>
            </section>

            {/* New Products Section */}
            <section className="section new-products">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">SẢN PHẨM MỚI</h2>
                        <div className="section-tabs">
                            <button className="tab active">Gọng kính</button>
                            <button className="tab">Tròng Kính</button>
                            <button className="tab">Kính râm</button>
                            <button className="tab-more">Xem tất cả →</button>
                        </div>
                    </div>
                    <div className="product-grid">
                        {newProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                            </div>
                        ))}
                    </div>
                    <button className="btn-view-more">XEM TOÀN BỘ SẢN PHẨM</button>
                </div>
            </section>

            {/* Store Visit Section */}
            <section className="section store-visit">
                <div className="container-fluid">
                    <div className="store-content">
                        <div className="store-image">
                            <img src="/store-interior.jpg" alt="Anna Eyeglasses Store" />
                        </div>
                        <div className="store-text">
                            <h2>GHÉ THĂM HỆ THỐNG</h2>
                            <p className="store-subtitle">Tìm cửa hàng gần nhất</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Section */}
            <section className="section collection">
                <div className="container">
                    <h2 className="section-title center">COLLECTION</h2>
                    <div className="collection-grid">
                        {collections.map(item => (
                            <div key={item.id} className="collection-card">
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                <button className="btn-link">xem thêm</button>
                            </div>
                        ))}
                    </div>
                    <button className="btn-view-more">XEM THÊM</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <h3>Góp ý</h3>
                            <p>Anna luôn lắng nghe để tốt hơn mỗi ngày. Hãy để lại góp ý để chúng tôi cải thiện sản phẩm và dịch vụ.</p>
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
                                <a href="#"><i className="icon-phone"></i></a>
                                <a href="#"><i className="icon-facebook"></i></a>
                                <a href="#"><i className="icon-globe"></i></a>
                                <a href="#"><i className="icon-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-links">
                            <div>
                                <h4>Giới thiệu</h4>
                                <p>Công ty TNHH ALC Phú Đạt</p>
                                <p>ĐKKD số 0102489212 cấp ngày 21/09/2023 tại Sở Kế hoạch và Đầu tư TP. Hà Nội</p>
                            </div>
                            <div>
                                <h4>Chính sách</h4>
                                <a href="#">Chính sách khách hàng</a>
                                <a href="#">Chính sách bảo hành</a>
                                <a href="#">Chính sách vận chuyển</a>
                            </div>
                            <div>
                                <h4>Danh mục</h4>
                                <a href="#">Tết An Chill</a>
                                <a href="#">Kéo Lụa</a>
                                <a href="#">Thế Titan</a>
                                <a href="#">Gọng kính</a>
                                <a href="#">Tròng kính</a>
                                <a href="#">Kính râm</a>
                            </div>
                            <div>
                                <h4>Thương mại điện tử</h4>
                                <div className="ecommerce-icons">
                                    <img src="/tiktok-shop.png" alt="TikTok Shop" />
                                    <img src="/shopee.png" alt="Shopee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
