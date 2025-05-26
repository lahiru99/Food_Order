import { useState } from 'react';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface FeaturedDishesProps {
  specialItems: MenuItem[];
  onAddToOrder: (item: MenuItem, quantity: number) => void;
}

export function FeaturedDishes({ specialItems, onAddToOrder }: FeaturedDishesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % specialItems.length);
    setQuantity(1); // Reset quantity on slide change
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + specialItems.length) % specialItems.length);
    setQuantity(1); // Reset quantity on slide change
  };
  
  const currentItem = specialItems[currentSlide];
  
  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };
  
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };
  
  const handleAddToOrder = () => {
    onAddToOrder(currentItem, quantity);
  };
  
  if (specialItems.length === 0) {
    return null;
  }
  
  return (
    <div className="featured-dishes">
      <h2 className="featured-title">Today's Specials</h2>
      
      <div className="featured-carousel">
        {specialItems.length > 1 && (
          <button 
            className="carousel-btn prev" 
            onClick={prevSlide}
            aria-label="Previous dish"
          >
            ‹
          </button>
        )}
        
        <div className="featured-slide">
          <div className="slide-item">
            <div className="featured-image">
              {currentItem.imageUrl ? (
                <img src={currentItem.imageUrl} alt={currentItem.name} />
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            
            <div className="featured-info">
              <div className="featured-badge">Featured Special</div>
              <h3>{currentItem.name}</h3>
              <p className="featured-description">
                {currentItem.description?.replace(/\(Special dish\)/gi, '').trim()}
              </p>
              <p className="featured-price">{formatPrice(currentItem.price)}</p>
              
              <div className="quantity-controls">
                <button 
                  className="quantity-btn" 
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={handleIncrement}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                
                <button 
                  className="add-to-order-btn"
                  onClick={handleAddToOrder}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {specialItems.length > 1 && (
          <button 
            className="carousel-btn next" 
            onClick={nextSlide}
            aria-label="Next dish"
          >
            ›
          </button>
        )}
      </div>
      
      {specialItems.length > 1 && (
        <div className="carousel-dots">
          {specialItems.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => {
                setCurrentSlide(index);
                setQuantity(1);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 