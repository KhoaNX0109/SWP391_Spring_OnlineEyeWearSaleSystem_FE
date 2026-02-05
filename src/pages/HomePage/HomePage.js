import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import productService from '../../services/productService';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showFrameDropdown, setShowFrameDropdown] = useState(false);
    const [frames, setFrames] = useState([]);
    const [loadingFrames, setLoadingFrames] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

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
        const category = frame.category || 'Khác';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(frame);
        return acc;
    }, {});

    if (loading) {
        return <LoadingScreen />;
    }

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
                        <div
                            className="nav-dropdown"
                            onMouseEnter={handleFrameHover}
                            onMouseLeave={handleFrameLeave}
                        >
                            <a href="#products" className="active">Gọng Kính</a>
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
                                                            {groupedFrames['Titan'] && (
                                                                <ul>
                                                                    <li><a href="#titan">Gọng Titan</a></li>
                                                                    <li><a href="#nhua">Gọng Nhựa</a></li>
                                                                    <li><a href="#kim-loai">Gọng Kim Loại</a></li>
                                                                    <li><a href="#pha-kim">Gọng nhựa pha kim loại</a></li>
                                                                </ul>
                                                            )}
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
                                                                <li><a href="#titan">The Titan</a></li>
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
                                <button className="social-btn" onClick={() => window.location.href = 'tel:19000359'}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                                        <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.086-1.391l-4.064-3.696z" />
                                    </svg>
                                </button>
                                <button className="social-btn" onClick={() => window.open('https://facebook.com', '_blank')}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                                    </svg>
                                </button>
                                <button className="social-btn" onClick={() => window.open('https://kinhmatanna.com', '_blank')}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                                        <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
                                    </svg>
                                </button>
                                <button className="social-btn" onClick={() => window.open('https://instagram.com', '_blank')}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
                                        <circle cx="16.806" cy="7.207" r="1.078" />
                                        <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z" />
                                    </svg>
                                </button>
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
