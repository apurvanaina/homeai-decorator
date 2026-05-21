import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import UploadZone from '../components/UploadZone';
import { ROOM_TYPES } from '../data/themes';
import { ArrowRight } from 'lucide-react';

export default function RoomPage({ wishlistCount }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const room = ROOM_TYPES.find(r => r.id === roomId) || ROOM_TYPES[0];

  const handleUpload = (file) => {
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAnalyse = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      sessionStorage.setItem('roomPhoto', reader.result);
      sessionStorage.setItem('roomId', roomId);
      navigate(`/themes/${roomId}`);
    };
    if (photo) reader.readAsDataURL(photo);
    else navigate(`/themes/${roomId}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2' }}>
      <Navbar wishlistCount={wishlistCount} />
      <Breadcrumb steps={[{ label: room.label, path: `/room/${roomId}` }]} />
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px' }}>
            {room.icon} Upload your {room.label.toLowerCase()} photo
          </h2>
          <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>
            Our AI will analyse your space and generate a personalised redesign vision just for your room.
          </p>
        </div>
        <UploadZone onUpload={handleUpload} preview={preview} />
        <div style={{ marginTop: '12px', padding: '12px 16px', background: '#fff', border: '1px solid #ede9e3', borderRadius: '12px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: '1.5' }}>
            💡 <strong>Tip:</strong> A well-lit, wide-angle photo gives the best AI results. No photo? We'll suggest themes based on your room type.
          </p>
        </div>
        <button
          onClick={handleAnalyse}
          style={{ width: '100%', marginTop: '20px', padding: '14px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#0F6E56'}
          onMouseLeave={e => e.currentTarget.style.background = '#1D9E75'}
        >
          Analyse my room <ArrowRight size={18} />
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{ width: '100%', marginTop: '10px', padding: '12px', background: 'transparent', color: '#888', border: '1px solid #e0ddd8', borderRadius: '12px', fontSize: '14px', cursor: 'pointer' }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}