# Thoothu - Love Messenger of Tamil Nadu 💕

A beautiful, romantic web application where people can anonymously confess their love and have messages delivered through various contact methods.

## Features

- 🔐 Simple Google OAuth-style authentication
- 💌 Anonymous love confession forms
- 📱 Multiple contact methods (Call, WhatsApp, Email, Instagram)
- 📧 Automatic email notifications to admin (gokulsrg3@gmail.com)
- 🎨 Beautiful, romantic UI with Tamil cultural elements
- 📱 Fully responsive design
- ✨ Smooth animations and micro-interactions

## How It Works

1. **Login**: Users authenticate with Google-style login
2. **Form**: Fill out comprehensive love confession form
3. **Submit**: Form data is sent directly to gokulsrg3@gmail.com via Formspree
4. **Email**: Immediate email notification sent to admin
5. **Success**: User sees confirmation page

## Email Delivery

The application uses **Formspree** (a reliable free email service) to send form submissions directly to `gokulsrg3@gmail.com`. Every form submission triggers an immediate email with:

- Sender details (name, phone, gender)
- Recipient details (name, gender)
- Love message
- Contact method and details
- Timestamp and delivery instructions

## How to View User Submissions

### Primary Method: Email Notifications
- Check `gokulsrg3@gmail.com` inbox
- Every form submission sends an immediate email
- All form details are included in a readable format
- Subject line: "💕 URGENT: New Love Message - [Sender] → [Recipient]"

### Backup Method: Browser Console
- Open Developer Tools (F12)
- Go to Console tab
- Submit a form to see logged data
- Data is also saved to localStorage

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Icons**: Lucide React
- **Email Service**: Formspree (free, reliable)
- **Deployment**: Netlify

## Contact

For any questions or support, please contact: gokulsrg3@gmail.com

---

Made with ❤️ for spreading love across Tamil Nadu