# 🚀 Hassan's Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184.0-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40.0-FF0080?style=for-the-badge&logo=framer&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)

**A cinematic, 3D-powered portfolio with admin CMS, built with modern web technologies**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 📖 About

A stunning, production-ready portfolio website featuring **cinematic animations**, **3D graphics**, and a **full-featured admin dashboard**. Built with React 19, Vite, and Tailwind CSS, this portfolio showcases modern web development capabilities with an immersive user experience.

### ✨ Key Highlights
- 🎬 **Cinematic Entry Gate** - Password-protected animated entry screen
- 🎨 **3D Graphics** - Interactive Three.js cubes and particle systems
- 🎛️ **Admin CMS** - Complete content management system with inline editing
- 📊 **Analytics Dashboard** - Track visits, section views, and engagement
- 🎨 **Theme Customizer** - Dynamic color scheme customization
- 📱 **Fully Responsive** - Optimized for all devices
- 💾 **Local Storage** - Persistent data without backend
- 🎯 **Smooth Animations** - Framer Motion powered transitions

---

## 🎯 Features

### 🎬 Public Features
- **Cinematic Gate Screen** - Animated password entry with aurora background
- **3D Hero Section** - Interactive rotating cube with particle field
- **Smooth Scrolling** - Buttery smooth navigation between sections
- **Dynamic Content** - Editable sections with inline editing (admin mode)
- **Contact Form** - Functional contact section
- **Project Showcase** - Display projects with filtering
- **Skills & Experience** - Timeline-based experience section
- **Testimonials** - Client feedback carousel
- **Blog Section** - Latest articles and updates
- **Services** - Professional services offered
- **Certifications** - Professional credentials display
- **Open to Work** - Availability status indicator

### 🎛️ Admin Dashboard Features
- **📝 Inline Editor** - Edit content directly on the page
- **🎨 Theme Customizer** - Change accent colors (Cyan, Purple, Gold)
- **📄 Resume Uploader** - Upload and manage resume (Base64)
- **📁 Project Manager** - Add, edit, delete, and reorder projects
- **📊 Analytics Dashboard** - View visit statistics and section analytics
- **📤 Data Export/Import** - Backup and restore portfolio data (JSON)
- **🔄 Reset to Defaults** - One-click reset to original content
- **👁️ Preview Mode** - Toggle between admin and public view

### 🎨 Design Features
- **Glassmorphism UI** - Modern glass-effect cards and modals
- **Gradient Effects** - Beautiful cyan-to-purple gradients
- **Custom Cursor** - Animated cursor follower
- **Animated Buttons** - Hover effects and transitions
- **Grid Background** - Dynamic grid pattern
- **Orbital Animations** - Rotating rings around hero image
- **Scan Line Effects** - Cyberpunk-inspired visual effects
- **Responsive Typography** - Clamp-based fluid typography

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2.6** - UI library with latest features
- **Vite 8.0.12** - Lightning-fast build tool
- **Tailwind CSS 4.3.0** - Utility-first CSS framework

### 3D & Animation
- **Three.js 0.184.0** - 3D graphics library
- **@react-three/fiber 9.6.1** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Useful helpers for R3F
- **Framer Motion 12.40.0** - Animation library

### Additional Libraries
- **React Router DOM 7.15.1** - Client-side routing
- **Axios 1.16.1** - HTTP client
- **Lucide React 1.16.0** - Beautiful icons
- **ESLint 10.3.0** - Code linting

---

## 📸 Screenshots

### 🎬 Gate Screen
*Animated password entry with aurora background and floating particles*

### 🏠 Hero Section
*3D cube, profile image with orbital rings, and animated text*

### 🎛️ Admin Dashboard
*Complete CMS with analytics, theme customizer, and content editors*

### 📱 Responsive Design
*Fully optimized for mobile, tablet, and desktop*

> **Note**: Add your own screenshots in the `screenshots/` folder and update the paths above

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Hassanx-debug/Dev-Dashboard.git
cd Dev-Dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

