# College Event Management System

A full-stack web application for managing college events with role-based access control, real-time statistics, and secure authentication.

## 🌟 Features

### Admin Features
- **Dashboard**: View real-time statistics (total events, total registrations)
- **Event Management**: Create, edit, and delete events
- **Event Monitoring**: Track registrations for each event

### Student Features
- **Browse Events**: View all available college events with search functionality
- **Event Registration**: Register for events with one click
- **My Registrations**: Track all registered events
- **Recent Events Dashboard**: View the 3 most recent events

### Security & Authentication
- JWT-based authentication
- Role-based access control (Admin/Student)
- Protected routes and API endpoints
- Secure password hashing with bcryptjs

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Material-UI (MUI)
- Axios for API calls
- React Router for navigation

**Backend:**
- Node.js + Express
- MySQL database
- JWT authentication
- bcryptjs for password hashing

## 📁 Project Structure

```
college-event-management-system/
├── backend/                 # Node.js + Express backend
│   ├── middleware/         # Authentication middleware
│   ├── routes/            # API routes (auth, events)
│   ├── db.js              # MySQL connection
│   └── server.js          # Express server
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, Sidebar)
│   │   ├── pages/         # Page components (Dashboard, Events, etc.)
│   │   ├── services/      # API service layer
│   │   └── utils/         # Utility functions
│   └── public/
├── DEPLOYMENT_GUIDE.md    # Detailed deployment instructions
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/manibhaskar29/college-event-management-system.git
   cd college-event-management-system
   ```

2. **Setup Database**
   - Create a MySQL database named `college_events`
   - Run the SQL schema to create tables (users, events, registrations)

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with:
   # DB_HOST=localhost
   # DB_USER=root
   # DB_PASSWORD=your_password
   # DB_NAME=college_events
   # JWT_SECRET=your_secret_key
   
   node server.js
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

See [backend/README.md](./backend/README.md) for detailed API documentation.

## 🌐 Deployment

For detailed deployment instructions including:
- Pushing to GitHub
- Database hosting (Railway, PlanetScale, Aiven)
- Backend hosting (Render, Railway, Heroku)
- Frontend hosting (Vercel, Netlify)

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

## 🎯 Key Features Implemented

- ✅ Real-time dashboard statistics
- ✅ Event CRUD operations (Admin only)
- ✅ Student event registration with duplicate prevention
- ✅ Registration tracking and management
- ✅ Responsive UI with Material-UI
- ✅ Protected routes with role-based access
- ✅ Search and filter events
- ✅ Recent events display (3 most recent)

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API endpoints with middleware
- Role-based authorization (Admin/Student)
- CORS configuration
- SQL injection prevention

## 📝 Database Schema

**Users Table:**
- id, name, email, password (hashed), role (admin/student)

**Events Table:**
- id, title, description, event_date, created_by (user_id)

**Registrations Table:**
- id, user_id, event_id, registered_at
- Unique constraint on (user_id, event_id) to prevent duplicates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kenguva Manibhaskar**
- GitHub: [@manibhaskar29](https://github.com/manibhaskar29)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- React team for the amazing framework
- Express.js for the robust backend framework
