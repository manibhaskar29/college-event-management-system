# 🔧 Render Environment Variables Setup

## ⚠️ CRITICAL: Database Error Fix

You're getting "Database error" because Render can't connect to Railway.

## ✅ Required Environment Variables for Render

Go to **Render Dashboard** → **college-event-management-system** → **Environment** tab

Add these **EXACT** variables:

### Database Configuration (from Railway)

```
DB_HOST=tramway.proxy.rlwy.net
DB_PORT=57003
DB_USER=root
DB_PASSWORD=jWHKAtpQsdiinZkoXMYFiwvqJmcLnDIU
DB_NAME=railway
```

### JWT Secret

```
JWT_SECRET=college-events-super-secret-jwt-key-2025
```

---

## 📋 Step-by-Step Instructions

### 1. Go to Render Environment Variables

1. Open [Render Dashboard](https://dashboard.render.com/)
2. Click on **college-event-management-system** service
3. Click **Environment** in the left sidebar
4. Scroll down to **Environment Variables** section

## 🔍 Troubleshooting

### If you still see "Database connection failed" in logs:

**Check Railway Database Status:**
1. Go to Railway dashboard
2. Make sure MySQL service is running (green status)
3. Check if the database is not paused/suspended

**Verify Railway Credentials:**
1. Railway → MySQL service → Variables tab
2. Copy the exact values:
   - `MYSQL_HOST` → Use as `DB_HOST`
   - `MYSQL_PORT` → Use as `DB_PORT`
   - `MYSQL_USER` → Use as `DB_USER`
   - `MYSQL_PASSWORD` → Use as `DB_PASSWORD`
   - `MYSQL_DATABASE` → Use as `DB_NAME`

**Check Railway Network Access:**
- Railway free tier should allow external connections
- Make sure your Railway project is not expired/deleted

---

## 🎯 After Adding Variables

### Expected Render Logs:

```
Server running on port 10000
MySQL Connected successfully!
```

### Test Backend:

Open in browser:
```
https://college-event-management-system-isen.onrender.com/
```

Should show: **"server is running + DB Connected"**

### Test Registration:

1. Go to your Vercel frontend
2. Try to register a new user
3. Should work now! ✅

---

## 📸 Screenshot Checklist

Your Render Environment Variables should look like this:

```
DB_HOST          tramway.proxy.rlwy.net
DB_PORT          57003
DB_USER          root
DB_PASSWORD      •••••••••••••••••••••••••••••
DB_NAME          railway
JWT_SECRET       •••••••••••••••••••••••••••••
```

---

## ⏰ Timeline

1. **Now:** Add all 6 environment variables to Render
2. **Click Save:** Render starts redeploying
3. **Wait 2-3 min:** Deployment completes
4. **Check Logs:** Should see "MySQL Connected successfully!"
5. **Test:** Try registration on your Vercel site

---

## 🆘 Still Not Working?

Send me:
1. Screenshot of Render Environment Variables page
2. Screenshot of Render Logs (after deployment completes)
3. Screenshot of Railway MySQL Variables page

I'll help you debug further!
