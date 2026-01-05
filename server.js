const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Extract and trim all fields
    const name = req.body.name ? req.body.name.trim() : '';
    const email = req.body.email ? req.body.email.trim() : '';
    const subject = req.body.subject ? req.body.subject.trim() : '';
    const message = req.body.message ? req.body.message.trim() : '';

    // Debug logging (remove in production if needed)
    console.log('Received form data:', { name, email, subject, message: message.substring(0, 50) + '...' });

    // Validate input - check for empty strings after trimming
    if (!name || name.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name is required' 
      });
    }
    if (!email || email.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }
    if (!subject || subject.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Subject is required' 
      });
    }
    if (!message || message.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please enter a valid email address' 
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'akshwint.2003@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from your portfolio website contact form</small></p>
      `,
      replyTo: email
    };

    // Verify email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing:', {
        hasUser: !!process.env.EMAIL_USER,
        hasPass: !!process.env.EMAIL_PASS
      });
      return res.status(500).json({ 
        success: false, 
        error: 'Email configuration error. Please check server settings.' 
      });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to:', 'akshwint.2003@gmail.com');
    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message. Please try again later.';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your email credentials in .env file.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Could not connect to email server. Please check your internet connection.';
    } else if (error.responseCode === 535) {
      errorMessage = 'Invalid email credentials. Please verify your Gmail App Password in .env file.';
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
});

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Make sure to set EMAIL_USER and EMAIL_PASS in your .env file`);
});

