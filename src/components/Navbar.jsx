import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ wishlistCount = 0 }) {
  const navigate = useNavigate();
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#ffffff', borderBottom: '1px solid #f0ede8',
      padding: '0 24px', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 1px 12px rgba(0,0,0,0.06)'
    }}>
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '22px' }}>🏠</span>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
          HomeAI <span style={{ color: '#1D9E75' }}>Decorator</span>
        </span>
      </div>
      <button
        onClick={() => navigate('/wishlist')}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: wishlistCount > 0 ? '#E1F5EE' : 'transparent',
          border: '1px solid #e0ddd8', borderRadius: '20px',
          padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s'
        }}
      >
        <Heart size={16} color={wishlistCount > 0 ? '#1D9E75' : '#888'} fill={wishlistCount > 0 ? '#1D9E75' : 'none'} />
        <span style={{ fontSize: '13px', color: wishlistCount > 0 ? '#0F6E56' : '#888', fontWeight: '500' }}>
          {wishlistCount > 0 ? `${wishlistCount} saved` : 'Wishlist'}
        </span>
      </button>
    </nav>
  );
}