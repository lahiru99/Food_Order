import { useState } from 'react';
import type { DeliveryMethod } from '../types';

interface CustomerFormProps {
  onSubmit: (
    customerName: string,
    deliveryMethod: DeliveryMethod,
    address?: string
  ) => void;
}

export function CustomerForm({ onSubmit }: CustomerFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (deliveryMethod === 'delivery' && !address.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit(
        customerName,
        deliveryMethod,
        deliveryMethod === 'delivery' ? address : undefined
      );
    } catch (error) {
      console.error('Error submitting order:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h2>Delivery Information</h2>
      
      <div className="form-group">
        <label htmlFor="customerName">Your Name</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={errors.customerName ? 'error' : ''}
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        {errors.customerName && (
          <div className="error-message">{errors.customerName}</div>
        )}
      </div>
      
      <div className="form-group">
        <label>Delivery Method</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="deliveryMethod"
              value="pickup"
              checked={deliveryMethod === 'pickup'}
              onChange={() => setDeliveryMethod('pickup')}
              disabled={isSubmitting}
            />
            Pickup
          </label>
          
          <label>
            <input
              type="radio"
              name="deliveryMethod"
              value="delivery"
              checked={deliveryMethod === 'delivery'}
              onChange={() => setDeliveryMethod('delivery')}
              disabled={isSubmitting}
            />
            Delivery
          </label>
        </div>
      </div>
      
      {deliveryMethod === 'delivery' && (
        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={errors.address ? 'error' : ''}
            placeholder="Enter your full address including street, city, state, and zip code"
            rows={3}
            disabled={isSubmitting}
          />
          {errors.address && (
            <div className="error-message">{errors.address}</div>
          )}
        </div>
      )}
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
} 