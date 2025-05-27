# Sri Lankan Food Ordering App 🍛

A comprehensive, mobile-first React application for weekly Sri Lankan food ordering with bilingual support, package deals, and admin management features.

## 🌟 Key Features

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile devices with touch-friendly interfaces
- **Bottom Navigation**: Mobile navigation bar with Menu and Cart buttons
- **Floating Cart Modal**: Bottom sheet-style cart with smooth animations
- **Auto-Navigation**: Automatic scroll to checkout when proceeding from cart
- **Safe Area Support**: Proper handling of notched phones and screen insets
- **Clean White Theme**: Pure white background throughout for modern aesthetics

### 🍽️ Package System
- **Standard Package ($50)**: 1 Non-veg + 3 Veg dishes with poppadoms
- **Premium Package ($55)**: 2 Non-veg + 2 Veg dishes with poppadoms
- **Interactive Selection**: Visual dish selection interface for packages
- **Individual Ordering**: Option to build custom meals outside packages
- **Package Validation**: Ensures correct number of dishes selected

### 🌐 Bilingual Support
- **English + Sinhala**: All menu items display both languages
- **Local Names**: Authentic Sinhala names for traditional dishes
- **Cultural Authenticity**: Proper representation of Sri Lankan cuisine

### 🛒 Enhanced Cart Experience
- **Mobile Cart Modal**: Full-screen cart with detailed item information
- **Item Details**: Shows local names, unit prices, and total prices
- **Quantity Management**: Easy increment/decrement with visual feedback
- **Cart Badge**: Real-time item count display
- **Remove Items**: Touch-friendly remove buttons

### 👨‍💼 Admin Dashboard
- **Order Management**: View, sort, and filter all customer orders
- **Menu Management**: Add, edit, delete menu items with image uploads
- **WhatsApp Integration**: Send order confirmations and updates
- **Dummy Data System**: Built-in test data for development
- **Order Statistics**: Real-time order counts and revenue tracking

### 📱 WhatsApp Integration
- **Admin Messaging**: Pre-made message templates for order updates
- **Order Confirmation**: "Your order has been confirmed"
- **Ready for Pickup**: "Your order is ready for pickup"
- **Delivery Updates**: "Your order is on the way"
- **Custom Messages**: Flexible messaging system
- **Free Integration**: Uses wa.me URLs (no API costs)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS3 with CSS Custom Properties
- **Routing**: React Router v6
- **Backend**: Firebase Firestore
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Build Tool**: Vite with HMR
- **Type Safety**: Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd Food_Order
```

2. **Install dependencies**:
```bash
npm install
```

3. **Environment Setup**:
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_WHATSAPP_NUMBER=your_whatsapp_number
```

4. **Start development server**:
```bash
npm run dev
```

5. **Access the application**:
- Customer Menu: `http://localhost:5174/`
- Admin Dashboard: `http://localhost:5174/admin`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── MenuListView.tsx     # Main menu display with bilingual support
│   ├── PackageSelector.tsx  # Package selection interface
│   ├── MobileCartModal.tsx  # Mobile cart bottom sheet
│   ├── MobileNavigation.tsx # Bottom navigation bar
│   ├── OrderSummary.tsx     # Order summary and checkout
│   ├── CustomerForm.tsx     # Customer information form
│   └── AdminWhatsAppMessages.tsx # Admin WhatsApp messaging
├── pages/               # Main application pages
│   ├── MenuPage.tsx        # Customer ordering interface
│   ├── AdminPage.tsx       # Admin dashboard
│   └── SuccessPage.tsx     # Order confirmation
├── services/            # External service integrations
│   └── firebase.ts         # Firebase Firestore operations
├── styles/              # Component-specific styles
│   └── MobileCartModal.css # Mobile cart styling
├── types/               # TypeScript type definitions
│   └── index.ts            # Application interfaces
├── utils/               # Utility functions
│   ├── dummy-data.ts       # Test data for development
│   └── whatsapp.ts         # WhatsApp message formatting
├── index.css            # Global styles and CSS variables
└── App.tsx              # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#4CAF50` - Main brand color
- **Primary Dark**: `#2E7D32` - Darker green for emphasis
- **Secondary Orange**: `#FF9800` - Accent color for prices
- **Pure White**: `#FFFFFF` - Clean background throughout
- **Text Colors**: Various grays for hierarchy

