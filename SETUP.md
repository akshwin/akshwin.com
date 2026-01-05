# Contact Form Setup Guide

This guide will help you set up the contact form to send emails to your Gmail account.

## Quick Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` File**
   Create a file named `.env` in the root directory with the following content:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

3. **Get Gmail App Password**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
   - Scroll down to **App Passwords**
   - Select **Mail** and **Other (Custom name)**
   - Enter "Portfolio Contact Form" as the name
   - Click **Generate**
   - Copy the 16-character password and paste it in your `.env` file as `EMAIL_PASS`

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Test the Form**
   - Open `http://localhost:3000` in your browser
   - Navigate to the "Get In Touch" section
   - Fill out and submit the contact form
   - Check your email inbox (akshwint.2003@gmail.com) for the message

## Troubleshooting

### Email Not Sending?
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify that 2-Step Verification is enabled on your Google account
- Check that the `.env` file is in the root directory
- Ensure the server is running (`npm start`)

### Port Already in Use?
- Change the `PORT` value in your `.env` file to a different port (e.g., 3001, 8080)
- Or stop the process using port 3000

### Form Not Submitting?
- Make sure the backend server is running
- Check browser console for errors
- Verify that all form fields are filled out

## Production Deployment

For production deployment (e.g., Heroku, Railway, Vercel), make sure to:
1. Set environment variables in your hosting platform's dashboard
2. Never commit your `.env` file to version control
3. Use environment variables provided by your hosting platform


