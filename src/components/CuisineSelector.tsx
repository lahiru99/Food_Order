import React from 'react';

interface CuisineSelectorProps {
  onSelectCuisine: (cuisine: string) => void;
  selectedCuisine: string | null;
}

export function CuisineSelector({
  onSelectCuisine,
  selectedCuisine,
}: CuisineSelectorProps) {
  const cuisines = [
    {
      id: 'sri-lankan',
      name: 'Sri Lankan',
      description: 'Authentic curries, rice & roti',
      emoji: '🍛',
      color: '#FF6B35',
    },
    {
      id: 'japanese',
      name: 'Japanese',
      description: 'Sushi, ramen & bento boxes',
      emoji: '🍱',
      color: '#E74C3C',
    },
    {
      id: 'chinese',
      name: 'Chinese',
      description: 'Dim sum, noodles & stir-fry',
      emoji: '🥟',
      color: '#F39C12',
    },
    {
      id: 'mexican',
      name: 'Mexican',
      description: 'Tacos, burritos & enchiladas',
      emoji: '🌮',
      color: '#27AE60',
    },
    {
      id: 'italian',
      name: 'Italian',
      description: 'Pizza, pasta & risotto',
      emoji: '🍝',
      color: '#8E44AD',
    },
    {
      id: 'indian',
      name: 'Indian',
      description: 'Curries, naan & biryani',
      emoji: '🍛',
      color: '#E67E22',
    },
  ];

  return (
    <div className="cuisine-selector">
      <h2 className="cuisine-title">Choose Your Cuisine</h2>
      <p className="cuisine-subtitle">
        Select a cuisine type to explore our menu
      </p>

      <div className="cuisine-grid">
        {cuisines.map((cuisine) => (
          <div
            key={cuisine.id}
            className={`cuisine-card ${
              selectedCuisine === cuisine.id ? 'selected' : ''
            }`}
            onClick={() => onSelectCuisine(cuisine.id)}
            style={{ '--cuisine-color': cuisine.color } as React.CSSProperties}
          >
            <div className="cuisine-emoji">{cuisine.emoji}</div>
            <h3 className="cuisine-name">{cuisine.name}</h3>
            <p className="cuisine-description">{cuisine.description}</p>
          </div>
        ))}
      </div>

      {selectedCuisine && (
        <button
          className="change-cuisine-btn"
          onClick={() => onSelectCuisine('')}
        >
          ← Choose Different Cuisine
        </button>
      )}
    </div>
  );
}
