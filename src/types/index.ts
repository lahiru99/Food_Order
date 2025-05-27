export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  nameLocalLang?: string;
  category?: 'non-veg' | 'veg' | 'extras' | 'package' | 'other';
  imageUrl?: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export interface Order {
  id: string;
  customerName: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  items: OrderItem[];
  total: number;
  createdAt: Date;
} 