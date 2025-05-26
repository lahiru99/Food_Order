import type { Order } from '../types';

/**
 * Format price to currency string
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Generate WhatsApp URL with order details
 */
export const generateWhatsAppUrl = (order: Order, whatsappNumber: string): string => {
  // Format items
  const itemsList = order.items.map(item => 
    `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
  ).join('\n');
  
  // Create a short order ID for the message
  const shortOrderId = order.id ? order.id.slice(0, 6) : 'NEW';
  
  // Format order details
  const orderDetails = [
    `*Order Confirmation #${shortOrderId}*`,
    `\nThank you for your order, ${order.customerName}!`,
    `\n*Order Details:*\n${itemsList}`,
    `\n*Total:* ${formatPrice(order.total)}`,
    `\n*Delivery Method:* ${order.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}`,
    order.address ? `\n*Delivery Address:* ${order.address}` : '',
    `\nWe'll prepare your order as soon as possible.`,
    `\nThank you for your business!`
  ].join('');
  
  // Generate WhatsApp URL
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;
}; 