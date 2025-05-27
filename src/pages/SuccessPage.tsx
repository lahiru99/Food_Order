import { useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/whatsapp';
import type { OrderItem } from '../types';
import '../styles/SuccessPage.css';

interface LocationState {
  orderId: string;
  customerName: string;
  total: number;
  deliveryMethod: 'pickup' | 'delivery';
  items: OrderItem[];
}

export function SuccessPage() {
  const location = useLocation();
  const { orderId, customerName, total, deliveryMethod, items } = 
    (location.state as LocationState) || { 
      orderId: 'Unknown', 
      customerName: 'Customer', 
      total: 0,
      deliveryMethod: 'pickup',
      items: []
    };
  
  return (
    <div className="success-page">
      <div className="success-content">
        <h1>Thank You for Your Order!</h1>
        <p>Dear <strong>{customerName}</strong>, your order has been successfully placed.</p>
        <div className="order-details">
          <div className="order-info">
            <p>Order #: <strong>{orderId}</strong></p>
            <p>Delivery Method: <strong>{deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}</strong></p>
            <p>Total: <strong>{formatPrice(total)}</strong></p>
          </div>
          
          <div className="order-items-summary">
            <h3>Order Summary</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.quantity} × {item.name}
                  <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="order-total-line">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        
        <div className="next-steps">
          <p>We'll contact you shortly to confirm your order details.</p>
          <p>For any questions, please contact us at <strong>(03) 9800-1234</strong></p>
        </div>
        
        <Link to="/" className="back-btn">Return to Menu</Link>
      </div>
    </div>
  );
} 