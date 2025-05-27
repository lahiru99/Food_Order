import React, { useState } from 'react';
import type { OrderItem } from '../types';
import { formatPrice } from '../utils/whatsapp';
import '../styles/OrderSummary.css';

interface OrderSummaryProps {
  items: OrderItem[];
  total: number;
  onCheckout: () => void;
  isDeadlinePassed?: boolean;
  onRemoveItem?: (itemId: string) => void;
}

export function OrderSummary({ 
  items, 
  total, 
  onCheckout,
  isDeadlinePassed = false,
  onRemoveItem
}: OrderSummaryProps) {
  const hasItems = items.length > 0;
  const filteredItems = items.filter(item => item.quantity > 0);
  
  // Track which package items are expanded
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  
  // Toggle package expansion
  const togglePackageExpand = (packageId: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  };
  
  // Check if an item is a package
  const isPackageItem = (item: OrderItem) => {
    return item.id.startsWith('package-') || item.category === 'package';
  };
  
  // Extract dish names from package description
  const getPackageDishes = (description?: string): string[] => {
    if (!description) return [];
    
    // Extract the dish names from the description
    const match = description.match(/Package includes: (.*?)(?:\. Also includes|$)/);
    if (!match || !match[1]) return [];
    
    // Split the dishes and clean them up
    return match[1].split(', ').map(dish => dish.replace(/^and /, '').trim()).filter(Boolean);
  };

  return (
    <div className="order-summary">
      <h2>Your Order</h2>
      
      {hasItems && filteredItems.length > 0 ? (
        <>
          <ul className="order-items">
            {filteredItems.map((item, index) => {
              const isPackage = isPackageItem(item);
              const packageDishes = isPackage ? getPackageDishes(item.description) : [];
              const isExpanded = expandedPackages[item.id] || false;
              
              return (
                <li key={index} className={`order-item ${isPackage ? 'package-item' : ''}`}>
                  <div className="item-details">
                    <span className="item-quantity">{item.quantity} ×</span>
                    <div className="item-name-container">
                      <span className="item-name">{item.name}</span>
                      
                      {isPackage && packageDishes.length > 0 && (
                        <button 
                          className="toggle-package-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePackageExpand(item.id);
                          }}
                          title={isExpanded ? "Hide dishes" : "Show dishes"}
                        >
                          {isExpanded ? '▼' : '►'}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <span className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    {onRemoveItem && (
                      <button 
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                        aria-label={`Remove ${item.name} from order`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {/* Package dishes subsection */}
                  {isPackage && isExpanded && packageDishes.length > 0 && (
                    <div className="package-dishes">
                      <ul>
                        {packageDishes.map((dish, dishIndex) => (
                          <li key={dishIndex} className="package-dish-item">
                            <span className="package-dish-bullet">•</span>
                            <span className="package-dish-name">{dish}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          
          <div className="order-total">
            <span>Total:</span>
            <span className="total-price">{formatPrice(total)}</span>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={onCheckout}
            disabled={isDeadlinePassed}
          >
            {isDeadlinePassed 
              ? 'Order deadline passed' 
              : 'Proceed to Checkout'
            }
          </button>
        </>
      ) : (
        <div className="empty">
          Your order is empty. Add items from the menu to get started.
        </div>
      )}
    </div>
  );
} 