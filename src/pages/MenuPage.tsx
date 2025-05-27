import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuItem, OrderItem, DeliveryMethod } from '../types';
import { MenuListView } from '../components/MenuListView';
import { OrderSummary } from '../components/OrderSummary';
import { CustomerForm } from '../components/CustomerForm';
import { FeaturedDishes } from '../components/FeaturedDishes';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { PackageSelector } from '../components/PackageSelector';
import { getMenu, saveOrder, getOrderSettings } from '../services/firebase';
import { dummyMenuItems } from '../utils/dummy-data';

export function MenuPage() {
  const navigate = useNavigate();
  const orderSectionRef = useRef<HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [specialItems, setSpecialItems] = useState<MenuItem[]>([]);
  const [regularItems, setRegularItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDeadline, setOrderDeadline] = useState<Date | null>(null);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [useDummyData, setUseDummyData] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Calculate total price
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  useEffect(() => {
    // Fetch menu from Firebase
    async function fetchMenuAndSettings() {
      try {
        setIsLoading(true);
        
        // Try to fetch menu items from Firebase
        try {
          const menu = await getMenu();
          if (menu.length > 0) {
            setMenuItems(menu);
            
            // Separate special dishes from regular dishes
            const special = menu.filter(item => 
              item.description?.toLowerCase().includes('special') && item.imageUrl
            );
            const regular = menu.filter(item => 
              !item.description?.toLowerCase().includes('special') || !item.imageUrl
            );
            
            setSpecialItems(special);
            setRegularItems(regular);
            setUseDummyData(false);
          } else {
            // If no menu items, use dummy data
            setUseDummyData(true);
            loadDummyData();
          }
        } catch (err) {
          console.error('Error fetching menu, using dummy data:', err);
          setUseDummyData(true);
          loadDummyData();
        }
        
        // Fetch order settings
        try {
          const settings = await getOrderSettings();
          if (settings.orderDeadline) {
            setOrderDeadline(settings.orderDeadline);
            
            // Check if deadline has passed
            const now = new Date();
            setIsDeadlinePassed(now > settings.orderDeadline);
          } else {
            // Set a dummy deadline 48 hours from now
            const dummyDeadline = new Date();
            dummyDeadline.setHours(dummyDeadline.getHours() + 48);
            setOrderDeadline(dummyDeadline);
          }
        } catch (err) {
          console.error('Error fetching settings, using dummy deadline:', err);
          // Set a dummy deadline 48 hours from now
          const dummyDeadline = new Date();
          dummyDeadline.setHours(dummyDeadline.getHours() + 48);
          setOrderDeadline(dummyDeadline);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load menu. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMenuAndSettings();
    
    // Set up an interval to check if the deadline has passed
    const intervalId = setInterval(() => {
      if (orderDeadline) {
        const now = new Date();
        setIsDeadlinePassed(now > orderDeadline);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Load dummy data function
  const loadDummyData = () => {
    // Use the dummy menu items
    setMenuItems(dummyMenuItems);
    
    // Separate special dishes from regular dishes
    const special = dummyMenuItems.filter(item => 
      item.description?.toLowerCase().includes('special') && item.imageUrl
    );
    const regular = dummyMenuItems.filter(item => 
      !item.description?.toLowerCase().includes('special') || !item.imageUrl
    );
    
    setSpecialItems(special);
    setRegularItems(regular);
  };
  
  const handleAddToOrder = (item: MenuItem, quantity: number) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity } : i
        );
      } else {
        // Add new item to order
        return [...prevItems, { ...item, quantity }];
      }
    });
  };
  
  const handleProceedToCheckout = () => {
    const hasItems = orderItems.some(item => item.quantity > 0);
    if (hasItems) {
      setIsOrdering(true);
      setShowMobileCart(false); // Hide mobile cart when proceeding to checkout
    }
  };
  
  const handleFloatingCartClick = () => {
    // Show the mobile cart
    setShowMobileCart(true);
    
    // If on mobile, scroll to order section
    if (orderSectionRef.current) {
      orderSectionRef.current.style.display = 'block';
      orderSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleSelectPackage = (packageType: string) => {
    setSelectedPackage(packageType);
  };
  
  // Helper function to get item quantity
  const getItemQuantity = (itemId: string): number => {
    const item = orderItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const handleSubmitOrder = async (
    customerName: string,
    deliveryMethod: DeliveryMethod,
    address?: string,
    phoneNumber?: string
  ) => {
    try {
      setIsSubmitting(true);
      
      // Filter out items with quantity 0
      const itemsToOrder = orderItems.filter(item => item.quantity > 0);
      
      // Calculate total
      const total = itemsToOrder.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      
      // Create order object
      const order = {
        customerName,
        deliveryMethod,
        address,
        phoneNumber,
        items: itemsToOrder,
        total
      };
      
      let orderId = 'dummy-id';
      
      // Only save to Firebase if not using dummy data
      if (!useDummyData) {
        try {
          // Save order to Firestore
          orderId = await saveOrder(order);
        } catch (err) {
          console.error('Error saving to Firebase, continuing with dummy ID:', err);
        }
      }
      
      // Reset form and cart
      setOrderItems([]);
      setIsOrdering(false);
      
      // Navigate to success page with order details
      navigate('/success', { 
        state: { 
          orderId,
          customerName,
          total,
          deliveryMethod,
          items: itemsToOrder
        }
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDeadline = (date: Date): string => {
    return date.toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Add a new function to handle item removal
  const handleRemoveItem = (itemId: string) => {
    setOrderItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: 0 } : item
      ).filter(item => item.id !== itemId || item.quantity > 0)
    );
  };
  
  return (
    <div className="menu-page">
      <header className="header">
        <h1>Weekly Food Menu</h1>
        {orderDeadline && (
          <div className={`order-deadline ${isDeadlinePassed ? 'passed' : ''}`}>
            <span className="deadline-label">Order Deadline:</span>
            <span className="deadline-time">{formatDeadline(orderDeadline)}</span>
            {isDeadlinePassed && <span className="deadline-passed">Ordering closed</span>}
          </div>
        )}
      </header>
      
      <main className="content">
        <section className="menu-section">
          {isLoading ? (
            <div className="loading">Loading menu...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : menuItems.length === 0 ? (
            <div className="empty-menu">
              <h3>No menu items available yet</h3>
              <p>The admin is working on adding delicious dishes to the menu. Please check back soon!</p>
              <p>You can visit the <a href="/admin">admin panel</a> to add menu items.</p>
            </div>
          ) : (
            <>
              {/* Package Selection Section */}
              <div className="package-selection-section">
                <h2 className="section-title">Our Special Packages</h2>
                <p className="section-description">Choose a package and select your favorite dishes</p>
                
                <PackageSelector 
                  onSelectPackage={handleSelectPackage} 
                  selectedPackage={selectedPackage}
                />
              </div>
              
              {/* Weekly Special Items Carousel */}
              {specialItems.length > 0 && !selectedPackage && (
                <FeaturedDishes 
                  specialItems={specialItems} 
                  onAddToOrder={handleAddToOrder} 
                />
              )}
              
              {/* Menu List View */}
              <MenuListView 
                items={menuItems} 
                onAddToOrder={handleAddToOrder}
                showLocalLanguage={true}
                selectedPackage={selectedPackage}
              />
            </>
          )}
        </section>
        
        <aside className="order-section" ref={orderSectionRef} style={showMobileCart ? { display: 'block' } : {}}>
          <OrderSummary
            items={orderItems}
            total={totalPrice}
            onCheckout={handleProceedToCheckout}
            isDeadlinePassed={isDeadlinePassed}
            onRemoveItem={handleRemoveItem}
          />
          
          {isOrdering && (
            <CustomerForm 
              onSubmit={handleSubmitOrder}
            />
          )}
        </aside>
      </main>
      
      <FloatingCartButton 
        items={orderItems} 
        onClick={handleFloatingCartClick} 
      />
    </div>
  );
}