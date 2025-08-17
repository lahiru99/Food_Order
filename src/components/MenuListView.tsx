import { useState } from 'react';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface MenuListViewProps {
  items: MenuItem[];
  onAddToOrder: (item: MenuItem, quantity: number) => void;
}

export function MenuListView({ items, onAddToOrder }: MenuListViewProps) {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Create a state object to track quantity for each item
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleIncrement = (itemId: string) => {
    setQuantities((prev) => {
      const newValue = Math.min((prev[itemId] || 0) + 1, 10);
      const item = items.find((i) => i.id === itemId);
      if (item) onAddToOrder(item, newValue);
      return { ...prev, [itemId]: newValue };
    });
  };

  const handleDecrement = (itemId: string) => {
    setQuantities((prev) => {
      const newValue = Math.max((prev[itemId] || 0) - 1, 0);
      const item = items.find((i) => i.id === itemId);
      if (item) onAddToOrder(item, newValue);
      return { ...prev, [itemId]: newValue };
    });
  };

  // Function to get category display name with emojis
  const getCategoryDisplay = (
    category: string
  ): { title: string; emojis: string } => {
    switch (category) {
      case 'non-veg':
        return {
          title: 'Non-Vegetarian Dishes',
          emojis: '🍗🥩 🐟🦐',
        };
      case 'veg':
        return {
          title: 'Vegetarian Dishes',
          emojis: '🥒🥕 🥦🍅',
        };
      case 'extras':
        return {
          title: 'Extras & Desserts',
          emojis: '🍲 🍨',
        };
      default:
        return {
          title: 'Other Items',
          emojis: '🍽️ 🍽️',
        };
    }
  };

  // Define the order of categories to display
  const categoryOrder = ['non-veg', 'veg', 'extras', 'other'];

  return (
    <div className="menu-list-view">
      {categoryOrder.map((category) => {
        const categoryItems = groupedItems[category];
        if (!categoryItems || categoryItems.length === 0) return null;

        const { title, emojis } = getCategoryDisplay(category);

        return (
          <div key={category} className="menu-category">
            <div className="category-header">
              <div className="category-emoji">{emojis}</div>
              <h3 className="category-title">{title}</h3>
            </div>

            <div className="menu-items">
              {categoryItems.map((item) => (
                <div key={item.id} className="menu-list-item">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{formatPrice(item.price)}</div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn minus"
                      onClick={() => handleDecrement(item.id)}
                      disabled={quantities[item.id] === 0}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {quantities[item.id] || 0}
                    </span>
                    <button
                      className="quantity-btn plus"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
