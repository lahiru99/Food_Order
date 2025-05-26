import { useNavigate } from 'react-router-dom';

export function SuccessPage() {
  const navigate = useNavigate();
  
  return (
    <div className="success-page">
      <div className="success-content">
        <h1>Order Submitted Successfully!</h1>
        
        <p>
          Thank you for your order. We have received your information and will prepare your meal with care.
        </p>
        
        <p>
          A confirmation message has been sent via WhatsApp. You can reply to that message if you need to make any changes to your order.
        </p>
        
        <p>
          We appreciate your business and look forward to serving you!
        </p>
        
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
} 