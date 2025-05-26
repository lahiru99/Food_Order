import type { OrderItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface OrderSummaryProps {
  items: OrderItem[];
}

export function OrderSummary({ items }: OrderSummaryProps) {
  // Filter out items with quantity 0
  const itemsToOrder = items.filter(item => item.quantity > 0);
  
  // Calculate total price
  const totalPrice = itemsToOrder.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
  
  return (
    <div className="order-summary">
      <h2>Your Order</h2>
      
      {itemsToOrder.length === 0 ? (
        <p className="empty">Your order is empty</p>
      ) : (
        <>
          <ul className="order-items">
            {itemsToOrder.map(item => (
              <li key={item.id} className="order-item">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="order-total">
            <span>Total:</span>
            <span className="total-price">{formatPrice(totalPrice)}</span>
          </div>
        </>
      )}
    </div>
  );
} 