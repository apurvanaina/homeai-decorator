export const ROOM_TYPES = [
  { id: "living-room", label: "Living Room", icon: "🛋️" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "kids-room", label: "Kids Room", icon: "🧸" },
  { id: "dining-room", label: "Dining Room", icon: "🍽️" },
  { id: "home-office", label: "Home Office", icon: "💻" },
];

export const THEMES = {
  "living-room": [
    { id: "modern-minimalist", name: "Modern Minimalist", desc: "Clean lines, neutral tones, uncluttered spaces", colors: ["#E8E6E0","#B5B0A6","#4A4540"], badge: "Trending" },
    { id: "boho-chic", name: "Boho Chic", desc: "Warm earthy tones, textures, plants", colors: ["#C4956A","#8B6349","#E8D5B7"] },
    { id: "japandi", name: "Japandi", desc: "Japanese-Scandinavian calm and warmth", colors: ["#D4C5B0","#8B7355","#2C2C2A"] },
    { id: "contemporary-indian", name: "Contemporary Indian", desc: "Vibrant accents, handcraft elements", colors: ["#D4460F","#F5A623","#1A1A2E"], badge: "Popular" },
    { id: "art-deco", name: "Art Deco", desc: "Geometric patterns, gold and black luxury", colors: ["#C9A84C","#1A1A1A","#F5F0E8"] },
    { id: "coastal", name: "Coastal Breeze", desc: "Blues, whites, natural fibers", colors: ["#4A90D9","#A8C5DA","#F5F5F0"] },
  ],
  "bedroom": [
    { id: "serene-sanctuary", name: "Serene Sanctuary", desc: "Soft neutrals, plush textures, calm", colors: ["#E8E0D5","#C4B5A0","#8B7355"] },
    { id: "maximalist-glam", name: "Maximalist Glam", desc: "Rich jewel tones, velvet, bold prints", colors: ["#6B3A7D","#C4A882","#1A0A2E"] },
    { id: "rustic-farmhouse", name: "Rustic Farmhouse", desc: "Wood textures, warm whites, woven", colors: ["#8B6349","#D4C5B0","#F5F0E8"] },
    { id: "japandi", name: "Japandi", desc: "Minimalist calm with natural warmth", colors: ["#D4C5B0","#8B7355","#2C2C2A"], badge: "Trending" },
    { id: "boho-dreams", name: "Boho Dreams", desc: "Macramé, plants, layered rugs", colors: ["#C4956A","#8B6349","#E8D5B7"], badge: "Popular" },
    { id: "mid-century", name: "Mid-Century Modern", desc: "Organic shapes, walnut, mustard tones", colors: ["#C8A94A","#8B5E3C","#2E4057"] },
  ],
  "kitchen": [
    { id: "scandinavian-kitchen", name: "Scandinavian Clean", desc: "White cabinets, wood counters, minimal", colors: ["#F5F5F0","#D4C5B0","#8B7355"] },
    { id: "industrial-kitchen", name: "Industrial Loft", desc: "Exposed brick, steel, matte black", colors: ["#2C2C2A","#888780","#C4956A"] },
    { id: "indian-traditional", name: "Indian Traditional", desc: "Brass, terracotta, warm spice tones", colors: ["#C4956A","#D4460F","#F5A623"], badge: "Popular" },
    { id: "modern-glossy", name: "Modern Glossy", desc: "Handle-less cabinets, quartz, LED strips", colors: ["#1A1A2E","#4A90D9","#F5F5F0"], badge: "Trending" },
    { id: "farmhouse-kitchen", name: "Farmhouse Warm", desc: "Shaker cabinets, open shelving, herbs", colors: ["#8B6349","#D4C5B0","#F5F0E8"] },
    { id: "mediterranean", name: "Mediterranean", desc: "Blue tiles, white walls, earthy pots", colors: ["#4A90D9","#F5F0E8","#C4956A"] },
  ],
  "kids-room": [
    { id: "adventure-land", name: "Adventure Land", desc: "Jungle greens, earthy neutrals, maps", colors: ["#4A8B3A","#8B6349","#F5E6C8"] },
    { id: "pastel-fantasy", name: "Pastel Fantasy", desc: "Soft pinks, mints, dreamy clouds", colors: ["#F4B8C5","#B8E4D4","#FFF0F5"], badge: "Popular" },
    { id: "space-explorer", name: "Space Explorer", desc: "Deep navy, stars, metallic accents", colors: ["#1A2744","#4A90D9","#C4A84C"] },
    { id: "montessori", name: "Montessori Natural", desc: "Wood, white, open-shelf learning", colors: ["#D4C5B0","#8B7355","#F5F0E8"], badge: "Trending" },
    { id: "tropical-jungle", name: "Tropical Jungle", desc: "Bright greens, animals, playful", colors: ["#2D8A3E","#F5C842","#FF6B35"] },
    { id: "nordic-play", name: "Nordic Play", desc: "Whites, pine, geometric shapes", colors: ["#F5F5F0","#D4C5B0","#2C2C2A"] },
  ],
  "dining-room": [
    { id: "formal-classic", name: "Formal Classic", desc: "Dark wood, upholstered chairs, chandelier", colors: ["#4A2C0A","#C4A882","#F5F0E8"] },
    { id: "modern-dining", name: "Modern Dining", desc: "Glass table, metal chairs, pendant lights", colors: ["#1A1A2E","#888780","#F5F5F0"], badge: "Trending" },
    { id: "indian-festive", name: "Indian Festive", desc: "Brass accents, rich fabrics, warm glow", colors: ["#C9A84C","#D4460F","#1A1A2E"], badge: "Popular" },
    { id: "rustic-dining", name: "Rustic Barn", desc: "Reclaimed wood, mason jars, greenery", colors: ["#8B6349","#D4C5B0","#4A8B3A"] },
    { id: "scandi-dining", name: "Scandinavian", desc: "Light oak, linen, candles", colors: ["#F5F5F0","#D4C5B0","#8B7355"] },
    { id: "maximalist-dining", name: "Maximalist", desc: "Bold wallpaper, mixed chairs, art", colors: ["#6B3A7D","#C4956A","#1A0A2E"] },
  ],
  "home-office": [
    { id: "executive-dark", name: "Executive Dark", desc: "Dark wood, leather, focused ambiance", colors: ["#2C2C2A","#8B6349","#C4A882"] },
    { id: "creative-studio", name: "Creative Studio", desc: "White walls, color pops, open shelving", colors: ["#F5F5F0","#4A90D9","#D4460F"] },
    { id: "zen-office", name: "Zen Productivity", desc: "Plants, natural light, calm neutrals", colors: ["#D4C5B0","#4A8B3A","#F5F0E8"], badge: "Trending" },
    { id: "industrial-office", name: "Industrial", desc: "Steel, exposed brick, vintage maps", colors: ["#2C2C2A","#888780","#C4956A"] },
    { id: "scandinavian-office", name: "Scandinavian", desc: "White, pine, minimal clutter", colors: ["#F5F5F0","#D4C5B0","#8B7355"], badge: "Popular" },
    { id: "eclectic-office", name: "Eclectic Mix", desc: "Personal mementos, bold art, mixed styles", colors: ["#6B3A7D","#C4956A","#4A90D9"] },
  ],
};