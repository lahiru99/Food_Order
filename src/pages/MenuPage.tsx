import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuItem, OrderItem, DeliveryMethod } from '../types';
import { MenuListView } from '../components/MenuListView';
import { OrderSummary } from '../components/OrderSummary';
import { CustomerForm } from '../components/CustomerForm';
import { FeaturedDishes } from '../components/FeaturedDishes';
import { CuisineSelector } from '../components/CuisineSelector';

import { MobileCartModal } from '../components/MobileCartModal';
import { MobileNavigation } from '../components/MobileNavigation';
import { getMenu, saveOrder, getOrderSettings } from '../services/firebase';
import { allMenuItems } from '../utils/dummy-data';

export function MenuPage() {
  const navigate = useNavigate();
  const orderSectionRef = useRef<HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [specialItems, setSpecialItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDeadline, setOrderDeadline] = useState<Date | null>(null);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [useDummyData, setUseDummyData] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

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
            const special = menu.filter(
              (item) =>
                item.description?.toLowerCase().includes('special') &&
                item.imageUrl
            );

            setSpecialItems(special);
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
    // Use all menu items
    setMenuItems(allMenuItems);

    // Separate special dishes from regular dishes
    const special = allMenuItems.filter(
      (item: MenuItem) =>
        item.description?.toLowerCase().includes('special') && item.imageUrl
    );

    setSpecialItems(special);
  };

  const handleAddToOrder = (item: MenuItem, quantity: number) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity } : i
        );
      } else {
        // Add new item to order
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const handleProceedToCheckout = () => {
    const hasItems = orderItems.some((item) => item.quantity > 0);
    if (hasItems) {
      setIsOrdering(true);
      setShowMobileCart(false); // Hide mobile cart when proceeding to checkout

      // Auto-scroll to checkout section on mobile
      setTimeout(() => {
        if (orderSectionRef.current) {
          orderSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  };

  const handleSelectCuisine = (cuisine: string) => {
    if (cuisine === '') {
      // If empty string, reset everything
      setSelectedCuisine(null);
    } else {
      // If selecting a cuisine, set it
      setSelectedCuisine(cuisine);
    }
  };

  // Filter menu items by selected cuisine
  const filteredMenuItems = selectedCuisine
    ? allMenuItems.filter((item) => item.cuisine === selectedCuisine)
    : allMenuItems;

  const handleSubmitOrder = async (
    customerName: string,
    deliveryMethod: DeliveryMethod,
    address?: string,
    phoneNumber?: string
  ) => {
    try {
      // Filter out items with quantity 0
      const itemsToOrder = orderItems.filter((item) => item.quantity > 0);

      // Calculate total
      const total = itemsToOrder.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create order object
      const order = {
        customerName,
        deliveryMethod,
        address,
        phoneNumber,
        items: itemsToOrder,
        total,
      };

      let orderId = 'dummy-id';

      // Only save to Firebase if not using dummy data
      if (!useDummyData) {
        try {
          // Save order to Firestore
          orderId = await saveOrder(order);
        } catch (err) {
          console.error(
            'Error saving to Firebase, continuing with dummy ID:',
            err
          );
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
          items: itemsToOrder,
        },
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  const formatDeadline = (date: Date): string => {
    return date.toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Add a new function to handle item removal
  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, quantity: 0 } : item))
        .filter((item) => item.id !== itemId || item.quantity > 0)
    );
  };

  return (
    <div className="menu-page">
      <header className="header">
        <h1>Food Menu</h1>
        {orderDeadline && (
          <div className={`order-deadline ${isDeadlinePassed ? 'passed' : ''}`}>
            <span className="deadline-label">Order Deadline:</span>
            <span className="deadline-time">
              {formatDeadline(orderDeadline)}
            </span>
            {isDeadlinePassed && (
              <span className="deadline-passed">Ordering closed</span>
            )}
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
              <p>
                The admin is working on adding delicious dishes to the menu.
                Please check back soon!
              </p>
              <p>
                You can visit the <a href="/admin">admin panel</a> to add menu
                items.
              </p>
            </div>
          ) : (
            <>
              {/* Cuisine Selection Section */}
              {!selectedCuisine && (
                <CuisineSelector
                  onSelectCuisine={handleSelectCuisine}
                  selectedCuisine={selectedCuisine}
                />
              )}

              {/* Back to Cuisine Selection Button */}
              {selectedCuisine && (
                <div className="menu-section-header">
                  <button
                    className="back-to-cuisine-btn"
                    onClick={() => handleSelectCuisine('')}
                  >
                    ← Back to Cuisine Selection
                  </button>
                </div>
              )}

              {/* Weekly Special Items Carousel */}
              {specialItems.length > 0 && (
                <FeaturedDishes
                  specialItems={specialItems}
                  onAddToOrder={handleAddToOrder}
                />
              )}

              {/* Menu List View */}
              <MenuListView
                items={filteredMenuItems}
                onAddToOrder={handleAddToOrder}
              />
            </>
          )}
        </section>

        <aside
          className={`order-section ${isOrdering ? 'show-mobile' : ''}`}
          ref={orderSectionRef}
        >
          {isOrdering && (
            <div className="mobile-checkout-header">
              <button
                className="back-to-menu-btn"
                onClick={() => setIsOrdering(false)}
              >
                ← Back to Menu
              </button>
              <h2>Checkout</h2>
            </div>
          )}

          <OrderSummary
            items={orderItems}
            total={totalPrice}
            onCheckout={handleProceedToCheckout}
            isDeadlinePassed={isDeadlinePassed}
            onRemoveItem={handleRemoveItem}
          />

          {isOrdering && <CustomerForm onSubmit={handleSubmitOrder} />}
        </aside>
      </main>

      {/* Mobile Cart Modal */}
      <MobileCartModal
        isOpen={showMobileCart}
        onClose={() => setShowMobileCart(false)}
        orderItems={orderItems.filter((item) => item.quantity > 0)}
        total={totalPrice}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        cartItemCount={orderItems.filter((item) => item.quantity > 0).length}
        onCartClick={() => setShowMobileCart(true)}
      />
    </div>
  );
}
