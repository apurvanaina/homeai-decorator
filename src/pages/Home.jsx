import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ROOM_TYPES } from '../data/themes';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2' }}>
      <Navbar />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E1F5EE', borderRadius: '20px', padding: '6px 16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px' }}>✨</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F6E56', letterSpacing: '0.04em' }}>AI-POWERED HOME DESIGN</span>
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 16px', letterSpacing: '-1.5px', lineHeight: '1.15' }}>
            Redesign your home<br /><span style={{ color: '#1D9E75' }}>with AI</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#888', margin: '0 auto', lineHeight: '1.7', maxWidth: '440px' }}>
            Upload a photo of any room, get personalised decoration themes, and shop everything from Indian stores.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '48px' }}>
          {[
            { icon: '📸', title: 'Upload a photo', desc: 'Drag & drop your room image' },
            { icon: '🤖', title: 'AI analyses it', desc: 'Get personalised theme picks' },
            { icon: '🛒', title: 'Shop the look', desc: 'Buy from Indian stores' },
          ].map((step, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '20px 16px', textAlign: 'center', border: '1px solid #ede9e3' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{step.icon}</div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px' }}>{step.title}</p>
              <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px', paddingLeft: '4px' }}>
          Pick a room to begin
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {ROOM_TYPES.map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/room/${room.id}`)}
              style={{ background: '#fff', border: '1.5px solid #ede9e3', borderRadius: '20px', padding: '28px 20px', cursor: 'pointer', transition: 'all 0.22s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(29,158,117,0.12)'; e.currentTarget.style.borderColor = '#1D9E75'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#ede9e3'; }}
            >
              <span style={{ fontSize: '36px' }}>{room.icon}</span>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 3px' }}>{room.label}</p>
                <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>Explore themes →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}