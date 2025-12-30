# College Event Management System - Deployment Guide

## Table of Contents
1. [Push to GitHub](#1-push-to-github)
2. [Database Hosting](#2-database-hosting)
3. [Backend Hosting](#3-backend-hosting)
4. [Frontend Hosting](#4-frontend-hosting)
5. [Environment Variables](#5-environment-variables)

---

## 1. Push to GitHub

### Step 1: Create .gitignore Files

**Backend .gitignore** (`backend/.gitignore`):
```
node_modules/
.env
*.log
```

**Frontend .gitignore** (`frontend/.gitignore`):
```
node_modules/
dist/
.env
.env.local
*.log
```

### Step 2: Initialize Git Repository

Open terminal in your project root directory:

```bash
cd "c:\Users\Kenguva Manibhaskar\OneDrive\Desktop\My Projects\college-event-management-system"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: College Event Management System"
```

### Step 3: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `college-event-management-system`
4. Description: "A full-stack event management system for colleges"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (you already have code)
7. Click **"Create repository"**

### Step 4: Push to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/college-event-management-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 2. Database Hosting

### Option A: Railway (Recommended - Free Tier Available)

1. **Sign up**: Go to [Railway.app](https://railway.app)
2. **Create New Project** → **Provision MySQL**
3. **Get Database Credentials**:
   - Click on MySQL service
   - Go to "Variables" tab
   - Copy: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`

4. **Connect to Database**:
   - Use MySQL Workbench or any MySQL client
   - Import your database schema

### Option B: PlanetScale (Free Tier)

1. **Sign up**: Go to [PlanetScale.com](https://planetscale.com)
2. **Create Database**: Click "New database"
3. **Get Connection String**: Click "Connect" → Copy connection details
4. **Import Schema**: Use their web console or CLI

### Option C: Aiven (Free Tier)

1. **Sign up**: Go to [Aiven.io](https://aiven.io)
2. **Create MySQL Service**
3. **Download CA Certificate**
4. **Get Connection Details**

---

## 3. Backend Hosting

### Option A: Render (Recommended - Free Tier)

1. **Sign up**: Go to [Render.com](https://render.com)
2. **New Web Service**:
   - Connect your GitHub repository
   - Select `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node

3. **Add Environment Variables**:
   ```
   DB_HOST=your-railway-mysql-host
   DB_USER=your-mysql-user
   DB_PASSWORD=your-mysql-password
   DB_NAME=your-database-name
   DB_PORT=3306
   JWT_SECRET=your-secret-key-here
   ```

4. **Deploy**: Click "Create Web Service"

### Option B: Railway

1. **New Project** → **Deploy from GitHub**
2. **Select Repository**
3. **Add Service** → **Select backend folder**
4. **Add Environment Variables** (same as above)
5. **Deploy**

### Option C: Heroku

1. **Install Heroku CLI**
2. **Create app**: `heroku create your-app-name`
3. **Set environment variables**: `heroku config:set DB_HOST=...`
4. **Deploy**: `git push heroku main`

---

## 4. Frontend Hosting

### Option A: Vercel (Recommended - Free)

1. **Sign up**: Go to [Vercel.com](https://vercel.com)
2. **Import Project**:
   - Click "Add New" → "Project"
   - Import from GitHub
   - Select your repository
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **IMPORTANT - Create vercel.json**:
   - Create `frontend/vercel.json` with the following content:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
   - This ensures all routes are handled by React Router (fixes 404 errors on page refresh/direct navigation)

5. **Deploy**: Click "Deploy"

### Option B: Netlify

1. **Sign up**: Go to [Netlify.com](https://netlify.com)
2. **New Site from Git**
3. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. **Environment Variables**: Add `VITE_API_URL`
5. **Deploy**

### Option C: GitHub Pages (Static Only)

1. Build your frontend: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

---

## 5. Environment Variables

### Backend Environment Variables

Create `backend/.env` file (for local development):

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_events
DB_PORT=3306

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000
```

**For Production**: Set these in your hosting platform (Render/Railway/Heroku)

### Frontend Environment Variables

Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

**For Production**: Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 6. Update Code for Production

### Backend: Update CORS Settings

Edit `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://your-frontend-url.vercel.app'
    ],
    credentials: true
}));
```

### Frontend: Update API Base URL

Edit `frontend/src/services/api.js`:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

// ... rest of the code
```

---

## 7. Database Migration

### Export Your Local Database

```bash
# In MySQL Workbench or command line
mysqldump -u root -p college_events > college_events_backup.sql
```

### Import to Production Database

**Using Railway/PlanetScale CLI**:
```bash
mysql -h your-host -u your-user -p your-database < college_events_backup.sql
```

**Or use MySQL Workbench**:
1. Connect to production database
2. File → Run SQL Script
3. Select `college_events_backup.sql`

---

## 8. Testing Deployment

1. **Test Backend**:
   ```bash
   curl https://your-backend-url.onrender.com/
   ```

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try logging in
   - Create an event
   - Register for an event

3. **Check Database**:
   - Verify data is being saved
   - Check registrations table

---

## 9. Recommended Free Hosting Combination

**Best Free Setup**:
- **Database**: Railway MySQL (Free 500MB)
- **Backend**: Render (Free tier)
- **Frontend**: Vercel (Free unlimited)

**Pros**:
- All free tiers
- Easy deployment
- Auto-deploy on git push
- Good performance

---

## 10. Post-Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Database hosted and accessible
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Database migrated
- [ ] Test login functionality
- [ ] Test event creation
- [ ] Test event registration
- [ ] Test admin dashboard
- [ ] Test student dashboard

---

## Need Help?

If you encounter issues:
1. Check deployment logs in your hosting platform
2. Verify environment variables are set correctly
3. Test database connection
4. Check CORS settings
5. Verify API URLs in frontend

---

## Quick Start Commands

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/college-event-management-system.git
git push -u origin main

# 2. Deploy Backend (Render will auto-deploy from GitHub)

# 3. Deploy Frontend (Vercel will auto-deploy from GitHub)

# 4. Update frontend API URL
# Edit frontend/.env.production with your backend URL
```

Good luck with your deployment! 🚀
