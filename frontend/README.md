# College Event Management System (Frontend)

A modern, responsive frontend for the college event management system built with React and Material-UI. Features role-based dashboards for admins and students with secure authentication.

## Features
- **User Authentication**: Secure login and registration with JWT
- **Role-Based Dashboards**:
  - Admin: Create and manage events, view statistics
  - Student: Browse events, register for events, view registrations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Material-UI components and custom styling

## Tech Stack
- React 18
- Vite (Build tool)
- Material-UI (MUI)
- React Router DOM
- Axios (HTTP client)
- JWT for authentication

## Project Structure
```
src/
├── components/       # Reusable components (Navbar, Sidebar)
├── pages/           # Page components (Login, Dashboards, Events)
├── App.jsx          # Main app component with routing
└── main.jsx         # Application entry point
```

## How to Run Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file** (optional)
   
   Create a `.env` file if you need to configure the backend URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Environment Variables
- `VITE_API_URL` - Backend API URL (defaults to http://localhost:5000)

## Key Features Implementation
- **Protected Routes**: Role-based access control for admin and student pages
- **Token Management**: JWT tokens stored in localStorage
- **API Integration**: Axios interceptors for authentication headers
- **Responsive Layout**: Mobile-first design with Material-UI Grid system
