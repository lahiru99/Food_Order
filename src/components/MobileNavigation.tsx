import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MobileNavigationProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function MobileNavigation({ cartItemCount, onCartClick }: MobileNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="mobile-nav">
      <button 
        className={`mobile-nav-btn ${isActive('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <span className="mobile-nav-icon">🏠</span>
        <span>Menu</span>
      </button>
      
      <button 
        className="mobile-nav-btn"
        onClick={onCartClick}
      >
        <span className="mobile-nav-icon">
          🛒
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </span>
        <span>Cart ({cartItemCount})</span>
      </button>
    </nav>
  );
} 