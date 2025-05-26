import { useState, useEffect } from 'react';
import type { Order } from '../types';
import { getOrders, getOrderSettings } from '../services/firebase';
import { formatPrice } from '../utils/whatsapp';
import { MenuManagement } from '../components/MenuManagement';
import { DummyDataInitializer } from '../components/DummyDataInitializer';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Order>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState('');
  const [orderDeadline, setOrderDeadline] = useState<Date | null>(null);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
      fetchOrderSettings();
    }
    
    // Set up an interval to check if the deadline has passed
    const intervalId = setInterval(() => {
      if (orderDeadline) {
        const now = new Date();
        setIsDeadlinePassed(now > orderDeadline);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [activeTab]);
  
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchOrderSettings = async () => {
    try {
      const settings = await getOrderSettings();
      if (settings.orderDeadline) {
        setOrderDeadline(settings.orderDeadline);
        
        // Check if deadline has passed
        const now = new Date();
        setIsDeadlinePassed(now > settings.orderDeadline);
      }
    } catch (err) {
      console.error('Error fetching order settings:', err);
    }
  };
  
  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredOrders = orders.filter(order => {
    const searchTerm = filter.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(searchTerm) ||
      order.deliveryMethod.toLowerCase().includes(searchTerm) ||
      (order.address && order.address.toLowerCase().includes(searchTerm))
    );
  });
  
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === 'asc' 
        ? fieldA.getTime() - fieldB.getTime() 
        : fieldB.getTime() - fieldA.getTime();
    }
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }
    
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    }
    
    return 0;
  });
  
  const formatDeadline = (date: Date): string => {
    return date.toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const exportOrdersToCSV = () => {
    // CSV headers
    const headers = [
      'Customer Name',
      'Delivery Method',
      'Address',
      'Items',
      'Total',
      'Date'
    ];
    
    // Format order data for CSV
    const orderData = sortedOrders.map(order => [
      order.customerName,
      order.deliveryMethod,
      order.address || 'N/A',
      order.items.map(item => `${item.name} x${item.quantity}`).join('; '),
      formatPrice(order.total),
      order.createdAt.toLocaleString()
    ]);
    
    // Combine headers and data
    const csvContent = [
      headers.join(','),
      ...orderData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up file name with date
    const date = new Date();
    const fileName = `orders_${date.toISOString().split('T')[0]}.csv`;
    
    // Trigger download
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="admin-page">
      <header className="header">
        <h1>Admin Dashboard</h1>
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
        {activeTab === 'orders' ? (
          <div className="orders-tab">
            <div className="orders-header">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              
              <div className="orders-actions">
                <button 
                  className="refresh-btn"
                  onClick={fetchOrders}
                  title="Refresh orders"
                >
                  🔄 Refresh
                </button>
                
                <button 
                  className="export-btn"
                  onClick={exportOrdersToCSV}
                  disabled={sortedOrders.length === 0}
                  title="Export orders to CSV"
                >
                  📊 Export to CSV
                </button>
              </div>
            </div>
            
            {orderDeadline && (
              <div className={`admin-deadline ${isDeadlinePassed ? 'passed' : ''}`}>
                <span className="admin-deadline-label">Order Deadline:</span>
                <span className="admin-deadline-time">{formatDeadline(orderDeadline)}</span>
                {isDeadlinePassed ? (
                  <span className="admin-deadline-status passed">Closed</span>
                ) : (
                  <span className="admin-deadline-status active">Active</span>
                )}
              </div>
            )}
            
            {isLoading ? (
              <div className="loading">Loading orders...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : sortedOrders.length === 0 ? (
              <div className="no-orders">No orders found</div>
            ) : (
              <>
                <div className="orders-summary">
                  <div className="summary-card">
                    <div className="summary-title">Total Orders</div>
                    <div className="summary-value">{sortedOrders.length}</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-title">Delivery Orders</div>
                    <div className="summary-value">
                      {sortedOrders.filter(order => order.deliveryMethod === 'delivery').length}
                    </div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-title">Pickup Orders</div>
                    <div className="summary-value">
                      {sortedOrders.filter(order => order.deliveryMethod === 'pickup').length}
                    </div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-title">Total Revenue</div>
                    <div className="summary-value">
                      {formatPrice(sortedOrders.reduce((sum, order) => sum + order.total, 0))}
                    </div>
                  </div>
                </div>
              
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('customerName')}>
                        Customer Name
                        {sortField === 'customerName' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th onClick={() => handleSort('deliveryMethod')}>
                        Delivery Method
                        {sortField === 'deliveryMethod' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th>Address</th>
                      <th>Items</th>
                      <th onClick={() => handleSort('total')}>
                        Total
                        {sortField === 'total' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th onClick={() => handleSort('createdAt')}>
                        Date
                        {sortField === 'createdAt' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.customerName}</td>
                        <td>{order.deliveryMethod}</td>
                        <td>{order.address || 'N/A'}</td>
                        <td>
                          <ul className="items-list">
                            {order.items.map((item) => (
                              <li key={item.id}>
                                {item.name} x{item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>{formatPrice(order.total)}</td>
                        <td>{order.createdAt.toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="send-whatsapp-btn"
                            onClick={() => {
                              // Format order details for WhatsApp
                              const orderItems = order.items.map(item => 
                                `${item.name} x${item.quantity}`
                              ).join('\n');
                              
                              const message = `Order confirmation:\n\n${orderItems}\n\nTotal: ${formatPrice(order.total)}\nDelivery: ${order.deliveryMethod}${order.address ? `\nAddress: ${order.address}` : ''}`;
                              
                              // Open WhatsApp with order confirmation
                              window.open(`https://wa.me/${order.customerName.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                          >
                            Send WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ) : (
          <div className="menu-tab">
            <DummyDataInitializer />
            <MenuManagement />
          </div>
        )}
      </main>
    </div>
  );
} 