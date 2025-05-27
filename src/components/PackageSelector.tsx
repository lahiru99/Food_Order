import React from 'react';

interface PackageSelectorProps {
  onSelectPackage: (packageName: string) => void;
  selectedPackage: string | null;
}

export function PackageSelector({ onSelectPackage, selectedPackage }: PackageSelectorProps) {
  const packages = [
    {
      id: 'standard',
      name: 'Standard Package',
      nameSinhala: 'සම්මත පැකේජය',
      price: 50,
      description: '1 Non-veg dish + 3 veg dishes',
      descriptionSinhala: 'මාංශ නොවන 1ක් + එළවළු 3ක්',
      dishes: '1 meat curry + 3 vegetable dishes'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      nameSinhala: 'ප්‍රීමියම් පැකේජය',
      price: 55,
      description: '2 Non-veg dishes + 2 veg dishes',
      descriptionSinhala: 'මාංශ නොවන 2ක් + එළවළු 2ක්',
      dishes: '2 meat curries + 2 vegetable dishes'
    }
  ];

  const scrollToMenu = () => {
    const menuCategory = document.querySelector('.menu-category');
    if (menuCategory) {
      const topPosition = (menuCategory as HTMLElement).offsetTop;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="package-selection-section">
      <h3 className="section-title">Select a Package or Order Individual Items</h3>
      <p className="section-description">Choose one of our convenient packages or scroll down to build your own meal</p>
      
      <div className="package-cards">
        {packages.map(pkg => (
          <div 
            key={pkg.id}
            className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''}`}
            onClick={() => onSelectPackage(pkg.id)}
          >
            <div className="package-header">
              <div>
                <h4 className="package-name">{pkg.name}</h4>
                <div className="local-name">{pkg.nameSinhala}</div>
              </div>
              <div className="package-price">${pkg.price}</div>
            </div>
            
            <div className="package-content">
              <div className="package-description">
                {pkg.description}
                <div className="language-divider"></div>
                <strong>{pkg.descriptionSinhala}</strong>
              </div>
              
              <ul className="package-details">
                <li>
                  <span className="detail-icon">✓</span>
                  <span className="detail-text">Rice included</span>
                </li>
                <li>
                  <span className="detail-icon">✓</span>
                  <span className="detail-text">Poppadoms included</span>
                </li>
              </ul>
            </div>
            
            <button className="package-select-btn">
              {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
            </button>
          </div>
        ))}
      </div>
      
      {selectedPackage && (
        <button 
          className="reset-package-btn"
          onClick={() => onSelectPackage('')}
        >
          Reset Package Selection
        </button>
      )}
      
      {!selectedPackage && (
        <div className="individual-items-option">
          <button 
            className="individual-items-btn"
            onClick={scrollToMenu}
          >
            Or build your own meal
          </button>
        </div>
      )}
    </div>
  );
} 