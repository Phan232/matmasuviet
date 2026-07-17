import React from 'react';
import { Compass, Award, Trophy, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ setCurrentScreen }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-dark-brown)',
      color: 'var(--text-light)',
      padding: '60px 0 30px',
      marginTop: 'auto',
      borderTop: '4px solid var(--accent-gold)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.8rem' }}>📜</span>
              <h3 style={{ color: 'var(--accent-gold)', margin: 0, textTransform: 'uppercase', fontSize: '1.25rem' }}>MẬT MÃ SỬ VIỆT</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,253,249,0.7)', marginBottom: '20px', lineHeight: 1.6 }}>
              Nền tảng học lịch sử kết hợp minigame giải đố độc đáo, giúp khơi dậy lòng yêu nước và ghi nhớ sâu sắc các trang sử hào hùng của dân tộc Việt Nam.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" className="category-icon" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={18} height={18} fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="category-icon" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="category-icon" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={18} height={18} fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1rem', borderBottom: '2px solid rgba(212,175,55,0.2)', paddingBottom: '8px' }}>LIÊN KẾT NHANH</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentScreen('home'); }} style={{ color: 'rgba(255,253,249,0.8)' }} onMouseOver={(e) => e.target.style.color = '#D4AF37'} onMouseOut={(e) => e.target.style.color = 'rgba(255,253,249,0.8)'}>Trang chủ</a>
              </li>
              <li>
                <a href="#explore" onClick={(e) => { e.preventDefault(); setCurrentScreen('explore'); }} style={{ color: 'rgba(255,253,249,0.8)' }} onMouseOver={(e) => e.target.style.color = '#D4AF37'} onMouseOut={(e) => e.target.style.color = 'rgba(255,253,249,0.8)'}>Khám phá Quiz</a>
              </li>
              <li>
                <a href="#leaderboard" onClick={(e) => { e.preventDefault(); setCurrentScreen('leaderboard'); }} style={{ color: 'rgba(255,253,249,0.8)' }} onMouseOver={(e) => e.target.style.color = '#D4AF37'} onMouseOut={(e) => e.target.style.color = 'rgba(255,253,249,0.8)'}>Bảng xếp hạng</a>
              </li>
              <li>
                <a href="#profile" onClick={(e) => { e.preventDefault(); setCurrentScreen('profile'); }} style={{ color: 'rgba(255,253,249,0.8)' }} onMouseOver={(e) => e.target.style.color = '#D4AF37'} onMouseOut={(e) => e.target.style.color = 'rgba(255,253,249,0.8)'}>Thành tích cá nhân</a>
              </li>
            </ul>
          </div>

          {/* Rules & Information */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1rem', borderBottom: '2px solid rgba(212,175,55,0.2)', paddingBottom: '8px' }}>THÔNG TIN HỌC TẬP</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,253,249,0.8)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={14} className="text-gold" />
                <span>3 chủ đề lịch sử cốt lõi</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={14} className="text-gold" />
                <span>Hệ thống 8 huy hiệu danh dự</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={14} className="text-gold" />
                <span>Minigame kéo thả giải mật mã</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={14} className="text-gold" />
                <span>Kiến thức sâu sắc qua từng câu hỏi</span>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1rem', borderBottom: '2px solid rgba(212,175,55,0.2)', paddingBottom: '8px' }}>LIÊN HỆ</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'rgba(255,253,249,0.8)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>Đại học Sư phạm Hà Nội, Đường Xuân Thủy, Cầu Giấy, Hà Nội</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>+84 24 1234 5678</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>lienhe@matmasuviet.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator and copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,253,249,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'rgba(255,253,249,0.5)'
        }}>
          <span>© 2026 Mật Mã Sử Việt. Bảo lưu mọi quyền. Đồ án Thiết kế Game giáo dục lịch sử.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'rgba(255,253,249,0.5)' }}>Điều khoản dịch vụ</a>
            <a href="#" style={{ color: 'rgba(255,253,249,0.5)' }}>Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
