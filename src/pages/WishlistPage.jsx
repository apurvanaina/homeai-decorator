import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { PLATFORM_COLORS } from '../data/products';

export default function WishlistPage({ wishlist, onRemove }) {
  const navigate = useNavigate();
  const total = wishlist.reduce((sum, p) => sum + p.price, 0);

  if (wishlist.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f6f2' }}>
        <Navbar wishlistCount={0} />
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏠</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px' }}>Your wishlist is empty</h2>
          <p style={{ fontSize: '14px', color: '#aaa', margin: '0 0 28px' }}>Save items you love while browsing themes and products.</p>
          <button onClick={() => navigate('/')}
            style={{ padding: '13px 28px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Start exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2' }}>
      <Navbar wishlistCount={wishlist.length} />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 4px' }}>
              <Heart size={22} color="#1D9E75" fill="#1D9E75" style={{ verticalAlign: 'middle', marginRight: '8px' }} />
              Your Wishlist
            </h2>
            <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #ede9e3', borderRadius: '14px', padding: '14px 20px', textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: '#aaa', margin: '0 0 3px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</p>
            <p style={{ fontSize: '22px', fontWeight: '800', color: '#1D9E75', margin: 0 }}>&#8377;{total.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {wishlist.map(product => {
            const platformStyle = PLATFORM_COLORS[product.platform] || { bg: '#f5f5f5', text: '#555' };
            return (
              <div key={product.id} style={{ background: '#fff', border: '1px solid #ede9e3', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                  {product.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '8px', background: platformStyle.bg, color: platformStyle.text }}>
                      {product.platform}
                    </span>
                    <span style={{ fontSize: '10px', color: '#ccc' }}>{product.category}</span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: '#1D9E75', margin: 0 }}>&#8377;{product.price.toLocaleString('en-IN')}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                  <a href={product.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 12px', background: '#1D9E75', color: '#fff', borderRadius: '10px', fontSize: '12px', fontWeight: '500', textDecoration: 'none' }}>
                    <ExternalLink size={11} /> Buy
                  </a>
                  <button onClick={() => onRemove(product)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px', background: '#fff5f5', border: '1px solid #ffd5d5', borderRadius: '10px', cursor: 'pointer' }}>
                    <Trash2 size={13} color="#e05555" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '20px', padding: '20px', background: '#fff', border: '1px solid #ede9e3', borderRadius: '16px', display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/')}
            style={{ flex: 1, padding: '12px', background: '#f5f3f0', color: '#666', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            ← Keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}