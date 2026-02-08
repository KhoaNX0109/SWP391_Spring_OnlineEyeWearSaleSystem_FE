import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Header from '../../components/Header/Header';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [activeTab, setActiveTab] = useState('orders');

    // Thông tin tài khoản form state
    const [accountForm, setAccountForm] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Thông tin địa chỉ form state
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        phone: '',
        address: '',
        ward: '',
        district: '',
        city: ''
    });

    const handleAccountChange = (e) => {
        setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // Mock data đơn hàng (trống)
    const orders = [];

    const menuIcons = {
        orders: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="8" y1="9" x2="16" y2="9"></line>
                <line x1="8" y1="13" x2="16" y2="13"></line>
                <line x1="8" y1="17" x2="12" y2="17"></line>
            </svg>
        ),
        account: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        ),
        address: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
        logout: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
        )
    };

    const menuItems = [
        { id: 'orders', label: 'Danh sách sản phẩm' },
        { id: 'account', label: 'Thông tin tài khoản' },
        { id: 'address', label: 'Thông tin địa chỉ' },
        { id: 'logout', label: 'Đăng xuất' }
    ];

    const handleMenuClick = (id) => {
        if (id === 'logout') {
            handleLogout();
            return;
        }
        setActiveTab(id);
    };

    // ---- Tab: Danh sách sản phẩm (đơn hàng) ----
    const renderOrdersTab = () => (
        <div className="profile-tab-content">
            {/* Stat Cards */}
            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-icon purchased">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">0</span>
                        <span className="stat-label">Sản phẩm đã mua</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon wishlist">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <path d="M12 8v8m-4-4h8"></path>
                        </svg>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">0</span>
                        <span className="stat-label">Sản phẩm yêu thích</span>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <h2 className="tab-title">Sản phẩm đã mua</h2>
            <div className="orders-table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Tổng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-row">
                                    Chưa có đơn hàng nào
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.code}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.status}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <button className="btn-detail">Chi tiết</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // ---- Tab: Thông tin tài khoản ----
    const renderAccountTab = () => (
        <div className="profile-tab-content">
            <h2 className="tab-title">Thông tin tài khoản</h2>
            <div className="account-layout">
                <div className="account-form-section">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tên<span className="required">*</span></label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Tên"
                                value={accountForm.firstName}
                                onChange={handleAccountChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Họ<span className="required">*</span></label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Họ"
                                value={accountForm.lastName}
                                onChange={handleAccountChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tên hiển thị<span className="required">*</span></label>
                            <input
                                type="text"
                                name="displayName"
                                placeholder="Tên hiển thị"
                                value={accountForm.displayName}
                                onChange={handleAccountChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Địa chỉ email<span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Địa chỉ email"
                                value={accountForm.email}
                                onChange={handleAccountChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Số điện thoại<span className="required">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={accountForm.phone}
                                onChange={handleAccountChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="account-right-section">
                    {/* Avatar Upload */}
                    <div className="avatar-upload">
                        <div className="avatar-upload-preview">
                            <img src="/products/glasses1.jpg" alt="Avatar" onError={(e) => { e.target.style.display = 'none'; }} />
                            <div className="avatar-upload-logo">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15 8L22 8L17 13L19 20L12 16L5 20L7 13L2 8L9 8Z" />
                                </svg>
                            </div>
                        </div>
                        <button className="avatar-upload-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                        </button>
                    </div>

                    {/* Password Fields */}
                    <div className="password-section">
                        <div className="form-group">
                            <label>Mật khẩu hiện tại</label>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Mật khẩu hiện tại"
                                value={accountForm.currentPassword}
                                onChange={handleAccountChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Mật khẩu mới"
                                value={accountForm.newPassword}
                                onChange={handleAccountChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu"
                                value={accountForm.confirmPassword}
                                onChange={handleAccountChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button className="btn-cancel">Hủy</button>
                <button className="btn-save">Lưu thay đổi</button>
            </div>
        </div>
    );

    // ---- Tab: Thông tin địa chỉ ----
    const renderAddressTab = () => (
        <div className="profile-tab-content">
            <h2 className="tab-title">Thông tin địa chỉ</h2>
            <p className="tab-description">Địa chỉ sau sẽ được sử dụng mặc định ở trang thanh toán.</p>

            <div className="address-section">
                <h3 className="address-subtitle">Địa chỉ thanh toán</h3>
                <div className="address-form">
                    <div className="form-row two-cols">
                        <div className="form-group">
                            <label>Họ và tên<span className="required">*</span></label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Họ và tên"
                                value={addressForm.fullName}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại<span className="required">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={addressForm.phone}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Địa chỉ<span className="required">*</span></label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={addressForm.address}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="form-row two-cols">
                        <div className="form-group">
                            <label>Phường / Xã</label>
                            <input
                                type="text"
                                name="ward"
                                placeholder="Phường / Xã"
                                value={addressForm.ward}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Quận / Huyện</label>
                            <input
                                type="text"
                                name="district"
                                placeholder="Quận / Huyện"
                                value={addressForm.district}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tỉnh / Thành phố</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Tỉnh / Thành phố"
                                value={addressForm.city}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn-cancel">Hủy</button>
                    <button className="btn-save">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'orders': return renderOrdersTab();
            case 'account': return renderAccountTab();
            case 'address': return renderAddressTab();
            default: return renderOrdersTab();
        }
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                {/* Sidebar */}
                <aside className="profile-sidebar">
                    <div className="sidebar-avatar">
                        <div className="avatar-circle">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="#ccc">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        </div>
                    </div>

                    <div className="sidebar-divider"></div>

                    <nav className="sidebar-menu">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                className={`sidebar-menu-item ${activeTab === item.id ? 'active' : ''} ${item.id === 'logout' ? 'logout' : ''}`}
                                onClick={() => handleMenuClick(item.id)}
                            >
                                <span className="menu-icon">{menuIcons[item.id]}</span>
                                <span className="menu-label">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="profile-main">
                    {renderContent()}
                </main>
            </div>

            {/* Footer */}
            <footer className="profile-footer">
                <div className="footer-content">
                    <span>Anna &copy; 2023 - 2024. Design by OkHub VietNam</span>
                    <div className="footer-links">
                        <a href="#stores">Hệ Thống Cửa Hàng</a>
                        <a href="#shop">Cửa Hàng</a>
                        <a href="#blog">Bài viết</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProfilePage;
