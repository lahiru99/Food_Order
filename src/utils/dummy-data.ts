import type { MenuItem, Order } from '../types';

// Sample menu items based on the actual menu
export const dummyMenuItems: MenuItem[] = [
  // Sri Lankan Cuisine - Non-Vegetarian Items
  {
    id: 'sl-non-veg-1',
    name: 'Mixed Meat Platter',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1624304418997-72106b632af5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-non-veg-2',
    name: 'Spicy Chicken Dish',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-non-veg-3',
    name: 'Seafood Delight',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1626102807192-9229644d5daf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-non-veg-4',
    name: 'Sparats Tempered',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-5',
    name: 'Sausage tempered/Devilled',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-6',
    name: 'Saman tempered (brand-Derana)',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-7',
    name: 'Fried sardines tempered',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-8',
    name: 'Egg lunu mirisa',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-9',
    name: 'Chicken Giblet Curry',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-10',
    name: 'Sparats Curry with potato',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },
  {
    id: 'sl-non-veg-11',
    name: 'Dry fish tempered/Dry fish curry with potatoes',
    price: 16,
    category: 'non-veg',
    cuisine: 'sri-lankan',
  },

  // Sri Lankan Cuisine - Vegetarian Items
  {
    id: 'sl-veg-1',
    name: 'Spiced Lentil Bowl',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=800',
  },
  {
    id: 'sl-veg-2',
    name: 'Beet root curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-3',
    name: 'Carrot curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-4',
    name: 'Green beans curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-5',
    name: 'Cabbage curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-6',
    name: 'Potato curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-7',
    name: 'Brinjal curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-8',
    name: 'Pumpkin curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-9',
    name: 'Cucumber curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-10',
    name: 'Mushroom curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-veg-11',
    name: 'Mixed vegetable curry',
    price: 12,
    category: 'veg',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },

  // Sri Lankan Cuisine - Extras & Desserts
  {
    id: 'sl-extras-1',
    name: 'Coconut sambal',
    price: 8,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-2',
    name: 'Papadam',
    price: 5,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-3',
    name: 'Rice',
    price: 6,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-4',
    name: 'Bread',
    price: 4,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-5',
    name: 'Roti',
    price: 4,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-6',
    name: 'String hoppers',
    price: 6,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-7',
    name: 'Hoppers',
    price: 5,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-8',
    name: 'Milk tea',
    price: 3,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-9',
    name: 'Coffee',
    price: 3,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'sl-extras-10',
    name: 'Ice cream',
    price: 4,
    category: 'extras',
    cuisine: 'sri-lankan',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
];

// Japanese Cuisine
export const japaneseMenuItems: MenuItem[] = [
  {
    id: 'jp-non-veg-1',
    name: 'Chicken Teriyaki',
    price: 18,
    category: 'non-veg',
    cuisine: 'japanese',
    imageUrl:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'jp-non-veg-2',
    name: 'Salmon Sushi Roll',
    price: 16,
    category: 'non-veg',
    cuisine: 'japanese',
    imageUrl:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'jp-non-veg-3',
    name: 'Beef Ramen',
    price: 20,
    category: 'non-veg',
    cuisine: 'japanese',
    imageUrl:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'jp-veg-1',
    name: 'Vegetable Tempura',
    price: 14,
    category: 'veg',
    cuisine: 'japanese',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'jp-veg-2',
    name: 'Miso Soup',
    price: 8,
    category: 'veg',
    cuisine: 'japanese',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'jp-extras-1',
    name: 'Edamame',
    price: 6,
    category: 'extras',
    cuisine: 'japanese',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
];

// Chinese Cuisine
export const chineseMenuItems: MenuItem[] = [
  {
    id: 'cn-non-veg-1',
    name: 'Kung Pao Chicken',
    price: 17,
    category: 'non-veg',
    cuisine: 'chinese',
    imageUrl:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cn-non-veg-2',
    name: 'Sweet & Sour Pork',
    price: 16,
    category: 'non-veg',
    cuisine: 'chinese',
    imageUrl:
      'https://images.unsplash.com/photo-1624304418997-72106b632af5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cn-veg-1',
    name: 'Stir-Fried Vegetables',
    price: 12,
    category: 'veg',
    cuisine: 'chinese',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cn-veg-2',
    name: 'Fried Rice',
    price: 10,
    category: 'veg',
    cuisine: 'chinese',
    imageUrl:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cn-extras-1',
    name: 'Spring Rolls',
    price: 8,
    category: 'extras',
    cuisine: 'chinese',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
];

// Mexican Cuisine
export const mexicanMenuItems: MenuItem[] = [
  {
    id: 'mx-non-veg-1',
    name: 'Chicken Tacos',
    price: 15,
    category: 'non-veg',
    cuisine: 'mexican',
    imageUrl:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'mx-non-veg-2',
    name: 'Beef Burrito',
    price: 18,
    category: 'non-veg',
    cuisine: 'mexican',
    imageUrl:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'mx-veg-1',
    name: 'Vegetarian Quesadilla',
    price: 13,
    category: 'veg',
    cuisine: 'mexican',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'mx-veg-2',
    name: 'Guacamole & Chips',
    price: 9,
    category: 'veg',
    cuisine: 'mexican',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'mx-extras-1',
    name: 'Salsa Verde',
    price: 4,
    category: 'extras',
    cuisine: 'mexican',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
];

// Italian Cuisine
export const italianMenuItems: MenuItem[] = [
  {
    id: 'it-non-veg-1',
    name: 'Margherita Pizza',
    price: 22,
    category: 'non-veg',
    cuisine: 'italian',
    imageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'it-non-veg-2',
    name: 'Chicken Alfredo Pasta',
    price: 19,
    category: 'non-veg',
    cuisine: 'italian',
    imageUrl:
      'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'it-veg-1',
    name: 'Vegetarian Lasagna',
    price: 16,
    category: 'veg',
    cuisine: 'italian',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'it-veg-2',
    name: 'Bruschetta',
    price: 11,
    category: 'veg',
    cuisine: 'italian',
    imageUrl:
      'https://images.unsplash.com/photo-1447175008436-170170d8864b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'it-extras-1',
    name: 'Garlic Bread',
    price: 6,
    category: 'extras',
    cuisine: 'italian',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
];

// Indian Cuisine
export const indianMenuItems: MenuItem[] = [
  {
    id: 'in-non-veg-1',
    name: 'Butter Chicken',
    price: 18,
    category: 'non-veg',
    cuisine: 'indian',
    imageUrl:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'in-non-veg-2',
    name: 'Lamb Curry',
    price: 20,
    category: 'non-veg',
    cuisine: 'indian',
    imageUrl:
      'https://images.unsplash.com/photo-1624304418997-72106b632af5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'in-veg-1',
    name: 'Palak Paneer',
    price: 14,
    category: 'veg',
    cuisine: 'indian',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'in-veg-2',
    name: 'Dal Makhani',
    price: 12,
    category: 'veg',
    cuisine: 'indian',
    imageUrl:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'in-extras-1',
    name: 'Naan Bread',
    price: 5,
    category: 'extras',
    cuisine: 'indian',
    imageUrl:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  },
];

// Combine all cuisines
export const allMenuItems: MenuItem[] = [
  ...dummyMenuItems, // Sri Lankan
  ...japaneseMenuItems,
  ...chineseMenuItems,
  ...mexicanMenuItems,
  ...italianMenuItems,
  ...indianMenuItems,
];

// Dummy orders for admin testing
export const dummyOrders: Order[] = [
  {
    id: 'order-001',
    customerName: 'John Smith',
    deliveryMethod: 'delivery',
    address: '123 Oak Avenue, Downtown',
    phoneNumber: '+61412345678',
    items: [
      {
        id: 'sl-non-veg-2',
        name: 'Spicy Chicken Dish',
        price: 15,
        quantity: 2,
        category: 'non-veg',
        cuisine: 'sri-lankan',
      },
      {
        id: 'sl-veg-1',
        name: 'Lentil Curry',
        price: 8,
        quantity: 1,
        category: 'veg',
        cuisine: 'sri-lankan',
      },
    ],
    total: 38,
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 'order-002',
    customerName: 'Sarah Johnson',
    deliveryMethod: 'pickup',
    phoneNumber: '+61498765432',
    items: [
      {
        id: 'sl-non-veg-1',
        name: 'Mixed Meat Platter',
        price: 16,
        quantity: 2,
        category: 'non-veg',
        cuisine: 'sri-lankan',
      },
    ],
    total: 32,
    createdAt: new Date('2024-01-15T11:45:00'),
  },
  {
    id: 'order-003',
    customerName: 'Michael Chen',
    deliveryMethod: 'delivery',
    address: '456 Pine Street, Midtown',
    phoneNumber: '+61423456789',
    items: [
      {
        id: 'sl-non-veg-3',
        name: 'Seafood Delight',
        price: 18,
        quantity: 1,
        category: 'non-veg',
        cuisine: 'sri-lankan',
      },
      {
        id: 'sl-extras-3',
        name: 'Steamed Rice',
        price: 5,
        quantity: 2,
        category: 'extras',
        cuisine: 'sri-lankan',
      },
    ],
    total: 28,
    createdAt: new Date('2024-01-15T12:15:00'),
  },
  {
    id: 'order-004',
    customerName: 'Emma Wilson',
    deliveryMethod: 'pickup',
    phoneNumber: '+61434567890',
    items: [
      {
        id: 'sl-veg-1',
        name: 'Spiced Lentil Bowl',
        price: 12,
        quantity: 2,
        category: 'veg',
        cuisine: 'sri-lankan',
      },
    ],
    total: 24,
    createdAt: new Date('2024-01-15T13:00:00'),
  },
  {
    id: 'order-005',
    customerName: 'David Brown',
    deliveryMethod: 'delivery',
    address: '789 Maple Drive, Uptown',
    phoneNumber: '+61445678901',
    items: [
      {
        id: 'in-non-veg-2',
        name: 'Tender Meat Curry',
        price: 20,
        quantity: 1,
        category: 'non-veg',
        cuisine: 'indian',
      },
      {
        id: 'sl-extras-1',
        name: 'Fresh Coconut Chutney',
        price: 3,
        quantity: 2,
        category: 'extras',
        cuisine: 'sri-lankan',
      },
    ],
    total: 26,
    createdAt: new Date('2024-01-15T14:30:00'),
  },
];
