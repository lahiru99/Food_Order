import React, { useState, useEffect, useMemo } from 'react';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface MenuListViewProps {
  items: MenuItem[];
  onAddToOrder: (item: MenuItem, quantity: number) => void;
  showLocalLanguage?: boolean;
  selectedPackage?: string | null;
}

// Define package structure
interface PackageRequirements {
  nonVegCount: number;
  vegCount: number;
  includeSides: boolean;
  price: number;
  name: string;
}

const PACKAGES: Record<string, PackageRequirements> = {
  standard: {
    nonVegCount: 1,
    vegCount: 3,
    includeSides: true,
    price: 50,
    name: 'Standard Package (1 Non-Veg, 3 Veg, Sides)'
  },
  premium: {
    nonVegCount: 2,
    vegCount: 2,
    includeSides: true,
    price: 55,
    name: 'Premium Package (2 Non-Veg, 2 Veg, Sides)'
  }
};

export function MenuListView({
  items, 
  onAddToOrder, 
  showLocalLanguage = true,
  selectedPackage
}: MenuListViewProps) {
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
  
  // State for package selection
  const [packageSelections, setPackageSelections] = useState<{
    nonVeg: string[];
    veg: string[];
  }>({
    nonVeg: [],
    veg: []
  });
  
  // Reset selections when the selected package changes
  useEffect(() => {
    if (selectedPackage) {
      setPackageSelections({
        nonVeg: [],
        veg: []
      });
    }
  }, [selectedPackage]);
  
  const handleIncrement = (itemId: string) => {
    setQuantities(prev => {
      const newValue = Math.min((prev[itemId] || 0) + 1, 10);
      const item = items.find(i => i.id === itemId);
      if (item) onAddToOrder(item, newValue);
      return { ...prev, [itemId]: newValue };
    });
  };
  
  const handleDecrement = (itemId: string) => {
    setQuantities(prev => {
      const newValue = Math.max((prev[itemId] || 0) - 1, 0);
      const item = items.find(i => i.id === itemId);
      if (item) onAddToOrder(item, newValue);
      return { ...prev, [itemId]: newValue };
    });
  };
  
  const toggleDishSelection = (itemId: string, category: 'non-veg' | 'veg') => {
    if (!selectedPackage) return;
    
    const packageReqs = PACKAGES[selectedPackage];
    const selectionKey = category === 'non-veg' ? 'nonVeg' : 'veg';
    const maxItems = category === 'non-veg' ? packageReqs.nonVegCount : packageReqs.vegCount;
    
    setPackageSelections(prev => {
      // Check if the item is already selected
      const isSelected = prev[selectionKey].includes(itemId);
      
      if (isSelected) {
        // If already selected, remove it
        return {
          ...prev,
          [selectionKey]: prev[selectionKey].filter(id => id !== itemId)
        };
      } else {
        // If not selected and we haven't reached the limit, add it
        if (prev[selectionKey].length < maxItems) {
          return {
            ...prev,
            [selectionKey]: [...prev[selectionKey], itemId]
          };
        }
        // If already at the limit, replace the first selected item
        const newSelection = [...prev[selectionKey]];
        newSelection.shift(); // Remove the first item
        newSelection.push(itemId); // Add the new item
        return {
          ...prev,
          [selectionKey]: newSelection
        };
      }
    });
  };
  
  const isItemSelected = (itemId: string, category: 'non-veg' | 'veg') => {
    const selectionKey = category === 'non-veg' ? 'nonVeg' : 'veg';
    return packageSelections[selectionKey].includes(itemId);
  };
  
  const isPackageComplete = () => {
    if (!selectedPackage) return false;
    
    const packageReqs = PACKAGES[selectedPackage];
    return (
      packageSelections.nonVeg.length === packageReqs.nonVegCount && 
      packageSelections.veg.length === packageReqs.vegCount
    );
  };
  
  const confirmPackage = () => {
    if (!selectedPackage || !isPackageComplete()) return;
    
    const packageReqs = PACKAGES[selectedPackage];
    
    // Get the selected items
    const selectedNonVegItems = packageSelections.nonVeg.map(id => 
      items.find(item => item.id === id)
    ).filter(Boolean) as MenuItem[];
    
    const selectedVegItems = packageSelections.veg.map(id => 
      items.find(item => item.id === id)
    ).filter(Boolean) as MenuItem[];
    
    // Create a combined package item
    const packageItem: MenuItem = {
      id: `package-${selectedPackage}-${Date.now()}`,
      name: packageReqs.name,
      price: packageReqs.price,
      description: `Package includes: ${selectedNonVegItems.map(i => i.name).join(', ')} and ${selectedVegItems.map(i => i.name).join(', ')}. Also includes coconut sambal, papadam, and 700ml container.`,
      category: 'package'
    };
    
    // Add the package to the order
    onAddToOrder(packageItem, 1);
    
    // Reset selections
    setPackageSelections({
      nonVeg: [],
      veg: []
    });
  };
  
  // Function to get category display name with emojis
  const getCategoryDisplay = (category: string): { title: string, emojis: string } => {
    switch (category) {
      case 'non-veg':
        return {
          title: 'Non-Vegetarian Dishes',
          emojis: '🍗🥩 මස් සහ මාලු වර්ග 🐟🦐'
        };
      case 'veg':
        return {
          title: 'Vegetarian Dishes',
          emojis: '🥒🥕 එළවළු වර්ග 🥦🍅'
        };
      case 'extras':
        return {
          title: 'Extras & Desserts',
          emojis: '🍲 අමතර 🍨'
        };
      default:
        return {
          title: 'Other Items',
          emojis: '🍽️ වෙනත් 🍽️'
        };
    }
  };
  
  // Define the order of categories to display
  const categoryOrder = ['non-veg', 'veg', 'extras', 'other'];
  
  // Decide what to render based on whether a package is selected
  if (selectedPackage) {
    const packageReqs = PACKAGES[selectedPackage];
    
    return (
      <div className="package-selection-container">
        <div className="package-selection-header">
          <h2 className="package-title">{packageReqs.name}</h2>
          <p className="package-instructions">Select your favorite dishes for this package</p>
        </div>
        
        {/* Non-veg section */}
        <div className="package-section">
          <h3 className="section-heading">
            Select {packageReqs.nonVegCount} Non-Vegetarian {packageReqs.nonVegCount > 1 ? 'Dishes' : 'Dish'}
            <span className="selection-count">
              ({packageSelections.nonVeg.length}/{packageReqs.nonVegCount})
            </span>
          </h3>
          
          <div className="dish-selection-grid">
            {groupedItems['non-veg']?.map(item => (
              <div 
                key={item.id}
                className={`dish-card ${isItemSelected(item.id, 'non-veg') ? 'selected' : ''}`}
                onClick={() => toggleDishSelection(item.id, 'non-veg')}
              >
                <div className="dish-content">
                  {showLocalLanguage && item.nameLocalLang && (
                    <>
                      <div className="dish-local-name">{item.nameLocalLang}</div>
                      <div className="language-divider"></div>
                    </>
                  )}
                  <div className="dish-name">{item.name}</div>
                  {isItemSelected(item.id, 'non-veg') && (
                    <div className="selected-indicator">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Veg section */}
        <div className="package-section">
          <h3 className="section-heading">
            Select {packageReqs.vegCount} Vegetarian {packageReqs.vegCount > 1 ? 'Dishes' : 'Dish'}
            <span className="selection-count">
              ({packageSelections.veg.length}/{packageReqs.vegCount})
            </span>
          </h3>
          
          <div className="dish-selection-grid">
            {groupedItems['veg']?.map(item => (
              <div 
                key={item.id}
                className={`dish-card ${isItemSelected(item.id, 'veg') ? 'selected' : ''}`}
                onClick={() => toggleDishSelection(item.id, 'veg')}
              >
                <div className="dish-content">
                  {showLocalLanguage && item.nameLocalLang && (
                    <>
                      <div className="dish-local-name">{item.nameLocalLang}</div>
                      <div className="language-divider"></div>
                    </>
                  )}
                  <div className="dish-name">{item.name}</div>
                  {isItemSelected(item.id, 'veg') && (
                    <div className="selected-indicator">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Extras section */}
        <div className="package-section">
          <h3 className="section-heading">
            Optional Extras
            <span className="extra-note">(Additional charges apply)</span>
          </h3>
          
          <div className="extras-grid">
            {groupedItems['extras']?.map(item => (
              <div 
                key={item.id}
                className="extra-card"
              >
                <div className="extra-content">
                  {showLocalLanguage && item.nameLocalLang && (
                    <div className="extra-local-name">{item.nameLocalLang}</div>
                  )}
                  <div className="extra-name">{item.name}</div>
                  <div className="extra-price">{formatPrice(item.price)}</div>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrement(item.id)}
                    disabled={quantities[item.id] === 0}
                  >
                    -
                  </button>
                  <span className="quantity">{quantities[item.id]}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrement(item.id)}
                    disabled={quantities[item.id] === 10}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="package-actions">
          <p className="included-note">
            Your package already includes coconut sambal, papadam, and a 700ml container.
          </p>
          
          <button 
            className="confirm-package-btn"
            disabled={!isPackageComplete()}
            onClick={confirmPackage}
          >
            Add Package to Order ({formatPrice(packageReqs.price)})
          </button>
        </div>
      </div>
    );
  }
  
  // If no package is selected, show the regular menu view
  return (
    <div className="menu-list-view">
      {categoryOrder.map((category, categoryIndex) => {
        if (!groupedItems[category] || groupedItems[category].length === 0) return null;
        
        const { title, emojis } = getCategoryDisplay(category);
        
        return (
          <div key={category} className="menu-category">
            <h3 className="category-title">
              <div className="category-emojis">{emojis}</div>
              <div className="category-name">{title}</div>
            </h3>
            
            <div className="menu-list">
              {groupedItems[category].map((item, index) => (
                <div key={item.id} className="menu-list-item">
                  <div className="item-info">
                    <div className="item-number">{index + 1}.</div>
                    <div className="item-name">
                      {showLocalLanguage && item.nameLocalLang && (
                        <>
                          <div className="local-name">{item.nameLocalLang}</div>
                          <div className="language-divider"></div>
                        </>
                      )}
                      <div className="primary-name">{item.name}</div>
                    </div>
                  </div>
                  
                  <div className="item-price">{formatPrice(item.price)}</div>
                  
                  <div className="item-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(item.id)}
                      disabled={quantities[item.id] === 0}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="quantity">{quantities[item.id]}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(item.id)}
                      disabled={quantities[item.id] === 10}
                      aria-label="Increase quantity"
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
      
      {/* Delivery Information */}
      <div className="delivery-info">
        <h3>Delivery Information</h3>
        <p>Free home delivery for all orders within 10km of Dandenong North on Saturday 22nd, March between 2-7 pm.</p>
        <p>Please place your order before 6pm on Thursday 20th of March.</p>
      </div>
    </div>
  );
} 