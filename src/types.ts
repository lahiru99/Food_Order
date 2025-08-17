// Menu item interface
export interface MenuItem {
  id: string;
  name: string;
  nameLocalLang?: string; // Name in local language (Sinhala)
  price: number;
  description?: string;
  imageUrl?: string;
  category?: 'non-veg' | 'veg' | 'extras' | 'package' | 'other'; // Category for grouping
  cuisine?: string; // Cuisine type (e.g., 'sri-lankan', 'japanese', 'chinese')
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
  phoneNumber?: string;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}
