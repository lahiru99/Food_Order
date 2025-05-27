import type { MenuItem, Order } from '../types';

// Sample menu items based on the actual menu
export const dummyMenuItems: MenuItem[] = [
  // Non-Vegetarian Items
  {
    id: 'non-veg-1',
    name: 'Pork curry/Pork devilled/Pork stew',
    nameLocalLang: 'පෝර්ක් කරි/පෝර්ක් ඩෙවල්/පෝර්ක් ස්ටුව්',
    price: 16,
    category: 'non-veg',
    imageUrl: 'https://images.unsplash.com/photo-1624304418997-72106b632af5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'non-veg-2',
    name: 'Chicken curry/Chicken devilled',
    nameLocalLang: 'චිකන් කරි/චිකන් ඩෙවල්',
    price: 16,
    category: 'non-veg',
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'non-veg-3',
    name: 'Tuna fish Spicy curry/Fish Devilled/Coocked with coconut milk/Tuna tempered',
    nameLocalLang: 'කෙලවල්ලෝ මිරිසට/කිරි මාලු/කෙලවල්ලෝ මාලු තෙල් දාල/මාලු ඩෙවල්',
    price: 16,
    category: 'non-veg',
    imageUrl: 'https://images.unsplash.com/photo-1626102807192-9229644d5daf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'non-veg-4',
    name: 'Sparats Tempered',
    nameLocalLang: 'හාල් මැස්සො තෙල් දාලා',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-5',
    name: 'Sausage tempered/Devilled',
    nameLocalLang: 'චිකන් සොසේජස් ඩෙවල්/තෙල් දාලා',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-6',
    name: 'Saman tempered (brand-Derana)',
    nameLocalLang: '(දෙරන) සැමන් තෙල් දාල/උයල',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-7',
    name: 'Fried sardines tempered',
    nameLocalLang: 'හුරුල්ලෝ මාලු බැදලා තෙල් දාලා',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-8',
    name: 'Egg lunu mirisa',
    nameLocalLang: 'බිත්තර ලුනු මිරිස/කිරි හොදි උබ්බලකඩ සමග',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-9',
    name: 'Chicken Giblet Curry',
    nameLocalLang: 'චිකන් වැලි බොකු කරිය',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-10',
    name: 'Sparats Curry with potato',
    nameLocalLang: 'හාල් මැස්සො කරවල අල දාල',
    price: 16,
    category: 'non-veg'
  },
  {
    id: 'non-veg-11',
    name: 'Dry fish tempered/Dry fish curry with potatoes',
    nameLocalLang: 'කරවල තෙලට/කරවල අල දාල',
    price: 16,
    category: 'non-veg'
  },

  // Vegetarian Items
  {
    id: 'veg-1',
    name: 'Tempered dhal curry',
    nameLocalLang: 'පරිප්පු තෙම්පරාදුව',
    price: 12,
    category: 'veg',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'veg-2',
    name: 'Beet root curry',
    nameLocalLang: 'බීට් රූට් කරිය',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-3',
    name: 'Potatoe temepered/Potatoe curry coocked with coconut milk',
    nameLocalLang: 'අල තෙල් දාල/කිරට',
    price: 12,
    category: 'veg',
    imageUrl: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'veg-4',
    name: 'Pumpkin curry',
    nameLocalLang: 'වට්ටක්කා කරිය',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-5',
    name: 'Cabbage tempered/Cabbage curry coocked with coconut milk',
    nameLocalLang: 'ගෝවා උයලා/තෙල් දාල',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-6',
    name: 'Carrot curry mixed with potatoes',
    nameLocalLang: 'කැරට් අල දාලා උයලා',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-7',
    name: 'Beans curry',
    nameLocalLang: 'බෝංචි',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-8',
    name: 'Khale mallum',
    nameLocalLang: 'කේල් කොල මැල්ලුම',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-9',
    name: 'Leeks curry mixed with potatoes',
    nameLocalLang: 'ලීක්ස් අල දාලා උයලා/තෙලට',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-10',
    name: 'Fried eggplant curry',
    nameLocalLang: 'වම්බටු බැදලා උයලා',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-11',
    name: 'Chickpeas curry/tempered',
    nameLocalLang: 'කඩල කරිය/කඩල තෙල් දාල',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-12',
    name: 'Soyameat',
    nameLocalLang: 'සෝයා මීට් කරිය',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-13',
    name: 'Beetroot salad',
    nameLocalLang: 'රතු අල සලාදය',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-14',
    name: 'Cabbage mallum',
    nameLocalLang: 'ගෝවා මැල්ලුම්',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-15',
    name: 'Butter Pumpkin tempered',
    nameLocalLang: 'බටාන තෙල් දාල',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-16',
    name: 'Carrot Sambal',
    nameLocalLang: 'කැරට් සම්බෝලය',
    price: 12,
    category: 'veg'
  },
  {
    id: 'veg-17',
    name: 'Carrot tempered',
    nameLocalLang: 'කැරට් තෙලට',
    price: 12,
    category: 'veg'
  },

  // Extras
  {
    id: 'extras-1',
    name: 'Big shrimp tempered/deviled',
    nameLocalLang: 'ලොකු ඉස්සෝ තෙල් දාලා/ඩෙවල්',
    price: 20,
    category: 'extras',
    imageUrl: 'https://images.unsplash.com/photo-1625944525533-473f1a3d51e0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'extras-2',
    name: 'Cashew Curry coocked with coconut milk/tempered',
    nameLocalLang: 'කජු කරිය/තෙල් දාල',
    price: 20,
    category: 'extras'
  },
  {
    id: 'extras-3',
    name: 'Beef curry/Deviled',
    nameLocalLang: 'හරක් මස් කරිය/ඩෙවල්/ස්ටුව්',
    price: 22,
    category: 'extras',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'extras-4',
    name: 'Lamb curry',
    nameLocalLang: 'බැටලු මස් කරිය',
    price: 24,
    category: 'extras'
  },
  {
    id: 'extras-5',
    name: 'Capsicum curry (capsicum filled with maldive fish/onions/Eggs)',
    nameLocalLang: 'මාලු මිරිස් පුරවල උයල',
    price: 16,
    category: 'extras'
  },
  {
    id: 'extras-6',
    name: 'Snake beans curry',
    nameLocalLang: 'අඹ',
    price: 14,
    category: 'extras'
  },
  {
    id: 'extras-7',
    name: 'Eggplant moju',
    nameLocalLang: 'වම්බටු මෝජු',
    price: 14,
    category: 'extras'
  },
  {
    id: 'extras-8',
    name: 'Egg Vegetable Mixed Noodles',
    nameLocalLang: 'බිත්තර එළවලු මිශ්‍ර නූඩ්ල්ස්',
    price: 15,
    category: 'extras'
  },
  {
    id: 'extras-9',
    name: 'Coconut sambal Extra (700ml)',
    nameLocalLang: 'ලොකු සම්බෝල අමතර(700ml)',
    price: 10,
    category: 'extras'
  },
  {
    id: 'extras-10',
    name: 'Papadam Extra (700ml)',
    nameLocalLang: 'ලොකු පපඩම් (700ml)',
    price: 5,
    category: 'extras'
  },
  {
    id: 'extras-11',
    name: '6 coconut rotis with Lunu mirisa',
    nameLocalLang: 'ලොකු පොල් රොටී 6 ලුනු මිරිස් සහ මාලු සමග',
    price: 20,
    category: 'extras'
  },
  {
    id: 'extras-12',
    name: '10 big fish cutlets',
    nameLocalLang: 'ලොකු මාලු කට්ලට් 10',
    price: 15,
    category: 'extras'
  }
];

