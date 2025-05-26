# Food Order App

A React application for weekly food ordering with WhatsApp integration.

## Features

- Weekly menu display
- Item quantity selection
- Customer information form
- Pickup or delivery options
- Order submission to Firebase
- WhatsApp message generation
- Admin dashboard for order management

## Technology Stack

- React + Vite
- TypeScript
- Firebase Firestore
- React Router

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd food-order-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Update the WhatsApp number in `src/pages/MenuPage.tsx`:
```typescript
const WHATSAPP_NUMBER = '1234567890'; // Replace with your actual number
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Main application pages
- `src/services`: Firebase and external service integrations
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions and helpers

## Pages

- `/menu`: Customer ordering page
- `/admin`: Admin dashboard for order management
- `/success`: Order confirmation page

## ESLint Configuration

This project uses the default ESLint configuration provided by Vite. For more information on extending the ESLint configuration, please refer to the Vite documentation.

## License

MIT

## Admin Features

The admin dashboard now includes enhanced features to make weekly menu management easier:

### Menu Management
- **Upload Images**: Add photos of menu items directly through the admin interface
- **Edit Menu Items**: Add, edit, or delete menu items with names, prices, and descriptions
- **Set Order Deadlines**: Specify when orders must be placed by
- **Publish to WhatsApp**: Generate a WhatsApp message with the complete menu to share with customers

### Order Management
- **View Orders**: See all customer orders with their details
- **Order Summaries**: View total orders, delivery/pickup counts, and revenue at a glance
- **Sort and Filter**: Organize orders by date, name, or delivery method
- **Export to CSV**: Download order data for offline processing or printing
- **Send Confirmations**: Send WhatsApp confirmations to customers with a single click

### Special Dishes Showcase
- **Featured Carousel**: Special dishes with images are displayed prominently at the top of the customer menu
- **Special Dish Marking**: Easily mark items as "special" with the checkbox
- **WhatsApp Integration**: Special dishes are highlighted in the WhatsApp menu message

### Setup
1. Make sure your Firebase project has both Firestore Database and Storage enabled
2. Add your WhatsApp business number to the .env file:
```
VITE_WHATSAPP_NUMBER=1234567890
```
3. Access the admin panel at `/admin`

## Workflow

1. **Admin Setup**:
   - Add menu items with photos
   - Mark special dishes with the checkbox
   - Set an order deadline
   - Publish the menu to WhatsApp with a link to the website

2. **Customer Ordering**:
   - Customers visit the website and view the menu with featured special dishes
   - They select items, quantities, and provide delivery information
   - Orders are saved to Firestore and a confirmation is sent via WhatsApp

3. **Order Management**:
   - Admin views all orders in the dashboard
   - Orders can be sorted, filtered, and exported to CSV
   - Admin can send WhatsApp confirmations to customers
   - After the deadline passes, ordering is automatically disabled