5. **Access admin dashboard**
```
http://localhost:5173/admin/dashboard
```

---

## 📖 Usage

### Public Access
- **Homepage**: `http://localhost:5173/` - Gate screen with password entry
- **Portfolio**: `http://localhost:5173/portfolio` - Public portfolio view
- **Admin View**: `http://localhost:5173/admin` - Portfolio with edit mode

### Admin Dashboard
Navigate to `/admin/dashboard` to access the full CMS:

1. **Edit Content** - Click the edit button to enable inline editing
2. **Customize Theme** - Change accent colors in Theme Customizer
3. **Upload Resume** - Add your resume (PDF, DOC, etc.)
4. **Manage Projects** - Add/edit/delete projects with drag-and-drop reordering
5. **View Analytics** - Monitor visits and section engagement
6. **Export Data** - Download portfolio data as JSON backup
7. **Import Data** - Restore from JSON backup file

### Default Password
The gate screen password is set in `src/components/gate/PasswordModal.jsx`

---

## 📁 Project Structure

```
Dev-Dashboard/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Static assets (images, fonts)
│   ├── components/
│   │   ├── admin/           # Admin dashboard components
│   │   │   ├── AdminToolbar.jsx
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   ├── DataExporter.jsx
│   │   │   ├── InlineEditor.jsx
│   │   │   ├── ProjectManager.jsx
│   │   │   ├── ResumeUploader.jsx
│   │   │   ├── SectionEditor.jsx
│   │   │   └── ThemeCustomizer.jsx
│   │   ├── gate/            # Gate screen components
│   │   │   ├── AuroraBackground.jsx
│   │   │   ├── ModeCard.jsx
│   │   │   └── PasswordModal.jsx
│   │   ├── sections/        # Portfolio sections
│   │   │   ├── About.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── OpenTo.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── three/           # Three.js 3D components
│   │   │   ├── HeroCube.jsx
│   │   │   └── ParticleField.jsx
│   │   └── ui/              # Reusable UI components
│   │       ├── AnimatedButton.jsx
│   │       ├── Cursor.jsx
│   │       ├── Footer.jsx
│   │       ├── GlassCard.jsx
│   │       ├── Modal.jsx
│   │       ├── Navbar.jsx
│   │       └── SectionLabel.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx  # Global state management
│   ├── data/
│   │   └── defaultData.js        # Default portfolio content
│   ├── hooks/                # Custom React hooks
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── GateScreen.jsx
│   │   └── Portfolio.jsx
│   ├── App.jsx               # Main app component
│   ├── App.css               # Global styles
│   ├── index.css             # Tailwind imports
│   └── main.jsx              # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Customization

### Update Personal Information
Edit `src/data/defaultData.js` to update:
- Profile details (name, location, tagline)
- Skills and experience
- Projects and certifications
- Contact information

### Change Theme Colors
1. Navigate to Admin Dashboard → Theme Customizer
2. Or edit CSS variables in `src/index.css`:
```css
:root {
  --cyan: #00f5ff;
  --purple: #b347ea;
  --gold: #ffd700;
}
```

### Modify Gate Password
Edit `src/components/gate/PasswordModal.jsx` and change the `CORRECT_PASSWORD` constant

### Add 3D Effects
Customize 3D components in `src/components/three/`:
- `HeroCube.jsx` - Rotating cube animation
- `ParticleField.jsx` - Background particles

---

## 🔧 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Hassan Bin Nisar**

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Hassanx--debug-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hassanx-debug)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hassan-bin-nisar)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hassan@example.com)

</div>

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Three.js](https://threejs.org/) - 3D graphics
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev/) - Icons

---

## 📊 Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Hassanx-debug/Dev-Dashboard?style=social)
![GitHub forks](https://img.shields.io/github/forks/Hassanx-debug/Dev-Dashboard?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Hassanx-debug/Dev-Dashboard?style=social)

</div>

---

<div align="center">

**Built with ❤️ by Hassan Bin Nisar**

*Last updated: June 2025*

</div>