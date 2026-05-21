import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { THEMES, ROOM_TYPES } from '../data/themes';

export default function ProductsPage({ wishlist, toggleWishlist }) {
  const { roomId, themeId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const room = ROOM_TYPES.find(r => r.id === roomId) || ROOM_TYPES[0];
  const allThemes = THEMES[roomId] || [];
  const theme = allThemes.find(t => t.id === themeId);
  const productData = PRODUCTS[themeId] || PRODUCTS['modern-minimalist'];
  const categories = ['All', ...new Set(productData.items.map(i => i.category))];
  const filtered = activeFilter === 'All' ? productData.items : productData.items.filter(i => i.category === activeFilter);
  const totalPrice = filtered.reduce((sum, p) => sum + p.price, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2' }}>
      <Navbar wishlistCount={wishlist.length} />
      <Breadcrumb steps={[
        { label: room.label, path: `/room/${roomId}` },
        { label: theme?.name || 'Theme', path: `/themes/${roomId}` },
        { label: 'Shop' }
      ]} />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
              Shop the {theme?.name} look
            </h2>
            <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>Click the heart to save items to your wishlist</p>
          </div>
          <button onClick={() => navigate(`/themes/${roomId}`)}
            style={{ padding: '9px 16px', background: '#fff', color: '#666', border: '1px solid #e0ddd8', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
            ← Change theme
          </button>
        </div>

        {productData.insight && (
          <div style={{ background: '#fff', borderLeft: '3px solid #1D9E75', borderRadius: '12px', padding: '13px 16px', marginBottom: '20px', fontSize: '13px', color: '#555', lineHeight: '1.65', border: '1px solid #e8f5ee' }}>
            💡 {productData.insight}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              style={{ padding: '7px 16px', borderRadius: '20px', border: '1.5px solid', borderColor: activeFilter === cat ? '#1D9E75' : '#e0ddd8', background: activeFilter === cat ? '#E1F5EE' : '#fff', color: activeFilter === cat ? '#0F6E56' : '#777', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onWishlist={toggleWishlist}
              wishlisted={!!wishlist.find(p => p.id === product.id)}
            />
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #ede9e3', borderRadius: '18px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#bbb', margin: '0 0 4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Showing {filtered.length} items</p>
            <p style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0, letterSpacing: '-0.5px' }}>
              &#8377;{totalPrice.toLocaleString('en-IN')}
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#aaa', marginLeft: '6px' }}>estimated total</span>
            </p>
          </div>
          <button onClick={() => navigate('/wishlist')}
            style={{ padding: '11px 22px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
            View wishlist ({wishlist.length})
          </button>
        </div>
      </div>
    </div>
  );
}
