import React from 'react';
import { Check } from 'lucide-react';

export default function ThemeCard({ theme, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: selected ? '2px solid #1D9E75' : '1px solid #ede9e3',
        borderRadius: '16px', padding: '16px', cursor: 'pointer',
        transition: 'all 0.2s', position: 'relative', background: '#fff',
        transform: selected ? 'translateY(-2px)' : 'none',
        boxShadow: selected ? '0 8px 24px rgba(29,158,117,0.15)' : '0 1px 4px rgba(0,0,0,0.05)'
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#1D9E75', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={13} color="#fff" strokeWidth={3} />
        </div>
      )}
      {theme.badge && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#E1F5EE', color: '#0F6E56', fontSize: '10px', fontWeight: '600', padding: '3px 8px', borderRadius: '10px' }}>
          {theme.badge}
        </div>
      )}
      <div style={{ display: 'flex', gap: '4px', height: '60px', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px', marginTop: theme.badge ? '18px' : '0' }}>
        {theme.colors.map((color, i) => (
          <div key={i} style={{ flex: 1, background: color }} />
        ))}
      </div>
      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px' }}>{theme.name}</p>
      <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: '1.4' }}>{theme.desc}</p>
    </div>
  );
}