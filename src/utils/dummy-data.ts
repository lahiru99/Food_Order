import type { MenuItem, Order } from '../types';

// Sample menu items with images from free stock photo sites
export const dummyMenuItems: MenuItem[] = [
  {
    id: 'item1',
    name: 'Grilled Chicken Rice Bowl',
    price: 12.99,
    description: 'Tender grilled chicken served with aromatic rice, fresh vegetables, and our special sauce. (Special dish)',
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item2',
    name: 'Vegetable Stir Fry',
    price: 9.99,
    description: 'Fresh seasonal vegetables stir-fried with tofu in our signature sauce, served with steamed rice.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item3',
    name: 'Beef Burger with Fries',
    price: 14.99,
    description: 'Juicy beef patty with lettuce, tomato, cheese, and our special sauce, served with crispy fries. (Special dish)',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item4',
    name: 'Margherita Pizza',
    price: 11.99,
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil.',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item5',
    name: 'Seafood Paella',
    price: 16.99,
    description: 'Traditional Spanish rice dish with prawns, mussels, and squid. (Special dish)',
    imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item6',
    name: 'Caesar Salad',
    price: 8.99,
    description: 'Fresh romaine lettuce with croutons, parmesan cheese, and our homemade caesar dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item7',
    name: 'Chocolate Lava Cake',
    price: 6.99,
    description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream.',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'item8',
    name: 'Mango Smoothie',
    price: 4.99,
    description: 'Refreshing smoothie made with fresh mangoes and yogurt.',
    imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=800'
  }
];

// Sample orders for the admin dashboard
export const dummyOrders: Omit<Order, 'id'>[] = [
  {
    customerName: 'John Smith',
    deliveryMethod: 'delivery',
    address: '123 Main St, Anytown, CA 12345',
    items: [
      { ...dummyMenuItems[0], quantity: 2 },
      { ...dummyMenuItems[3], quantity: 1 },
      { ...dummyMenuItems[6], quantity: 2 }
    ],
    total: (dummyMenuItems[0].price * 2) + dummyMenuItems[3].price + (dummyMenuItems[6].price * 2),
    createdAt: new Date(Date.now() - 86400000) // Yesterday
  },
  {
    customerName: 'Emily Johnson',
    deliveryMethod: 'pickup',
    address: '',
    items: [
      { ...dummyMenuItems[2], quantity: 1 },
      { ...dummyMenuItems[7], quantity: 1 }
    ],
    total: dummyMenuItems[2].price + dummyMenuItems[7].price,
    createdAt: new Date(Date.now() - 172800000) // 2 days ago
  },
  {
    customerName: 'Michael Brown',
    deliveryMethod: 'delivery',
    address: '456 Oak Ave, Somecity, NY 67890',
    items: [
      { ...dummyMenuItems[4], quantity: 1 },
      { ...dummyMenuItems[5], quantity: 1 }
    ],
    total: dummyMenuItems[4].price + dummyMenuItems[5].price,
    createdAt: new Date(Date.now() - 259200000) // 3 days ago
  },
  {
    customerName: 'Sarah Davis',
    deliveryMethod: 'pickup',
    address: '',
    items: [
      { ...dummyMenuItems[1], quantity: 2 },
      { ...dummyMenuItems[6], quantity: 1 }
    ],
    total: (dummyMenuItems[1].price * 2) + dummyMenuItems[6].price,
    createdAt: new Date(Date.now() - 345600000) // 4 days ago
  },
  {
    customerName: 'David Wilson',
    deliveryMethod: 'delivery',
    address: '789 Pine St, Othercity, FL 23456',
    items: [
      { ...dummyMenuItems[0], quantity: 1 },
      { ...dummyMenuItems[2], quantity: 1 },
      { ...dummyMenuItems[7], quantity: 2 }
    ],
    total: dummyMenuItems[0].price + dummyMenuItems[2].price + (dummyMenuItems[7].price * 2),
    createdAt: new Date(Date.now() - 432000000) // 5 days ago
  }
]; 