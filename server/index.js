require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const ANTHROPIC_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/analyse', async (req, res) => {
  try {
    const { base64Image, roomLabel } = req.body;
    const messages = base64Image
      ? [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Image } },
          { type: 'text', text: `You are an expert interior designer. Analyse this ${roomLabel} photo and in 2 sentences describe the space and recommend which themes would suit it best from: Modern Minimalist, Boho Chic, Japandi, Contemporary Indian, Art Deco, Coastal Breeze. Keep it friendly for an Indian homeowner.` }
        ]}]
      : [{ role: 'user', content: `Suggest the best decoration themes for a ${roomLabel} in an Indian home.` }];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: 'claude-opus-4-5', max_tokens: 400, messages })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/moodboard', async (req, res) => {
  try {
    const { base64Image, roomLabel, themeName, customRequest } = req.body;
    const prompt = `You are an expert interior designer creating a detailed mood board for a ${roomLabel} redesigned in ${themeName} style.
${customRequest ? `The client specifically requests: "${customRequest}"` : ''}
Respond ONLY with valid JSON, no other text:
{
  "headline": "inspiring 6-8 word headline",
  "overview": "2-3 sentence description of the overall look",
  "palette": [
    { "name": "color name", "hex": "#hexcode", "usage": "where used" },
    { "name": "color name", "hex": "#hexcode", "usage": "where used" },
    { "name": "color name", "hex": "#hexcode", "usage": "where used" },
    { "name": "color name", "hex": "#hexcode", "usage": "where used" }
  ],
  "zones": [
    { "name": "Seating", "description": "specific description" },
    { "name": "Lighting", "description": "specific description" },
    { "name": "Walls & Floors", "description": "specific description" },
    { "name": "Accents", "description": "specific description" }
  ],
  "keyPieces": ["item 1", "item 2", "item 3", "item 4", "item 5"],
  "designTip": "one actionable tip for Indian homes"
}`;

    const messages = base64Image
      ? [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Image } },
          { type: 'text', text: `Looking at this ${roomLabel}, ` + prompt }
        ]}]
      : [{ role: 'user', content: prompt }];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: 'claude-opus-4-5', max_tokens: 1000, messages })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`HomeAI server running on port ${PORT}`));