import React, { useState } from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { PLATFORM_COLORS } from '../data/products';

export default function ProductCard({ product, onWishlist, wishlisted }) {
  const [hovered, setHovered] = useState(false);
  const platformStyle = PLATFORM_COLORS[product.platform] || { bg: '#f5f5f5', text: '#555' };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ border: '1px solid #ede9e3', borderRadius: '16px', overflow: 'hidden', background: '#fff', transition: 'all 0.2s', boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.05)', transform: hovered ? 'translateY(-2px)' : 'none' }}
    >
      <div style={{ height: '120px', background: '#faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', position: 'relative' }}>
        {product.emoji}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product); }}
          style={{ position: 'absolute', top: '10px', right: '10px', background: wishlisted ? '#E1F5EE' : 'rgba(255,255,255,0.9)', border: '1px solid #e0ddd8', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Heart size={14} color={wishlisted ? '#1D9E75' : '#aaa'} fill={wishlisted ? '#1D9E75' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <span style={{ fontSize: '10px', fontWeight: '600', padding: '3px 8px', borderRadius: '10px', background: platformStyle.bg, color: platformStyle.text, display: 'inline-block', marginBottom: '6px' }}>
          {product.platform}
        </span>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px', lineHeight: '1.3' }}>{product.name}</p>
        <p style={{ fontSize: '15px', fontWeight: '700', color: '#1D9E75', margin: '0 0 10px' }}>&#8377;{product.price.toLocaleString('en-IN')}</p>
        <a href={product.url} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #e0ddd8', background: hovered ? '#1D9E75' : '#fff', color: hovered ? '#fff' : '#444', fontSize: '12px', fontWeight: '500', textDecoration: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}>
          <ExternalLink size={12} />
          View on {product.platform}
        </a>
      </div>
    </div>
  );
}