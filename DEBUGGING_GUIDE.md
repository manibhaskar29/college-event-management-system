# 🔍 Registration Debugging Checklist

## Issue: Registration Still Failing

You have:
- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Render
- ✅ Database on Railway
- ✅ Environment variable added to Vercel
- ❌ Registration still fails

## 🚨 Most Likely Issues

### Issue #1: Missing `/api` in Vercel Environment Variable ⚠️

**Current Value (WRONG):**
```
VITE_API_URL = https://college-event-management-system-isen.onrender.com
```

**Should Be (CORRECT):**
```
VITE_API_URL = https://college-event-management-system-isen.onrender.com/api
```

**Fix:**
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Edit `VITE_API_URL`
3. Change value to: `https://college-event-management-system-isen.onrender.com/api`
4. **IMPORTANT:** Add `/api` at the end!
5. Save
6. Go to Deployments → Click "..." → Redeploy

---

### Issue #2: Render Environment Variables Not Set

Check if you added ALL these environment variables to Render:

**Go to Render → Your Service → Environment → Add Environment Variables:**

```
DB_HOST=tramway.proxy.rlwy.net
DB_PORT=57003
DB_USER=root
DB_PASSWORD=jWHKAtpQsdiinZkoXMYFiwvqJmcLnDIU
DB_NAME=railway
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**After adding, click "Save Changes" and Render will auto-redeploy**

---

### Issue #3: CORS Mismatch

Your backend CORS is configured for:
```
https://college-event-management-system-wheat.vercel.app
```

But your actual Vercel URL might be different!

**Check your actual Vercel URL:**
1. Go to Vercel Dashboard
2. Copy your deployment URL
3. Update `backend/server.js` line 13 with the correct URL

---

### Issue #4: Database Connection Failed

The backend might not be connecting to Railway database.

**Check Render Logs:**
1. Go to Render → Your Service → Logs
2. Look for:
   - ✅ "MySQL Connected" (good!)
   - ❌ "Database connection failed" (bad!)

If you see connection failed, verify Railway database credentials.

---

## 🔧 Step-by-Step Fix

### Step 1: Fix Vercel Environment Variable

1. **Vercel Dashboard** → college-event-management-system → **Settings** → **Environment Variables**
2. Click **Edit** on `VITE_API_URL`
3. Change to: `https://college-event-management-system-isen.onrender.com/api`
4. Click **Save**
5. Go to **Deployments** tab
6. Click **"..."** on latest deployment → **Redeploy**

### Step 2: Verify Render Environment Variables

1. **Render Dashboard** → college-event-management-system → **Environment**
2. Make sure you have ALL these variables:
   - `DB_HOST`
   - `DB_PORT` (should be 57003)
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET`
3. If missing any, add them and save

### Step 3: Check Render Logs

1. **Render Dashboard** → college-event-management-system → **Logs**
2. Look for errors
3. Should see: "Server running on port XXXX" and "MySQL Connected"

### Step 4: Test Backend Directly

Open this URL in browser:
```
https://college-event-management-system-isen.onrender.com/
```

You should see: **"server is running + DB Connected"**

If you see an error, backend is not working!

### Step 5: Check Browser Console

1. Open your Vercel site
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Try to register
5. Look for errors (copy and send them to me)

### Step 6: Check Network Tab

1. Keep Developer Tools open (F12)
2. Go to **Network** tab
3. Try to register
4. Look for the `/register` request
5. Click on it
6. Check:
   - **Request URL** - Should be `https://college-event-management-system-isen.onrender.com/api/auth/register`
   - **Status Code** - What error code?
   - **Response** - What error message?

---

## 🎯 Quick Test Commands

### Test Backend Health
```bash
curl https://college-event-management-system-isen.onrender.com/
```
Should return: "server is running + DB Connected"

### Test Registration Endpoint
```bash
curl -X POST https://college-event-management-system-isen.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

---

## 📊 Common Error Messages & Solutions

### "Network Error" or "Failed to fetch"
- Backend is down or URL is wrong
- Check Render is running
- Verify `VITE_API_URL` in Vercel

### "CORS Error"
- Update `backend/server.js` with correct Vercel URL
- Commit and push to trigger Render redeploy

### "Database connection failed"
- Check Railway database is running
- Verify environment variables in Render
- Check Railway credentials are correct

### "User already exists"
- Email is already registered
- Try a different email

### "Internal Server Error" (500)
- Check Render logs for details
- Likely database or JWT_SECRET issue

---

## ✅ Final Checklist

- [ ] Vercel `VITE_API_URL` ends with `/api`
- [ ] Vercel redeployed after changing env variable
- [ ] All Render environment variables set
- [ ] Render shows "MySQL Connected" in logs
- [ ] Backend URL works: https://college-event-management-system-isen.onrender.com/
- [ ] CORS URL matches actual Vercel URL
- [ ] Browser console shows no errors
- [ ] Network tab shows correct request URL

---

## 🆘 If Still Not Working

Send me:
1. Screenshot of Render logs
2. Screenshot of browser console errors
3. Screenshot of Network tab showing the failed request
4. Confirm you added `/api` to Vercel env variable and redeployed
