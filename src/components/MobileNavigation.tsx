import { Link, useLocation } from 'react-router-dom';

export function MobileNavigation() {
  const location = useLocation();
  
  return (
    <nav className="mobile-nav">
      <Link to="/" className={`mobile-nav-btn ${location.pathname === '/' ? 'active' : ''}`}>
        <span className="mobile-nav-icon">🍽️</span>
        <span>Menu</span>
      </Link>
      
      <Link to="/admin" className={`mobile-nav-btn ${location.pathname === '/admin' ? 'active' : ''}`}>
        <span className="mobile-nav-icon">⚙️</span>
        <span>Admin</span>
      </Link>
    </nav>
  );
} 