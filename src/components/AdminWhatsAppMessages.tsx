import React, { useState, useEffect } from 'react';
import type { Order } from '../types';
import '../styles/AdminWhatsApp.css';

interface AdminWhatsAppMessagesProps {
  order: Order;
  onClose: () => void;
}

// Pre-defined message templates
const MESSAGE_TEMPLATES = [
  {
    id: 'order-confirmed',
    title: 'Order Confirmation',
    template: (order: Order) => 
      `Hello ${order.customerName},\n\n` +
      `Thank you for your order #${order.id}.\n` +
      `We've received your order and will prepare it for ${order.deliveryMethod === 'delivery' ? 'delivery' : 'pickup'}.\n\n` +
      `Your order total is ${formatPrice(order.total)}.\n\n` +
      `If you have any questions, please let us know!`
  },
  {
    id: 'order-ready',
    title: 'Order Ready for Pickup',
    template: (order: Order) => 
      `Hello ${order.customerName},\n\n` +
      `Great news! Your order #${order.id} is ready for pickup.\n` +
      `You can collect it from our restaurant at your convenience.\n\n` +
      `Thank you for your order!`
  },
  {
    id: 'delivery-on-way',
    title: 'Delivery On Way',
    template: (order: Order) => 
      `Hello ${order.customerName},\n\n` +
      `Your order #${order.id} is on its way to your location!\n` +
      `Estimated delivery time: within 30 minutes.\n\n` +
      `Thank you for choosing our service!`
  },
  {
    id: 'custom',
    title: 'Custom Message',
    template: () => ''
  }
];

// Format price to currency format
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function AdminWhatsAppMessages({ order, onClose }: AdminWhatsAppMessagesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(MESSAGE_TEMPLATES[0].id);
  const [customMessage, setCustomMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Update the useEffect to set phone number if available
  useEffect(() => {
    if ('phoneNumber' in order) {
      setPhoneNumber(order.phoneNumber as string);
    }
  }, [order]);
  
  // Get the selected template
  const template = MESSAGE_TEMPLATES.find(t => t.id === selectedTemplate) || MESSAGE_TEMPLATES[0];
  
  // Get the message based on the template
  const getMessage = (): string => {
    if (selectedTemplate === 'custom') {
      return customMessage;
    }
    return template.template(order);
  };
  
  // Generate WhatsApp URL
  const generateWhatsAppUrl = (message: string, phone: string): string => {
    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Generate the URL
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };
  
  // Handle sending the message
  const handleSendMessage = () => {
    const message = getMessage();
    
    if (!phoneNumber) {
      alert('Please enter a valid phone number');
      return;
    }
    
    if (!message) {
      alert('Please enter a message');
      return;
    }
    
    // Open WhatsApp with the message
    window.open(generateWhatsAppUrl(message, phoneNumber), '_blank');
    
    // Close the modal
    onClose();
  };

  return (
    <div className="whatsapp-message-modal">
      <div className="modal-header">
        <h3>Send WhatsApp Message</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="phone-number">Customer Phone Number</label>
          <input
            id="phone-number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter customer phone number"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message-template">Message Template</label>
          <select
            id="message-template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            {MESSAGE_TEMPLATES.map(template => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
        </div>
        
        {selectedTemplate === 'custom' ? (
          <div className="form-group">
            <label htmlFor="custom-message">Custom Message</label>
            <textarea
              id="custom-message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter your custom message here"
              rows={6}
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Preview</label>
            <div className="message-preview">
              {getMessage().split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="send-btn" onClick={handleSendMessage}>
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
} 