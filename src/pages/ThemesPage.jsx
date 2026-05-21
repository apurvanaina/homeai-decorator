import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import ThemeCard from '../components/ThemeCard';
import { THEMES, ROOM_TYPES } from '../data/themes';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

const SERVER = 'http://localhost:3001';

export default function ThemesPage({ wishlistCount }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState('');
  const [moodBoard, setMoodBoard] = useState(null);
  const [customRequest, setCustomRequest] = useState('');
  const [generating, setGenerating] = useState(false);
  const room = ROOM_TYPES.find(r => r.id === roomId) || ROOM_TYPES[0];
  const themes = THEMES[roomId] || THEMES['living-room'];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const photo = sessionStorage.getItem('roomPhoto');
    if (photo) analyseWithAI(photo, room.label);
    else {
      setAiInsight(`Based on typical ${room.label.toLowerCase()} layouts, here are themes that work beautifully for Indian homes.`);
      setLoading(false);
    }
  }, [roomId]);

  const analyseWithAI = async (photoData, roomLabel) => {
    try {
      const base64 = photoData.split(',')[1];
      const response = await fetch(`${SERVER}/api/analyse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Image: base64, roomLabel })
      });
      const data = await response.json();
      if (data.content?.[0]) setAiInsight(data.content[0].text);
      else setAiInsight(`Your ${roomLabel.toLowerCase()} has wonderful potential!`);
    } catch {
      setAiInsight(`Your ${roomLabel.toLowerCase()} looks wonderful! Here are themes that would work beautifully.`);
    }
    setLoading(false);
  };

  const generateMoodBoard = async () => {
    if (!selected) return;
    setGenerating(true);
    setMoodBoard(null);
    try {
      const photo = sessionStorage.getItem('roomPhoto');
      const response = await fetch(`${SERVER}/api/moodboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: photo ? photo.split(',')[1] : null,
          roomLabel: room.label,
          themeName: selected.name,
          customRequest
        })
      });
      const data = await response.json();
      if (data.content?.[0]) {
        const clean = data.content[0].text.trim().replace(/```json|```/g, '').trim();
        setMoodBoard(JSON.parse(clean));
      }
    } catch {
      setMoodBoard({
        headline: `Your dream ${selected.name} ${room.label}`,
        overview: `A beautifully curated ${selected.name} space that balances aesthetics with everyday Indian living.`,
        palette: [
          { name: "Warm White", hex: "#F5F0E8", usage: "Walls and ceiling" },
          { name: "Natural Wood", hex: "#C4956A", usage: "Furniture" },
          { name: "Deep Green", hex: "#1D9E75", usage: "Accents and plants" },
          { name: "Charcoal", hex: "#2C2C2A", usage: "Frames and fixtures" }
        ],
        zones: [
          { name: "Seating", description: "Low-profile sofa with clean lines and neutral upholstery." },
          { name: "Lighting", description: "Layered lighting with a statement pendant and floor lamps." },
          { name: "Walls & Floors", description: "Neutral walls with a textured accent wall and natural rugs." },
          { name: "Accents", description: "Plants, ceramics, and one statement art piece." }
        ],
        keyPieces: [
          "Low-profile 3-seater sofa in oatmeal linen",
          "Solid wood coffee table with natural finish",
          "Statement pendant light in matte black",
          "Large leafy indoor plant in ceramic pot",
          "Handwoven area rug in neutral tones"
        ],
        designTip: "Start with one statement piece and build the room around its colour and texture."
      });
    }
    setGenerating(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2' }}>
      <Navbar wishlistCount={wishlistCount} />
      <Breadcrumb steps={[{ label: room.label, path: `/room/${roomId}` }, { label: 'Choose Theme' }]} />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          Choose your theme
        </h2>
        <p style={{ fontSize: '14px', color: '#aaa', margin: '0 0 20px' }}>
          Pick a style, generate your mood board, then shop the look.
        </p>

        <div style={{ background: '#fff', border: '1px solid #e8f5ee', borderLeft: '3px solid #1D9E75', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Sparkles size={16} color="#1D9E75" style={{ marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: '1.7' }}>
            {loading ? '🔍 Analysing your room photo...' : aiInsight}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {themes.map(theme => (
            <ThemeCard key={theme.id} theme={theme} selected={selected?.id === theme.id}
              onClick={() => { setSelected(theme); setMoodBoard(null); setCustomRequest(''); }} />
          ))}
        </div>

        {selected && (
          <div style={{ background: '#fff', border: '1.5px solid #1D9E75', borderRadius: '20px', padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Sparkles size={18} color="#1D9E75" />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                Generate your {selected.name} mood board
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 14px' }}>Any specific requests? (optional)</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                value={customRequest}
                onChange={e => setCustomRequest(e.target.value)}
                placeholder="e.g. Add a reading corner, prefer light colours, small space..."
                style={{ flex: 1, padding: '10px 14px', border: '1px solid #e0ddd8', borderRadius: '10px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', background: '#faf9f7' }}
              />
              <button onClick={generateMoodBoard} disabled={generating}
                style={{ padding: '10px 20px', background: generating ? '#ccc' : '#1D9E75', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: generating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                {generating
                  ? <><RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} /> Creating...</>
                  : <><Sparkles size={13} /> Generate</>}
              </button>
            </div>

            {moodBoard && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2C2C2A 100%)', borderRadius: '16px', padding: '24px', marginBottom: '16px', color: '#fff' }}>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#1D9E75', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                    {selected.name} · {room.label}
                  </p>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 12px', lineHeight: '1.25', letterSpacing: '-0.5px' }}>
                    {moodBoard.headline}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.7', margin: 0 }}>{moodBoard.overview}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Colour palette</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {moodBoard.palette.map((color, i) => (
                      <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ede9e3' }}>
                        <div style={{ height: '56px', background: color.hex }} />
                        <div style={{ padding: '8px 10px', background: '#fff' }}>
                          <p style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 2px' }}>{color.name}</p>
                          <p style={{ fontSize: '10px', color: '#aaa', margin: 0 }}>{color.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Room zones</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {moodBoard.zones.map((zone, i) => (
                      <div key={i} style={{ background: '#fff', border: '1px solid #ede9e3', borderRadius: '12px', padding: '14px' }}>
                        <p style={{ fontSize: '12px', fontWeight: '700', color: '#1D9E75', margin: '0 0 5px' }}>{zone.name}</p>
                        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.55', margin: 0 }}>{zone.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px', background: '#fff', border: '1px solid #ede9e3', borderRadius: '12px', padding: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Key pieces to buy</p>
                  {moodBoard.keyPieces.map((piece, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', borderBottom: i < moodBoard.keyPieces.length - 1 ? '1px solid #f5f3f0' : 'none' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '11px', fontWeight: '700', color: '#0F6E56' }}>{i + 1}</div>
                      <p style={{ fontSize: '13px', color: '#444', margin: 0, lineHeight: '1.5', paddingTop: '2px' }}>{piece}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#E1F5EE', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#0F6E56', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Designer tip</p>
                    <p style={{ fontSize: '13px', color: '#0F6E56', margin: 0, lineHeight: '1.6' }}>{moodBoard.designTip}</p>
                  </div>
                </div>

                <button onClick={() => { setMoodBoard(null); setCustomRequest(''); }}
                  style={{ fontSize: '12px', color: '#aaa', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  ↩ Generate a different mood board
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => selected && navigate(`/products/${roomId}/${selected.id}`)}
          disabled={!selected}
          style={{ width: '100%', padding: '15px', background: selected ? '#1D9E75' : '#e8e5e0', color: selected ? '#fff' : '#bbb', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: selected ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
          Shop the {selected?.name || 'selected'} theme <ArrowRight size={18} />
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
