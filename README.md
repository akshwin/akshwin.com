# 🚀 Akshwin T – Personal Portfolio Website

Welcome to my personal portfolio website! This responsive and dynamic website showcases my skills, projects, education, experience, certifications, research publications, and more.


## 🌐 Live Website

🔗 [Visit Portfolio](https://akshwin.github.io/akshwin.com/)

---

## 📁 Project Structure

```

.
├── index.html
├── server.js          # Node.js backend server
├── package.json       # Node.js dependencies
├── .env              # Environment variables (create this)
├── style/
│   ├── style.css
│   ├── contact.css
│   ├── footer.css
│   └── hero-responsive.css
├── JS/
│   └── main.js
├── assets/
│   ├── images/    # Profile image, logos, project images, etc.
│   ├── videos/    # Hero background video

````

---

## 🛠️ Technologies Used

- **Frontend Framework**: HTML5, CSS3, Bootstrap 5
- **Backend**: Node.js, Express.js (for local development)
- **Email Service**: EmailJS (for GitHub Pages) / Nodemailer (for local development)
- **Animations**: GSAP, Typed.js
- **Icons**: Bootstrap Icons, FontAwesome
- **Responsive Design**: Mobile-first layout using Bootstrap Grid

---

## ✨ Features

- 🌟 Smooth scroll and fade-in animations
- 📽️ Video background hero section
- 📚 Detailed sections:
  - About Me
  - Education
  - Experience
  - Projects with live links
  - Certifications
  - Conferences & Publications
  - Newsletter (Substack Embed)
- 🌐 Social media & academic presence integration
- 📧 Contact form with email functionality
- 🔝 Back-to-top button

---

## 🧠 Notable Projects

| Project                             | Description                                                        | Live Link |
|-------------------------------------|--------------------------------------------------------------------|-----------|
| Brain Tumor Classifier              | Deep learning model using Transfer Learning (97% accuracy)         | [View](https://brain-tumor-classifier-app.streamlit.app/) |
| Cascaded U-Net for Lane Detection   | Dual U-Net-based architecture for accurate lane segmentation       | [View](https://lane-detection-cascaded-unet.up.railway.app/) |
| ICH Detector                        | Detects Intracranial Hemorrhage using parabolic cone activation   | [View](https://intracranial-hemorrhage-detector.streamlit.app/) |
| DST Predictor                       | Predicts space weather indices using deep learning                 | [View](https://dst-predictor.streamlit.app/) |

> Visit the "Projects" section on the website to explore more.

---

## 📄 How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/akshwin/akshwin.com.git
cd akshwin.com
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure email settings**
   - Create a `.env` file in the root directory
   - Add your Gmail credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```
   
   **Important**: For Gmail, you need to use an App Password instead of your regular password:
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Go to Security > 2-Step Verification > App Passwords
   - Generate an app password for "Mail"
   - Use that app password in the `.env` file

4. **Start the server**
```bash
npm start
```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The contact form will now send emails to `akshwint.2003@gmail.com`

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Static Mode (without backend)
If you just want to view the website without the contact form functionality:
- Simply open `index.html` in your browser
- The contact form will not work without the backend server running

---

## 🚀 GitHub Pages Deployment

This website is configured to work on **GitHub Pages** (static hosting). Since GitHub Pages doesn't support Node.js backends, the contact form uses **EmailJS** for email functionality.

### Setup for GitHub Pages

1. **Configure EmailJS** (Required for contact form)
   - Follow the detailed instructions in [`EMAILJS_SETUP.md`](./EMAILJS_SETUP.md)
   - You'll need to:
     - Create an EmailJS account (free tier: 200 emails/month)
     - Set up an email service (Gmail)
     - Create an email template
     - Update `JS/main.js` with your EmailJS credentials

2. **Deploy to GitHub Pages**
   - Push your code to GitHub
   - Go to repository Settings → Pages
   - Select source branch (usually `main` or `master`)
   - Your site will be live at `https://yourusername.github.io/akshwin.com/`

### Important Notes

- **Backend server (`server.js`)** is only needed for local development
- **EmailJS** handles contact form submissions on GitHub Pages
- The website works as a static site - no server required for deployment
- See [`EMAILJS_SETUP.md`](./EMAILJS_SETUP.md) for complete EmailJS configuration guide

---

## 📬 Contact

* 📧 Email: [akshwint.2003@gmail.com](mailto:akshwint.2003@gmail.com)
* 🔗 LinkedIn: [@akshwin](https://www.linkedin.com/in/akshwin/)
* 🐦 Twitter: [@akshwin\_2003](https://x.com/akshwin_2003)

---

## 📜 License

This project is open-source and free to use for learning and inspiration. For reuse or large-scale adaptation, please provide proper credit.

---

## 💡 Author

**Akshwin T** – Final Year Computer Science Student, AI Researcher, Full Stack Developer, and Kaggle Contributor.

---