// Dummy orders for admin testing
export const dummyOrders: Order[] = [
  {
    id: 'order-001',
    customerName: 'John Smith',
    deliveryMethod: 'delivery',
    address: '123 Main Street, Melbourne VIC 3000',
    phoneNumber: '+61412345678',
    items: [
      {
        id: 'item-1',
        name: 'Chicken Curry',
        nameLocalLang: 'කුකුල් මස් කරි',
        price: 15,
        quantity: 2,
        category: 'non-veg'
      },
      {
        id: 'item-2',
        name: 'Dhal Curry',
        nameLocalLang: 'පරිප්ප් කරි',
        price: 8,
        quantity: 1,
        category: 'veg'
      }
    ],
    total: 38,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'order-002',
    customerName: 'Sarah Johnson',
    deliveryMethod: 'pickup',
    phoneNumber: '+61498765432',
    items: [
      {
        id: 'package-premium-001',
        name: 'Premium Package (2 Non-Veg, 2 Veg, Sides)',
        price: 55,
        quantity: 1,
        category: 'package',
        description: 'Package includes: Fish Curry, Beef Curry and Potato Curry, Green Bean Curry. Also includes coconut sambal, papadam, and 700ml container.'
      }
    ],
    total: 55,
    createdAt: new Date('2024-01-15T11:45:00')
  },
  {
    id: 'order-003',
    customerName: 'Michael Chen',
    deliveryMethod: 'delivery',
    address: '456 Collins Street, Melbourne VIC 3000',
    phoneNumber: '+61423456789',
    items: [
      {
        id: 'item-3',
        name: 'Fish Curry',
        nameLocalLang: 'මාළු කරි',
        price: 18,
        quantity: 1,
        category: 'non-veg'
      },
      {
        id: 'item-4',
        name: 'Rice',
        nameLocalLang: 'බත්',
        price: 5,
        quantity: 2,
        category: 'extras'
      }
    ],
    total: 28,
    createdAt: new Date('2024-01-15T12:15:00')
  },
  {
    id: 'order-004',
    customerName: 'Emma Wilson',
    deliveryMethod: 'pickup',
    phoneNumber: '+61434567890',
    items: [
      {
        id: 'package-standard-001',
        name: 'Standard Package (1 Non-Veg, 3 Veg, Sides)',
        price: 50,
        quantity: 1,
        category: 'package',
        description: 'Package includes: Chicken Curry and Potato Curry, Dhal Curry, Green Bean Curry. Also includes coconut sambal, papadam, and 700ml container.'
      }
    ],
    total: 50,
    createdAt: new Date('2024-01-15T13:00:00')
  },
  {
    id: 'order-005',
    customerName: 'David Brown',
    deliveryMethod: 'delivery',
    address: '789 Swanston Street, Melbourne VIC 3000',
    phoneNumber: '+61445678901',
    items: [
      {
        id: 'item-5',
        name: 'Beef Curry',
        nameLocalLang: 'හරක් මස් කරි',
        price: 20,
        quantity: 1,
        category: 'non-veg'
      },
      {
        id: 'item-6',
        name: 'Coconut Sambal',
        nameLocalLang: 'පොල් සම්බෝල',
        price: 3,
        quantity: 2,
        category: 'extras'
      }
    ],
    total: 26,
    createdAt: new Date('2024-01-15T14:30:00')
  }
]; 