// Menu item interface
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

// Order item extends menu item with quantity
export interface OrderItem extends MenuItem {
  quantity: number;
}

// Delivery method type
export type DeliveryMethod = 'pickup' | 'delivery';

// Order interface
export interface Order {
  id: string;
  customerName: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  items: OrderItem[];
  total: number;
  createdAt: Date;
} 