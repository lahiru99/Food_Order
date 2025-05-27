import type { Order } from '../types';

/**
 * Format price to currency format
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Generate WhatsApp URL with order details
 */
export function generateWhatsAppUrl(order: Order, phoneNumber: string): string {
  // Format the message
  const items = order.items
    .map(item => `- ${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})`)
    .join('\n');
  
  const message = `*NEW ORDER #${order.id}*\n\n` +
    `*Customer:* ${order.customerName}\n` +
    `*Delivery Method:* ${order.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}\n` +
    (order.address ? `*Address:* ${order.address}\n` : '') +
    `*Date:* ${order.createdAt.toLocaleString()}\n\n` +
    `*Items:*\n${items}\n\n` +
    `*Total:* ${formatPrice(order.total)}`;
  
  // Generate the URL
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
} 