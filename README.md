# Thoothu - Love Messenger of Tamil Nadu 💕

A beautiful, romantic web application where people can anonymously confess their love and have messages delivered through various contact methods.

## Features

- 🔐 Google OAuth authentication
- 💌 Anonymous love confession forms
- 📱 Multiple contact methods (Call, WhatsApp, Email, Instagram)
- 📧 Automatic email notifications to admin
- 🎨 Beautiful, romantic UI with Tamil cultural elements
- 📱 Fully responsive design
- ✨ Smooth animations and micro-interactions

## Setup Instructions

### Current Status

The application is currently set up for demo purposes. To enable actual email sending:

1. Set up a Supabase project
2. Deploy the edge function
3. Configure the Resend API key
4. Update the environment variables

### 1. Email Service Setup (Resend)

1. Go to [Resend](https://resend.com) and create an account
2. Get your API key from the dashboard
3. Add your API key to the environment variables

### 2. Environment Variables

Create a `.env` file in your project root:

```env
RESEND_API_KEY=your_resend_api_key_here
```

### 3. Supabase Edge Function Deployment

If you're using Supabase:

1. Make sure you have the Supabase CLI installed
2. Deploy the edge function:
   ```bash
   supabase functions deploy send-love-message
   ```
3. Set the environment variable in Supabase:
   ```bash
   supabase secrets set RESEND_API_KEY=your_resend_api_key_here
   ```

### 4. Local Development

```bash
npm install
npm run dev
```

## How It Works

1. **Login**: Users authenticate with Google
2. **Form**: Fill out comprehensive love confession form
3. **Submit**: Form data is sent via Formspree to gokulsrg3@gmail.com
4. **Email**: Email notification is sent to admin
5. **Success**: User sees confirmation page
6. **Admin Panel**: View all submissions via admin panel

## How to View User Details

### Method 1: Email Notifications (Primary)
- Every form submission sends an email to `gokulsrg3@gmail.com`
- Check your email inbox for new love message notifications
- Each email contains all the form details formatted nicely

### Method 2: Browser Console (For Testing)
- Open Developer Tools (F12)
- Go to Console tab
- Submit a form to see the logged data
- Data is also saved to localStorage as backup

## Email Content

The application sends beautifully formatted HTML emails containing:
- Sender details (name, phone, gender)
- Recipient details (name, gender)
- Love message
- Contact method and details
- Timestamp and source information

## Backup Data Storage

- All submissions are saved to browser localStorage as backup
- You can access this data via browser console: `JSON.parse(localStorage.getItem('loveSubmissions'))`
- Data persists between browser sessions

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Icons**: Lucide React
- **Email Service**: Resend API
- **Serverless Functions**: Supabase Edge Functions
- **Deployment**: Netlify

## Contact

For any questions or support, please contact: gokulsrg3@gmail.com

---

Made with ❤️ for spreading love across Tamil Nadu