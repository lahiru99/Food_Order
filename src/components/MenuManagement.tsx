import { useState, useEffect } from 'react';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/whatsapp';
import { getMenu, saveMenuItem, deleteMenuItem, publishMenu } from '../services/firebase';

interface MenuItemFormData {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  imageFile: File | null;
}

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItemFormData>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    imageFile: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [orderDeadline, setOrderDeadline] = useState<string>("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const fetchedMenu = await getMenu();
      setMenuItems(fetchedMenu);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      // Convert price to number and handle validation
      const numberValue = parseFloat(value) || 0;
      setCurrentItem(prev => ({ ...prev, [name]: numberValue }));
    } else {
      setCurrentItem(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentItem(prev => ({ ...prev, imageFile: file }));
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setCurrentItem({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      imageFile: null
    });
    setPreviewUrl(item.imageUrl || null);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentItem({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      imageFile: null
    });
    setPreviewUrl(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentItem({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      imageFile: null
    });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentItem.name || currentItem.price <= 0) {
      setError('Name and price are required');
      return;
    }
    
    try {
      setIsUploading(true);
      
      await saveMenuItem({
        id: currentItem.id,
        name: currentItem.name,
        price: currentItem.price,
        description: currentItem.description,
        imageUrl: currentItem.imageUrl,
        imageFile: currentItem.imageFile
      });
      
      setIsEditing(false);
      fetchMenu();
      setError(null);
    } catch (err) {
      console.error('Error saving menu item:', err);
      setError('Failed to save menu item');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(id);
        fetchMenu();
      } catch (err) {
        console.error('Error deleting menu item:', err);
        setError('Failed to delete menu item');
      }
    }
  };

  const handlePublishMenu = async () => {
    try {
      setIsGeneratingMessage(true);
      const whatsappLink = await publishMenu(menuItems, orderDeadline);
      window.open(whatsappLink, '_blank');
    } catch (err) {
      console.error('Error publishing menu:', err);
      setError('Failed to generate WhatsApp message');
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="menu-management">
      <div className="menu-management-header">
        <h2>Menu Management</h2>
        {!isEditing && (
          <button 
            className="add-item-btn"
            onClick={handleAddNew}
          >
            + Add New Item
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="menu-item-form">
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentItem.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={currentItem.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={currentItem.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe this dish (ingredients, preparation, etc.)"
            />
            <div className="special-dish-checkbox">
              <input
                type="checkbox"
                id="special"
                name="special"
                checked={currentItem.description?.toLowerCase().includes('special') || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setCurrentItem(prev => ({
                    ...prev,
                    description: isChecked 
                      ? prev.description.includes('special') 
                        ? prev.description 
                        : `${prev.description} (Special dish)`
                      : prev.description.replace(/\s*\(Special dish\)/gi, '')
                  }));
                }}
              />
              <label htmlFor="special">
                Mark as a special dish (will be highlighted with a star ⭐)
              </label>
              <div className="special-dish-info">
                <p>Special dishes with images will be featured prominently at the top of the menu in a carousel.</p>
                <p>For best results, use high-quality landscape images (16:9 ratio).</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Item Image</label>
            <div className="image-upload">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="file-input"
              />
              <div className="image-upload-label">
                <span>
                  {currentItem.imageFile ? currentItem.imageFile.name : 'Choose an image for this dish'}
                </span>
                <button type="button" className="upload-btn">Browse</button>
              </div>
            </div>
            <small className="image-help">
              Adding appealing photos helps customers choose dishes. Recommended size: 800x600px.
            </small>
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={isUploading}
            >
              {isUploading ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>
      ) : (
        <>
          {menuItems.length === 0 ? (
            <div className="no-items">No menu items added yet</div>
          ) : (
            <>
              <div className="menu-items-grid">
                {menuItems.map(item => (
                  <div className="menu-item-card admin" key={item.id}>
                    {item.imageUrl && (
                      <div className="item-image">
                        <img src={item.imageUrl} alt={item.name} />
                      </div>
                    )}
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="price">{formatPrice(item.price)}</p>
                      {item.description && <p className="description">{item.description}</p>}
                    </div>
                    <div className="item-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditItem(item)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="publish-section">
                <div className="deadline-input">
                  <label htmlFor="orderDeadline">Order Deadline</label>
                  <input
                    type="datetime-local"
                    id="orderDeadline"
                    value={orderDeadline}
                    onChange={(e) => setOrderDeadline(e.target.value)}
                    className="deadline-picker"
                  />
                  <small>Set a deadline for customers to place their orders</small>
                </div>
                <button 
                  className="publish-btn"
                  onClick={handlePublishMenu}
                  disabled={isGeneratingMessage}
                >
                  {isGeneratingMessage ? 'Generating...' : 'Publish Menu to WhatsApp'}
                </button>
                <p className="publish-info">
                  This will create a WhatsApp message with your menu items and images
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
} 