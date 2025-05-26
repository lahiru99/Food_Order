import { useState } from 'react';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToOrder: (item: MenuItem, quantity: number) => void;
}

export function MenuItemCard({ item, onAddToOrder }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  const isSpecial = item.description?.toLowerCase().includes('special') || false;
  
  const handleIncrement = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 1, 0));
    
    // If changing from 1 to 0, notify parent to remove from order
    if (quantity === 1) {
      onAddToOrder(item, 0);
    }
  };
  
  // When quantity changes, update the order
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onAddToOrder(item, newQuantity);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className={`menu-item-card ${isSpecial ? 'special' : ''}`}>
      {item.imageUrl && !imageError && (
        <div className="menu-item-image">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            onError={handleImageError}
          />
        </div>
      )}
      
      {isSpecial && <div className="special-badge">⭐ Special</div>}
      
      <div className="menu-item-info">
        <h3>{item.name}</h3>
        <p className="price">{formatPrice(item.price)}</p>
        {item.description && (
          <p className="description">
            {item.description.replace(/\(Special dish\)/gi, '')}
          </p>
        )}
      </div>
      
      <div className="quantity-controls">
        <button 
          className="quantity-btn"
          onClick={handleDecrement}
          disabled={quantity === 0}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button 
          className="quantity-btn"
          onClick={handleIncrement}
          disabled={quantity === 10}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
} 