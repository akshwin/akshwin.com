# EmailJS Setup Guide - Quick Steps

## Step 1: Get Your Public Key

1. Go to [https://dashboard.emailjs.com/admin/account](https://dashboard.emailjs.com/admin/account)
2. Log in to your EmailJS account
3. Look for **"Public Key"** in the Account section
4. Copy the Public Key (it looks like: `abc123xyz789` or similar)

## Step 2: Get Your Service ID

1. Go to [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Click on **"Email Services"** in the left menu
3. If you don't have a service yet:
   - Click **"Add New Service"**
   - Choose **Gmail** (or your email provider)
   - Click **"Connect Account"** and authorize
4. Copy the **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left menu
2. Click **"Create New Template"**
3. Use these settings:

**Template Name:** `contact_form`

**Subject:** `Contact Form: {{subject}}`

**Content:**
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio website contact form
```

4. Click **"Save"**
5. Copy the **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Update Your Code

Open `JS/main.js` and replace these three placeholders:

**Line 191:** Replace `'YOUR_PUBLIC_KEY'` with your Public Key
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace this
```

**Line 233:** Replace `'YOUR_SERVICE_ID'` with your Service ID
```javascript
'YOUR_SERVICE_ID',  // Replace this
```

**Line 234:** Replace `'YOUR_TEMPLATE_ID'` with your Template ID
```javascript
'YOUR_TEMPLATE_ID', // Replace this
```

### Example After Setup:

```javascript
// Line 191
emailjs.init('abc123xyz789'); // Your actual Public Key

// Lines 232-235
const response = await emailjs.send(
    'service_abc123',  // Your actual Service ID
    'template_xyz789', // Your actual Template ID
    templateParams
);
```

## Step 5: Test

1. Save the file
2. Refresh your website
3. Fill out the contact form
4. Submit and check your email inbox

## Troubleshooting

**"Public Key is invalid" error:**
- Make sure you copied the entire Public Key (no spaces)
- Check that you're logged into the correct EmailJS account
- Verify the Public Key at: https://dashboard.emailjs.com/admin/account

**"Service ID is invalid" error:**
- Make sure your email service is connected
- Check the Service ID at: https://dashboard.emailjs.com/admin/integration

**"Template ID is invalid" error:**
- Verify your template exists and is saved
- Check the Template ID at: https://dashboard.emailjs.com/admin/template

**Still not working?**
- Open browser console (F12) and check for errors
- Make sure EmailJS script is loaded (check Network tab)
- Verify all three IDs are correctly replaced (no quotes around the placeholders)
