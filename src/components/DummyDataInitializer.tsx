import { useState } from 'react';
import { initializeWithDummyData } from '../services/firebase';

export function DummyDataInitializer() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInitializeDummyData = async () => {
    try {
      setIsInitializing(true);
      setIsSuccess(false);
      setError(null);
      
      await initializeWithDummyData();
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000); // Clear success message after 3 seconds
    } catch (err) {
      console.error('Error initializing dummy data:', err);
      setError('Failed to initialize dummy data. Please check the console for details.');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="dummy-data-initializer">
      <button 
        className="initialize-btn"
        onClick={handleInitializeDummyData}
        disabled={isInitializing}
      >
        {isInitializing ? 'Initializing...' : 'Initialize with Dummy Data'}
      </button>
      
      {isSuccess && (
        <div className="success-message">
          Dummy data initialized successfully! Refresh the page to see the changes.
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <p className="initialize-info">
        This will replace all menu items with sample data and set a demo order deadline.
      </p>
    </div>
  );
} 