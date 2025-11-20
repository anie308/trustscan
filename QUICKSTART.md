# TrustScan Waitlist - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Supabase (5 minutes)

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account

2. **Create a New Project**
   - Click "New Project"
   - Name: `trustscan`
   - Choose a strong database password (save it!)
   - Select region closest to you
   - Click "Create new project"
   - Wait 1-2 minutes for provisioning

3. **Create the Database Table**
   - Go to **SQL Editor** in the left sidebar
   - Click "New query"
   - Copy the SQL from [SUPABASE_SETUP.md](SUPABASE_SETUP.md) (starting at line 11)
   - Click "Run"
   - You should see "Success. No rows returned"

4. **Get Your API Keys**
   - Go to **Settings** → **API** in the left sidebar
   - Copy these two values:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon public** key: `eyJhbGc...` (very long string)

### Step 2: Configure Your App (1 minute)

1. **Create Environment File**
   ```bash
   # In your project root, create .env.local
   # Copy from .env.local.example
   ```

2. **Add Your Credentials**
   Open `.env.local` and paste your Supabase values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Save the file**

### Step 3: Start Your App (30 seconds)

```bash
# Restart your dev server
npm run dev
```

### Step 4: Test It Out! (1 minute)

1. Open http://localhost:3000
2. Click "Join Waitlist"
3. Fill out the form
4. Submit!

### Step 5: Verify It Worked (30 seconds)

1. Go to your Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. Select the **waitlist** table
4. You should see your submission! 🎉

---

## ✅ You're Done!

Your waitlist is now fully functional and collecting real data in Supabase!

## 📊 View Your Waitlist Entries

### In Supabase Dashboard
- **Table Editor** → **waitlist** → See all entries
- **Export** button to download as CSV or JSON

### Using SQL
Go to **SQL Editor** and run:
```sql
-- See all entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Count by user type
SELECT user_type, COUNT(*) as count
FROM waitlist
GROUP BY user_type
ORDER BY count DESC;

-- Recent signups (last 7 days)
SELECT name, email, user_type, created_at
FROM waitlist
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

---

## 🔧 Troubleshooting

### "Failed to submit" error
- ✅ Check your `.env.local` has correct values
- ✅ Restart your dev server after creating `.env.local`
- ✅ Verify Supabase project is active (green status)
- ✅ Check browser console for detailed errors

### "This email is already on the waitlist"
- ✅ This is expected! Each email can only join once
- ✅ Try with a different email address

### Can't see data in Supabase
- ✅ Verify you ran the SQL schema correctly
- ✅ Check for error messages in the SQL Editor
- ✅ Make sure you're looking at the right table (`waitlist`)

---

## 🎯 What's Next?

1. **Deploy to Production**
   - Deploy to Vercel (takes 2 minutes)
   - Add environment variables in Vercel settings

2. **Monitor Your Waitlist**
   - Check Supabase dashboard regularly
   - Export data for email campaigns

3. **Add Features**
   - Email notifications (Supabase Functions)
   - Admin dashboard to view entries
   - Email verification
   - Welcome emails

---

## 📚 More Information

- [Full Setup Guide](SUPABASE_SETUP.md) - Detailed Supabase instructions
- [Application Guide](CLAUDE.md) - Complete app documentation
- [Supabase Docs](https://supabase.com/docs) - Official documentation

---

**Need Help?** Check the troubleshooting section or review the detailed setup guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
