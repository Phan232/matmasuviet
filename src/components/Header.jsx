import React, { useState } from 'react';
import { Search, LogIn, UserPlus, LogOut, Menu, X, Award, Trophy, Compass, Home, Settings } from 'lucide-react';

export default function Header({ 
  currentScreen, 
  setCurrentScreen, 
  userSession, 
  setUserSession, 
  searchQuery, 
  setSearchQuery,
  openLoginModal,
  openRegisterModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = userSession?.role === 'admin';

  const handleLogout = () => {
    setUserSession(null);
    setCurrentScreen('home');
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'explore', label: 'Khám phá Quiz', icon: Compass },
    { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Trophy },
    { id: 'profile', label: 'Thành tích & Hồ sơ', icon: Award },
  ];

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Logo and Slogan */}
        <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); setCurrentScreen('home'); }}>
          <div className="logo-icon">📜</div>
          <div className="logo-text">
            Mật Mã Sử Việt
            <span className="logo-slogan">MẬT MÃ GIẢI MÃ LỊCH SỬ</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-only desktop-nav">
          <ul className="nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={`nav-link ${currentScreen === item.id || (item.id === 'profile' && currentScreen === 'achievements') ? 'active' : ''}`}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (item.id === 'profile' && !userSession) {
                        openLoginModal();
                      } else {
                        setCurrentScreen(item.id); 
                      }
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
            
            {isAdmin && (
              <li>
                <a 
                  href="#admin" 
                  className={`nav-link admin-nav-link ${currentScreen === 'admin' || currentScreen === 'create-quiz' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setCurrentScreen('admin'); }}
                >
                  <Settings size={16} />
                  <span>Quản trị</span>
                </a>
              </li>
            )}
          </ul>

          {/* Search bar */}
          <div className="search-bar">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm bộ quiz..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentScreen !== 'explore') setCurrentScreen('explore');
              }}
            />
          </div>

          {/* Auth Button Grid */}
          <div className="auth-buttons">
            {userSession ? (
              <div className="signed-in-actions">
                <div 
                  className="user-badge"
                  onClick={() => setCurrentScreen('profile')}
                >
                  <span className="user-avatar">{userSession.avatar || '🎓'}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{userSession.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#6B5547' }}>Cấp {userSession.level || 1} • {userSession.xp || 0} XP</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline" 
                  style={{ padding: '8px 12px', border: '1.5px solid #8B0C14', color: '#8B0C14' }}
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <button onClick={openLoginModal} className="btn btn-outline" style={{ padding: '10px 20px' }}>
                  <LogIn size={16} /> Đăng nhập
                </button>
                <button onClick={openRegisterModal} className="btn btn-primary" style={{ padding: '10px 20px' }}>
                  <UserPlus size={16} /> Đăng ký
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Hamburguer Toggle */}
        <button 
          className="mobile-only" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', color: 'var(--text-dark)' }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-only animate-fade-in" style={{
          backgroundColor: 'var(--bg-cream)',
          borderTop: '2px solid var(--bg-cream-dark)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Search bar mobile */}
          <div className="search-bar" style={{ maxWidth: '100%' }}>
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentScreen !== 'explore') setCurrentScreen('explore');
              }}
            />
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={`nav-link ${currentScreen === item.id ? 'active' : ''}`}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setMobileMenuOpen(false);
                      if (item.id === 'profile' && !userSession) {
                        openLoginModal();
                      } else {
                        setCurrentScreen(item.id); 
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </a>
                </li>
              );
            })}
            {isAdmin && (
              <li>
                <a 
                  href="#admin" 
                  className="nav-link"
                  onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setCurrentScreen('admin'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', color: '#D4AF37', fontWeight: 'bold' }}
                >
                  ⚙️ Trang quản trị
                </a>
              </li>
            )}
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--bg-cream-dark)', paddingTop: '16px' }}>
            {userSession ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="user-avatar">{userSession.avatar || '🎓'}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{userSession.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B5547' }}>Cấp {userSession.level || 1} • {userSession.xp || 0} XP</div>
                  </div>
                </div>
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="btn btn-outline" 
                  style={{ width: '100%', color: 'var(--primary-red)', borderColor: 'var(--primary-red)' }}
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => { openLoginModal(); setMobileMenuOpen(false); }} 
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  <LogIn size={16} /> Đăng nhập
                </button>
                <button 
                  onClick={() => { openRegisterModal(); setMobileMenuOpen(false); }} 
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <UserPlus size={16} /> Đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Styles for mobile triggers in Header */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}} />
    </header>
  );
}
