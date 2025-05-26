import type { OrderItem } from '../types';

interface FloatingCartButtonProps {
  items: OrderItem[];
  onClick: () => void;
}

export function FloatingCartButton({ items, onClick }: FloatingCartButtonProps) {
  // Count total items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Only show if there are items in the cart
  if (itemCount === 0) {
    return null;
  }
  
  return (
    <div className="floating-cart" onClick={onClick}>
      🛒
      <span className="cart-badge">{itemCount}</span>
    </div>
  );
} 