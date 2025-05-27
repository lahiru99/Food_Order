import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  updateDoc,
  deleteDoc,
  type DocumentData,
  setDoc,
  writeBatch,
  serverTimestamp,
  where
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import type { Order, OrderItem, MenuItem } from '../types';
import { dummyMenuItems } from '../utils/dummy-data';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Collection references
const ordersCollection = collection(db, 'orders');
const menuCollection = collection(db, 'menu');

// Save order to Firestore
export const saveOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const orderWithTimestamp = {
      ...order,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        customerName: data.customerName,
        deliveryMethod: data.deliveryMethod,
        address: data.address,
        items: data.items,
        total: data.total,
        createdAt: data.createdAt.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

// Get menu items
export const getMenu = async (): Promise<MenuItem[]> => {
  try {
    const querySnapshot = await getDocs(menuCollection);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl
      };
    });
  } catch (error) {
    console.error('Error getting menu:', error);
    throw error;
  }
};

// Upload an image to Firebase Storage
const uploadImage = async (file: File, menuItemId: string): Promise<string> => {
  const storageRef = ref(storage, `menu-images/${menuItemId}/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Save menu item
export const saveMenuItem = async (menuItem: {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  imageFile: File | null;
}): Promise<string> => {
  try {
    let imageUrl = menuItem.imageUrl;
    
    // If there's a new image, upload it
    if (menuItem.imageFile) {
      // If we're updating an existing item
      if (menuItem.id) {
        imageUrl = await uploadImage(menuItem.imageFile, menuItem.id);
      } else {
        // For new items, we need to create a doc first to get the ID
        const tempDoc = await addDoc(menuCollection, {
          name: menuItem.name,
          price: menuItem.price,
          description: menuItem.description,
          imageUrl: ''
        });
        
        imageUrl = await uploadImage(menuItem.imageFile, tempDoc.id);
        
        // Update with the image URL
        await updateDoc(doc(db, 'menu', tempDoc.id), {
          imageUrl
        });
        
        return tempDoc.id;
      }
    }
    
    // If we're updating an existing item
    if (menuItem.id) {
      await updateDoc(doc(db, 'menu', menuItem.id), {
        name: menuItem.name,
        price: menuItem.price,
        description: menuItem.description,
        imageUrl: imageUrl
      });
      return menuItem.id;
    } 
    // If we're creating a new item without an image
    else {
      const docRef = await addDoc(menuCollection, {
        name: menuItem.name,
        price: menuItem.price,
        description: menuItem.description,
        imageUrl: imageUrl
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error saving menu item:', error);
    throw error;
  }
};

// Delete menu item
export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    // Get the item to check if it has an image
    const menuItemDoc = await getDoc(doc(db, 'menu', id));
    
    if (menuItemDoc.exists()) {
      const menuItem = menuItemDoc.data();
      
      // If there's an image, delete it from storage
      if (menuItem.imageUrl) {
        try {
          // Extract the storage path from the URL
          const url = new URL(menuItem.imageUrl);
          const imagePath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef);
        } catch (err) {
          console.error('Error deleting image from storage:', err);
          // Continue with document deletion even if image deletion fails
        }
      }
      
      // Delete the document
      await deleteDoc(doc(db, 'menu', id));
    }
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

// Generate WhatsApp message for menu
export const publishMenu = async (menuItems: MenuItem[], orderDeadline?: string): Promise<string> => {
  try {
    // Format menu items for WhatsApp
    const menuText = menuItems.map(item => {
      const isSpecial = item.description?.toLowerCase().includes('special') || false;
      return `${isSpecial ? '⭐ ' : ''}*${item.name}* - ${formatPrice(item.price)}\n${item.description || ''}`;
    }).join('\n\n');
    
    // Format deadline if provided
    let deadlineText = '';
    if (orderDeadline) {
      const deadline = new Date(orderDeadline);
      // Save the deadline to Firestore
      await updateDoc(doc(db, 'settings', 'orderSettings'), {
        orderDeadline: deadline,
        menuLastUpdated: Timestamp.now()
      }).catch(async () => {
        // If document doesn't exist, create it
        await setDoc(doc(db, 'settings', 'orderSettings'), {
          orderDeadline: deadline,
          menuLastUpdated: Timestamp.now()
        });
      });
      
      // Format the deadline for the message
      deadlineText = `\n\n⏰ *Order Deadline*: ${deadline.toLocaleString()}\n`;
    }
    
    // Create a message with introduction
    const message = `📱 *Weekly Menu* 📱\n\nHere's our menu for this week:\n\n${menuText}\n\n⭐ = Special dish${deadlineText}\n\nTo place an order, please visit our website: ${window.location.origin}`;
    
    // WhatsApp business number
    const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890';
    
    // Generate WhatsApp URL
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  } catch (error) {
    console.error('Error publishing menu:', error);
    throw error;
  }
};