### Typography
- **System Fonts**: -apple-system, BlinkMacSystemFont, Segoe UI
- **Font Sizes**: Responsive scaling from 14px to 24px
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing System
- **Base Unit**: 8px
- **Touch Targets**: Minimum 44px for mobile accessibility
- **Padding**: 8px, 16px, 24px, 32px increments
- **Margins**: Consistent vertical rhythm

## 📱 Mobile Features

### Bottom Navigation
- **Menu Button**: Navigate to menu section
- **Cart Button**: Open cart modal with item count badge
- **Admin Access**: Hidden on mobile for customer focus

### Cart Modal
- **Bottom Sheet Design**: Slides up from bottom
- **Detailed Item View**: Local names, prices, quantities
- **Touch-Friendly Controls**: Large buttons and touch targets
- **Smooth Animations**: CSS transitions for professional feel

### Auto-Navigation
- **Smart Scrolling**: Automatic navigation to checkout
- **Mobile Checkout**: Full-screen checkout with back button
- **Section Awareness**: Context-aware navigation

## 🍛 Menu System

### Package Deals
```typescript
Standard Package ($50):
- 1 Non-vegetarian dish
- 3 Vegetarian dishes
- Poppadoms included

Premium Package ($55):
- 2 Non-vegetarian dishes
- 2 Vegetarian dishes
- Poppadoms included
```

### Menu Categories
- **Non-Vegetarian**: Meat and fish curries
- **Vegetarian**: Vegetable dishes and dal
- **Extras**: Additional items and desserts

### Bilingual Display
- **Primary**: English names for accessibility
- **Secondary**: Sinhala names for authenticity
- **Visual Separator**: Subtle divider between languages

## 👨‍💼 Admin Features

### Order Management
- **Real-time Orders**: Live order tracking and management
- **Order Details**: Customer info, items, delivery method
- **Status Updates**: Order confirmation and progress tracking
- **Dummy Data**: Built-in test orders for development

### WhatsApp Messaging
- **Message Templates**: Pre-made professional messages
- **Order Confirmation**: Automated confirmation messages
- **Status Updates**: Ready for pickup, delivery notifications
- **Custom Messages**: Flexible messaging for special cases

### Menu Management
- **Add/Edit Items**: Full CRUD operations for menu items
- **Image Support**: Upload and manage item images
- **Category Management**: Organize items by type
- **Price Management**: Easy price updates

## 🔧 Development Features

### Dummy Data System
- **Realistic Test Data**: 5 sample orders with Australian details
- **Menu Items**: Complete Sri Lankan menu with prices
- **Fallback Logic**: Automatic fallback when Firebase unavailable
- **Development Mode**: Easy testing without backend setup

### Error Handling
- **Graceful Degradation**: App works without Firebase
- **User Feedback**: Clear error messages and loading states
- **Fallback Data**: Dummy data when services unavailable

### Performance Optimizations
- **Mobile-First CSS**: Efficient mobile rendering
- **Lazy Loading**: Components loaded as needed
- **Optimized Images**: Proper image handling and sizing
- **Minimal Dependencies**: Lightweight bundle size

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment Variables
Ensure all Firebase configuration variables are set in production environment.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Mobile responsiveness on various screen sizes
- [ ] Package selection and validation
- [ ] Cart functionality and item management
- [ ] Order submission and confirmation
- [ ] Admin dashboard operations
- [ ] WhatsApp integration
- [ ] Bilingual display accuracy

## 🔮 Future Enhancements

### Planned Features
- **Payment Integration**: Stripe or PayPal integration
- **Order Tracking**: Real-time order status updates
- **Customer Accounts**: User registration and order history
- **Inventory Management**: Stock tracking and availability
- **Analytics Dashboard**: Order analytics and reporting
- **Push Notifications**: Order updates via web push
- **Multi-language**: Additional language support

### Technical Improvements
- **PWA Support**: Progressive Web App capabilities
- **Offline Mode**: Offline ordering with sync
- **Performance Monitoring**: Real-time performance tracking
- **Automated Testing**: Unit and integration tests
- **CI/CD Pipeline**: Automated deployment

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

## 📞 Support

For support or questions about this application, please contact the development team.

---

**Built with ❤️ for the Sri Lankan food community**
