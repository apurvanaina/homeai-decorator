import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import RoomPage from './pages/RoomPage';
import ThemesPage from './pages/ThemesPage';
import ProductsPage from './pages/ProductsPage';
import WishlistPage from './pages/WishlistPage';
import './styles/global.css';

export default function App() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (product) => {
    setWishlist(prev => prev.filter(p => p.id !== product.id));
  };

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<RoomPage wishlistCount={wishlist.length} />} />
        <Route path="/themes/:roomId" element={<ThemesPage wishlistCount={wishlist.length} />} />
        <Route path="/products/:roomId/:themeId" element={<ProductsPage wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} onRemove={removeFromWishlist} />} />
      </Routes>
    </BrowserRouter>
  );
}