// Get order settings including deadline
export const getOrderSettings = async (): Promise<{
  orderDeadline?: Date;
  menuLastUpdated?: Date;
}> => {
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'orderSettings'));
    if (settingsDoc.exists()) {
      const data = settingsDoc.data();
      return {
        orderDeadline: data.orderDeadline?.toDate(),
        menuLastUpdated: data.menuLastUpdated?.toDate()
      };
    }
    return {};
  } catch (error) {
    console.error('Error getting order settings:', error);
    return {};
  }
};

// Initialize Firebase with dummy data
export const initializeWithDummyData = async (): Promise<void> => {
  try {
    // Clear existing menu items
    const menuSnapshot = await getDocs(menuCollection);
    const batch = writeBatch(db);
    
    menuSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    // Clear existing orders
    const ordersSnapshot = await getDocs(ordersCollection);
    ordersSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    // Add dummy menu items
    for (const item of dummyMenuItems) {
      await addDoc(menuCollection, {
        name: item.name,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl
      });
    }
    
    // Add dummy orders
    const { dummyOrders } = await import('../utils/dummy-data');
    for (const order of dummyOrders) {
      await addDoc(ordersCollection, {
        ...order,
        createdAt: Timestamp.fromDate(order.createdAt)
      });
    }
    
    // Set a sample order deadline (48 hours from now)
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 48);
    
    await setDoc(doc(db, 'settings', 'orderSettings'), {
      orderDeadline: deadline,
      menuLastUpdated: Timestamp.now()
    });
    
    console.log('Dummy data initialized successfully!');
  } catch (error) {
    console.error('Error initializing dummy data:', error);
    throw error;
  }
};

// Helper function to format price
const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Menu operations
export async function getMenuItems(): Promise<MenuItem[]> {
  const menuCollection = collection(db, 'menuItems');
  const menuSnapshot = await getDocs(menuCollection);
  
  return menuSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MenuItem));
}

export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const menuCollection = collection(db, 'menuItems');
  const docRef = await addDoc(menuCollection, {
    ...item,
    createdAt: serverTimestamp()
  });
  
  return {
    ...item,
    id: docRef.id
  };
}

export async function updateMenuItem(item: MenuItem): Promise<void> {
  const menuDocRef = doc(db, 'menuItems', item.id);
  await setDoc(menuDocRef, {
    ...item,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export async function deleteMenuItemItems(id: string): Promise<void> {
  const menuDocRef = doc(db, 'menuItems', id);
  await deleteDoc(menuDocRef);
}

// Order operations
export async function saveOrderItems(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  const orderCollection = collection(db, 'orders');
  const docRef = await addDoc(orderCollection, {
    ...order,
    createdAt: serverTimestamp()
  });
  
  return docRef.id;
}

export async function getOrdersItems(): Promise<Order[]> {
  const orderCollection = collection(db, 'orders');
  const orderQuery = query(orderCollection, orderBy('createdAt', 'desc'));
  const orderSnapshot = await getDocs(orderQuery);
  
  return orderSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? 
        data.createdAt.toDate() : 
        new Date()
    } as Order;
  });
}

// Order settings operations
export async function getOrderSettingsItems() {
  const settingsCollection = collection(db, 'settings');
  const settingsQuery = query(settingsCollection, where('id', '==', 'orderSettings'));
  const settingsSnapshot = await getDocs(settingsQuery);
  
  if (settingsSnapshot.empty) {
    return { orderDeadline: null };
  }
  
  const settingsDoc = settingsSnapshot.docs[0];
  const data = settingsDoc.data();
  
  return {
    ...data,
    orderDeadline: data.orderDeadline instanceof Timestamp ? 
      data.orderDeadline.toDate() : 
      null
  };
} 