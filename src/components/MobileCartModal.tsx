import React from 'react';
import type { OrderItem } from '../types';
import { formatPrice } from '../utils/whatsapp';
import '../styles/MobileCartModal.css';

interface MobileCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  total: number;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function MobileCartModal({ 
  isOpen, 
  onClose, 
  orderItems, 
  total, 
  onRemoveItem, 
  onCheckout 
}: MobileCartModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-cart-overlay" onClick={onClose} />
      <div className="mobile-cart-modal">
        <div className="mobile-cart-header">
          <h2>Your Order ({orderItems.length} {orderItems.length === 1 ? 'item' : 'items'})</h2>
          <button className="close-cart-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="mobile-cart-content">
          {orderItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <p className="empty-cart-subtitle">Add some delicious items to get started!</p>
            </div>
          ) : (
            <>
              <div className="mobile-cart-items">
                {orderItems.map((item) => (
                  <div key={item.id} className="mobile-cart-item">
                    <div className="item-info">
                      <div className="item-quantity-badge">{item.quantity}</div>
                      <div className="item-details">
                        <div className="item-name-section">
                          {item.nameLocalLang && (
                            <div className="item-local-name">{item.nameLocalLang}</div>
                          )}
                          <div className="item-name">{item.name}</div>
                        </div>
                        <div className="item-price-section">
                          <div className="unit-price">{formatPrice(item.price)} each</div>
                          <div className="total-price">{formatPrice(item.price * item.quantity)}</div>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="remove-item-btn"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mobile-cart-footer">
                <div className="cart-total">
                  <span>Total: {formatPrice(total)}</span>
                </div>
                <button 
                  className="mobile-checkout-btn"
                  onClick={() => {
                    onCheckout();
                    onClose();
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
} 