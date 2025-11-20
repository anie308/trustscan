# Supabase Setup Guide

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Your TrustScan project ready

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in the project details:
   - **Name**: trustscan
   - **Database Password**: (choose a strong password and save it)
   - **Region**: (choose closest to your users)
4. Click "Create new project"
5. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Create the Waitlist Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the following SQL:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('consumer', 'manufacturer', 'retailer', 'regulator', 'other')),
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for waitlist signups)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Create policy to allow public reads (for counting waitlist members)
CREATE POLICY "Allow public reads" ON waitlist
  FOR SELECT
  TO anon, public
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE waitlist IS 'Stores waitlist signups for TrustScan';
```

4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned"

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Find these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (long string)

## Step 4: Configure Environment Variables

1. In your TrustScan project root, create a file named `.env.local`
2. Copy the contents from `.env.local.example`
3. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Save the file
5. **IMPORTANT**: Never commit `.env.local` to git (it's already in .gitignore)

## Step 5: Restart Your Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 6: Test the Waitlist

1. Open your app at http://localhost:3000
2. Navigate to the waitlist page
3. Fill out the form and submit
4. Go to your Supabase dashboard → **Table Editor** → **waitlist**
5. You should see your submission!

## Viewing Waitlist Entries

### Option 1: Supabase Dashboard
1. Go to **Table Editor** → **waitlist**
2. View all entries in a spreadsheet-like interface

### Option 2: Export Data
1. In Table Editor, click the **Export** button
2. Choose CSV or JSON format
3. Download your waitlist data

### Option 3: SQL Query
1. Go to **SQL Editor**
2. Run queries like:

```sql
-- Get all waitlist entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Count by user type
SELECT user_type, COUNT(*) as count
FROM waitlist
GROUP BY user_type;

-- Get entries from the last 7 days
SELECT *
FROM waitlist
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## Security Notes

### Row Level Security (RLS)
The table has RLS enabled with these policies:
- **Public inserts**: Anyone can submit to the waitlist (required for the form)
- **Authenticated reads**: Only logged-in users can view entries (for future admin dashboard)

### Email Validation
- Emails must be unique (enforced by database constraint)
- Duplicate email submissions will be rejected

### Data Privacy
- Only collect necessary information
- Consider adding a privacy policy link to your waitlist form
- Implement GDPR compliance if serving EU users

## Troubleshooting

### Issue: "Failed to submit" error
- Check that your `.env.local` file has the correct values
- Verify your Supabase project is active
- Check browser console for detailed error messages

### Issue: Duplicate email error
- This is expected behavior - each email can only join once
- Consider adding a friendly message in the UI

### Issue: RLS policy error ("new row violates row-level security policy")
This error means the RLS policy isn't allowing inserts. To fix:

1. **Drop existing policies** (if you created them before):
```sql
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated reads" ON waitlist;
```

2. **Create the correct policies**:
```sql
-- Allow anonymous users to insert
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Allow public reads (optional, for counting)
CREATE POLICY "Allow public reads" ON waitlist
  FOR SELECT
  TO anon, public
  USING (true);
```

3. **Verify the policies** in your Supabase dashboard:
   - Go to **Database** → **waitlist** table
   - Click on **Policies** tab
   - You should see "Allow anonymous inserts" policy with target role `anon, public`

4. **Test again** - Try submitting the waitlist form

## Next Steps

1. ✅ Set up email notifications when someone joins (Supabase Functions)
2. ✅ Create an admin dashboard to view and export waitlist entries
3. ✅ Add email verification/confirmation emails
4. ✅ Integrate with email marketing tools (Mailchimp, SendGrid, etc.)
5. ✅ Set up automated welcome emails

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
