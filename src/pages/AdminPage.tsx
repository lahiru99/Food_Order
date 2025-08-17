import { useState, useEffect, useMemo } from 'react';
import type { Order, MenuItem } from '../types';
import {
  getOrders,
  getMenu,
  updateMenuItem,
  deleteMenuItem,
  addMenuItem,
} from '../services/firebase';
import { formatPrice } from '../utils/whatsapp';
import { AdminWhatsAppMessages } from '../components/AdminWhatsAppMessages';
import { dummyOrders } from '../utils/dummy-data';

export function AdminPage() {
  console.log(
    'AdminPage component loaded, dummyOrders:',
    dummyOrders.length,
    'orders'
  );

  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'name' | 'total'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    nameLocalLang: '',
    price: 0,
    category: 'non-veg',
    description: '',
  });

  // Add state for the WhatsApp modal
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [useDummyData, setUseDummyData] = useState(false);

  useEffect(() => {
    console.log('AdminPage useEffect triggered, activeTab:', activeTab);

    // Check if Firebase is configured
    const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    console.log('Firebase configured:', !!isFirebaseConfigured);

    // Fetch data based on active tab
    const fetchData = async () => {
      console.log('Starting fetchData for:', activeTab);
      setIsLoading(true);
      setError(null);

      // If Firebase is not configured, immediately use dummy data
      if (!isFirebaseConfigured) {
        console.log('Firebase not configured, using dummy data');
        if (activeTab === 'orders') {
          console.log('Setting dummy orders:', dummyOrders.length, 'orders');
          setOrders(dummyOrders);
        }
        setUseDummyData(true);
        setIsLoading(false);
        return;
      }

      try {
        if (activeTab === 'menu') {
          // Try to fetch menu items from Firebase
          const menuData = await getMenu();
          if (menuData && menuData.length > 0) {
            setMenuItems(menuData);
            setUseDummyData(false);
          } else {
            // No menu items found, use dummy data
            console.log('No menu items found, using dummy data');
            setUseDummyData(true);
          }
        } else {
          // Try to fetch orders from Firebase
          const ordersData = await getOrders();
          if (ordersData && ordersData.length > 0) {
            setOrders(ordersData);
            setUseDummyData(false);
          } else {
            // No orders found or Firebase failed, use dummy data
            console.log(
              'No orders found or Firebase failed, using dummy orders'
            );
            setOrders(dummyOrders);
            setUseDummyData(true);
          }
        }
      } catch (err) {
        console.error(
          `Error fetching ${activeTab} data, using dummy data:`,
          err
        );

        if (activeTab === 'orders') {
          console.log(
            'Setting dummy orders due to error:',
            dummyOrders.length,
            'orders'
          );
          setOrders(dummyOrders);
        }
        setUseDummyData(true);
      } finally {
        setIsLoading(false);
        console.log('fetchData completed for:', activeTab);
      }
    };

    fetchData();
  }, [activeTab]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.customerName.toLowerCase().includes(search) ||
          (order.address && order.address.toLowerCase().includes(search)) ||
          order.items.some((item) => item.name.toLowerCase().includes(search))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc'
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      }

      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.customerName.localeCompare(b.customerName)
          : b.customerName.localeCompare(a.customerName);
      }

      // sortField === 'total'
      return sortDirection === 'asc' ? a.total - b.total : b.total - a.total;
    });

    return result;
  }, [orders, searchTerm, sortField, sortDirection]);

  // Filter menu items
  const filteredMenuItems = useMemo(() => {
    if (!searchTerm) return menuItems;

    const search = searchTerm.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        (item.nameLocalLang &&
          item.nameLocalLang.toLowerCase().includes(search)) ||
        (item.description && item.description.toLowerCase().includes(search)) ||
        (item.category && item.category.toLowerCase().includes(search))
    );
  }, [menuItems, searchTerm]);

  // Handle sort toggle
  const handleSortClick = (field: 'date' | 'name' | 'total') => {
    if (field === sortField) {
      // Toggle direction if clicking the same field
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set new field with default desc direction
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle adding a new menu item
  const handleAddMenuItem = async () => {
    if (!newItem.name || !newItem.price) {
      alert('Please provide at least a name and price for the new item');
      return;
    }

    try {
      const itemToAdd = {
        ...newItem,
        price: Number(newItem.price),
      } as MenuItem;

      const addedItem = await addMenuItem(itemToAdd);
      setMenuItems((prev) => [...prev, addedItem]);

      // Reset the form
      setNewItem({
        name: '',
        nameLocalLang: '',
        price: 0,
        category: 'non-veg',
        description: '',
      });

      alert('Item added successfully!');
    } catch (err) {
      console.error('Error adding menu item:', err);
      alert('Failed to add item. Please try again.');
    }
  };

  // Handle updating a menu item
  const handleUpdateMenuItem = async () => {
    if (!editingItem) return;

    try {
      await updateMenuItem(editingItem);

      setMenuItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? editingItem : item))
      );

      setEditingItem(null);
      alert('Item updated successfully!');
    } catch (err) {
      console.error('Error updating menu item:', err);
      alert('Failed to update item. Please try again.');
    }
  };

  // Handle deleting a menu item
  const handleDeleteMenuItem = async (id: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this item? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await deleteMenuItem(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      alert('Item deleted successfully!');
    } catch (err) {
      console.error('Error deleting menu item:', err);
      alert('Failed to delete item. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle opening the WhatsApp modal
  const handleOpenWhatsAppModal = (order: Order) => {
    setSelectedOrder(order);
    setIsWhatsAppModalOpen(true);
  };

  // Handle closing the WhatsApp modal
  const handleCloseWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
    setSelectedOrder(null);
  };

  // Render the Orders tab content
  const renderOrdersTab = () => {
    console.log('Rendering orders tab:', {
      isLoading,
      error,
      ordersLength: orders.length,
      filteredOrdersLength: filteredOrders.length,
      useDummyData,
    });

    if (isLoading) {
      return <div className="loading">Loading orders...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (filteredOrders.length === 0) {
      return (
        <div className="no-orders">
          <p>No orders found</p>
          {useDummyData && <p>Using dummy data mode</p>}
          <p>Total orders in state: {orders.length}</p>
        </div>
      );
    }

    return (
      <div className="orders-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th onClick={() => handleSortClick('date')}>
                Date/Time
                {sortField === 'date' && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th onClick={() => handleSortClick('name')}>
                Customer
                {sortField === 'name' && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th>Delivery Method</th>
              <th>Items</th>
              <th onClick={() => handleSortClick('total')}>
                Total
                {sortField === 'total' && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{formatDate(order.createdAt)}</td>
                <td>
                  <strong>{order.customerName}</strong>
                  {order.deliveryMethod === 'delivery' && order.address && (
                    <div className="address">{order.address}</div>
                  )}
                </td>
                <td>
                  <span className={`delivery-badge ${order.deliveryMethod}`}>
                    {order.deliveryMethod === 'delivery'
                      ? 'Delivery'
                      : 'Pickup'}
                  </span>
                </td>
                <td>
                  <ul className="items-list">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity} × {item.name}
                        <span className="item-price">
                          ({formatPrice(item.price * item.quantity)})
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="total-cell">{formatPrice(order.total)}</td>
                <td>
                  <button
                    className="action-btn print-btn"
                    onClick={() => window.print()}
                    aria-label="Print order"
                    title="Print order"
                  >
                    🖨️
                  </button>
                  <button
                    className="action-btn whatsapp-btn"
                    onClick={() => handleOpenWhatsAppModal(order)}
                    aria-label="Send WhatsApp message"
                    title="Send WhatsApp message"
                  >
                    📱
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render the Menu Management tab content
  const renderMenuTab = () => {
    if (isLoading) {
      return <div className="loading">Loading menu items...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div className="menu-management">
        {/* Add New Item Form */}
        <div className="menu-item-form">
          <h3>Add New Menu Item</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="item-name">Name (English)</label>
              <input
                id="item-name"
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                placeholder="Item name in English"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item-name-local">Name (Sinhala)</label>
              <input
                id="item-name-local"
                type="text"
                value={newItem.nameLocalLang}
                onChange={(e) =>
                  setNewItem({ ...newItem, nameLocalLang: e.target.value })
                }
                placeholder="Item name in Sinhala"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item-price">Price ($)</label>
              <input
                id="item-price"
                type="number"
                min="0"
                step="0.01"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                }
                placeholder="Item price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item-category">Category</label>
              <select
                id="item-category"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    category: e.target.value as MenuItem['category'],
                  })
                }
              >
                <option value="non-veg">Non-Vegetarian</option>
                <option value="veg">Vegetarian</option>
                <option value="extras">Extras</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="item-description">Description (Optional)</label>
              <textarea
                id="item-description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                placeholder="Optional description"
                rows={2}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="item-image">Image URL (Optional)</label>
              <input
                id="item-image"
                type="text"
                value={newItem.imageUrl || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, imageUrl: e.target.value })
                }
                placeholder="URL to item image"
              />
            </div>
          </div>

          <button className="add-item-btn" onClick={handleAddMenuItem}>
            Add Menu Item
          </button>
        </div>

        {/* Menu Items List */}
        <div className="menu-items-list">
          <h3>Existing Menu Items</h3>

          {filteredMenuItems.length === 0 ? (
            <div className="no-items">No menu items found</div>
          ) : (
            <div className="menu-items-table-container">
              <table className="menu-items-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sinhala Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {editingItem?.id === item.id ? (
                          <input
                            type="text"
                            value={editingItem.name}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        {editingItem?.id === item.id ? (
                          <input
                            type="text"
                            value={editingItem.nameLocalLang || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                nameLocalLang: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.nameLocalLang || '-'
                        )}
                      </td>
                      <td>
                        {editingItem?.id === item.id ? (
                          <select
                            value={editingItem.category}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                category: e.target
                                  .value as MenuItem['category'],
                              })
                            }
                          >
                            <option value="non-veg">Non-Vegetarian</option>
                            <option value="veg">Vegetarian</option>
                            <option value="extras">Extras</option>
                            <option value="other">Other</option>
                          </select>
                        ) : (
                          <span className={`category-badge ${item.category}`}>
                            {item.category === 'non-veg'
                              ? 'Non-Veg'
                              : item.category === 'veg'
                              ? 'Vegetarian'
                              : item.category === 'extras'
                              ? 'Extras'
                              : 'Other'}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingItem?.id === item.id ? (
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editingItem.price}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                price: parseFloat(e.target.value),
                              })
                            }
                            style={{ width: '80px' }}
                          />
                        ) : (
                          formatPrice(item.price)
                        )}
                      </td>
                      <td>
                        {editingItem?.id === item.id ? (
                          <div className="edit-actions">
                            <button
                              className="save-btn"
                              onClick={handleUpdateMenuItem}
                            >
                              Save
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={() => setEditingItem(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="item-actions">
                            <button
                              className="edit-btn"
                              onClick={() => setEditingItem({ ...item })}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteMenuItem(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page">
      <header>
        <h1>Admin Dashboard</h1>

        {useDummyData && (
          <div className="dummy-data-notice">
            ⚠️ Using dummy data - Firebase not connected
          </div>
        )}

        {/* Debug button for testing */}
        <button
          onClick={() => {
            console.log('Manual dummy data load');
            setOrders(dummyOrders);
            setUseDummyData(true);
          }}
          style={{
            margin: '10px',
            padding: '5px 10px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Load Dummy Orders (Debug)
        </button>

        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search ${
              activeTab === 'orders' ? 'orders' : 'menu items'
            }...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu Management
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'orders' ? renderOrdersTab() : renderMenuTab()}
      </main>

      {/* WhatsApp message modal */}
      {isWhatsAppModalOpen && selectedOrder && (
        <>
          <div
            className="modal-overlay"
            onClick={handleCloseWhatsAppModal}
          ></div>
          <AdminWhatsAppMessages
            order={selectedOrder}
            onClose={handleCloseWhatsAppModal}
          />
        </>
      )}
    </div>
  );
}
