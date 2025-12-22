# College Event Management System (Backend)
A backend system for managing college events with role-based access, secure authentication and student registrations.
This project demonstrates real-world backend concepts like authentication, authorization, database design and data integrity.


## Features
 - User registration and login using JWT authentication
 - Role-based access control:
    - Admin: create events
    - Student: register for events
 - Secure protected APIs using middleware
 - Event registration with duplicate prevention
 - Clean database design with proper relationships 


## Tech Stack
 - Node.js
 - Express.js
 - MySQL
 - JWT (JSON Web Tokens)
 - bcrypt for password hashing


## Authentication and Authorization
 - JWT-based stateless authentication
 - Token sent via Authorization: Bearer <token>
 - Middleware-based access control
 - Role validation for admin and student routes


## Database Design
Users
 - id, name, email, password, role

Events
 - id, title, description, event_date, created_by

Registrations
 - id, user_id, event_id, registered_at
 - Unique constraint on (user_id, event_id)


## API Endpoints
Auth
 - POST /api/auth/register
 - POST /api/auth/login

Events
 - POST /api/events (Admin only)
 - GET /api/events (Authenticated users)

Registrations
 - POST /api/events/register (Student only)


## How to Run Locally
1. Clone the repository

2. Install dependencies
    - npm install

3. Create a .env file
   - JWT_SECRET=your_secret_key

4. Setup MySQL database and tables

5. Start the server
    - nodemon server.js


## Learning Outcomes
 - Implemented JWT authentication and role-based authorization
 - Designed normalized relational database schema
 - Prevented race conditions using database constraints
 - Built secure and scalable backend APIs