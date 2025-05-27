import { useState } from 'react';
import type { DeliveryMethod } from '../types';

interface CustomerFormProps {
  onSubmit: (
    customerName: string,
    deliveryMethod: DeliveryMethod,
    address?: string,
    phoneNumber?: string
  ) => void;
}

export function CustomerForm({ onSubmit }: CustomerFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    customerName: '',
    phoneNumber: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      customerName: '',
      phoneNumber: '',
      address: ''
    };
    
    // Validate name
    if (!customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    // Validate phone
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    // Validate address if delivery is selected
    if (deliveryMethod === 'delivery' && !address.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    
    // Check if there are any errors
    if (newErrors.customerName || newErrors.phoneNumber || newErrors.address) {
      setErrors(newErrors);
      return;
    }
    
    // Submit the form
    onSubmit(customerName, deliveryMethod, address, phoneNumber);
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h3>Quick Checkout</h3>
      <p className="form-subtitle">No account needed - just a few details to complete your order</p>
      
      <div className="form-group">
        <label htmlFor="customer-name">Your Name</label>
        <input
          type="text"
          id="customer-name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={errors.customerName ? 'error' : ''}
          placeholder="Enter your full name"
        />
        {errors.customerName && <div className="error-message">{errors.customerName}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone-number">Phone Number</label>
        <input
          type="tel"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={errors.phoneNumber ? 'error' : ''}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
      </div>
      
      <div className="form-group">
        <label>Delivery Method</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="delivery-method"
              checked={deliveryMethod === 'pickup'}
              onChange={() => setDeliveryMethod('pickup')}
            />
            Pickup
          </label>
          <label>
            <input
              type="radio"
              name="delivery-method"
              checked={deliveryMethod === 'delivery'}
              onChange={() => setDeliveryMethod('delivery')}
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
            placeholder="Enter your full address for delivery"
            rows={3}
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
      )}
      
      <div className="checkout-summary">
        <p>Ready to place your order?</p>
        <p className="checkout-note">You'll receive a confirmation with your order details</p>
      </div>
      
      <button type="submit" className="submit-btn">
        Complete Order
      </button>
    </form>
  );
} 