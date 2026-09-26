# 🚗 Carzento

### AI-Powered Automotive Discovery Platform

**Carzento** is a modern, interactive automotive discovery platform designed to help users explore cars, compare specifications, discover new launches, explore electric vehicles, find dealerships, and interact with an AI-powered car assistant through a unified web experience.

The project focuses on combining **modern frontend engineering, responsive UI/UX, interactive components, and AI-assisted automotive discovery** into a single application.

---

## 🌐 Project Overview

Carzento is designed as a next-generation automotive exploration experience rather than a traditional static car-listing website.

The platform provides dedicated experiences for:

* 🚘 Popular cars
* 🔥 Most-used cars
* ⚡ Electric vehicles
* 🆕 New and upcoming car launches
* 🤖 AI-powered car assistance
* 📊 Detailed car specifications
* 🏢 Authorized dealership discovery
* 🖼️ Automotive image galleries
* 🏷️ Popular automobile brands
* 📚 Automotive resources

The application uses a modular React architecture where major sections and interactive experiences are implemented as reusable components.

---

## ✨ Key Features

### 🚘 Car Discovery

Explore popular and frequently used cars through dedicated sections designed for quick discovery.

### 📋 Detailed Car Specifications

Users can select a vehicle and open a dedicated specifications interface containing vehicle information and variants.

### 🤖 AI Car Assistant

An interactive AI assistant interface helps users explore vehicles and discover relevant automotive information through a conversational experience.

### 🆕 New Launch Discovery

A dedicated new-launch experience allows users to explore newly introduced vehicles through an interactive interface.

### ⚡ Electric Vehicle Explorer

Explore electric vehicles through a dedicated EV discovery experience.

### 🏢 Dealership Finder

Provides an interface for discovering authorized dealerships.

### 📅 Upcoming Cars

A dedicated section for exploring upcoming vehicles and future automotive releases.

### 🖼️ Car Image Gallery

An interactive automotive gallery provides a visual exploration experience for vehicle images.

### 🏷️ Popular Brands

A dedicated brand hub allows users to explore popular automotive brands and associated vehicles.

### 🌗 Theme Support

The application includes a centralized theme system using a reusable `ThemeProvider`, allowing the interface to manage theme-related styling consistently.

### 🎬 Intro Experience

Carzento includes an introductory splash experience before loading the main application interface, creating a polished product-style entry point.

### 📱 Responsive Interface

The UI is structured using responsive Tailwind CSS utility classes to support different screen sizes and modern web layouts.

---

## 🛠️ Technology Stack

### Frontend

* **React 19**
* **JavaScript / JSX**
* **Vite**
* **Tailwind CSS**
* **Framer Motion**
* **Lucide React**

### Development Tools

* **Node.js**
* **npm**
* **Git**
* **GitHub**

The current repository configuration uses Vite for development and production builds, React for the UI layer, Tailwind CSS for styling, Framer Motion for animations, and Lucide React for interface icons.

---

## 🏗️ Application Architecture

Carzento follows a component-based React architecture.

```text
Carzento
│
├── public/
│   └── Static assets
│
├── src/
│   ├── components/
│   │   ├── TopNav
│   │   ├── HeroBanner
│   │   ├── PopularCars
│   │   ├── MostUsedCars
│   │   ├── CarSpecsModal
│   │   ├── AIChatbotModal
│   │   ├── NewLaunchesAIModal
│   │   ├── FindDealersModal
│   │   ├── UpcomingCarsModal
│   │   ├── ElectricCarsModal
│   │   ├── CarImagesGalleryModal
│   │   ├── PopularBrandsModal
│   │   ├── IntroSplashScreen
│   │   ├── AutomotiveResourcesSection
│   │   └── FooterSection
│   │
│   ├── ThemeContext
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── carzento_mobile/
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The main application coordinates the different automotive modules and manages UI state such as selected vehicles, modal visibility, theme state, and navigation interactions.

---

## 🎯 Engineering Highlights

### Component-Based Development

The application is divided into focused React components, improving maintainability and reducing unnecessary coupling.

### State Management

React state is used to control:

* Selected vehicles
* Modal visibility
* AI assistant state
* EV explorer state
* Dealer finder state
* New-launch state
* Gallery state
* Popular-brand state
* Intro-screen visibility

### Reusable UI Patterns

Interactive experiences such as specifications, AI assistance, dealerships, galleries, EVs, and brands are implemented as reusable modal/component modules.

### Responsive Design

Tailwind CSS responsive utilities are used to build layouts that adapt across different screen sizes.

### Animation & Micro-interactions

Framer Motion is included in the technology stack for creating modern motion-based interactions and polished user experiences.

### Scalable Frontend Structure

The separation between application logic, reusable components, theme management, and static assets provides a foundation for future backend and API integrations.

---

## 📂 Project Structure

```text
.
├── carzento_mobile/
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PavanMamidisetti/Carzento.git
```

### 2. Navigate to the Project

```bash
cd Carzento
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will start the development environment and provide a local URL in the terminal.

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The repository currently defines `dev`, `start`, `build`, and `preview` scripts through Vite.

---

## 🔮 Future Enhancements

The project can be extended into a complete automotive platform by adding:

* 🔐 User authentication
* 🗄️ Backend API integration
* 📊 Real-time vehicle database
* 🔎 Advanced car search and filtering
* ⚖️ Side-by-side vehicle comparison
* 💰 EMI and finance calculator
* 📍 Location-based dealership search
* ❤️ Wishlist and saved vehicles
* 🔄 Real-time automotive pricing
* 🌐 Multi-country vehicle database
* 📱 Progressive Web App capabilities
* 🧠 Personalized AI vehicle recommendations
* 📈 Analytics dashboard
* ☁️ Cloud-based data management

---

## 💼 Why This Project?

Carzento was developed to demonstrate practical skills in **modern frontend development and product-oriented application design**.

The project demonstrates experience with:

* React component architecture
* Modern JavaScript
* Responsive UI development
* State-driven interfaces
* Modal and interactive workflows
* Theme management
* Animation and micro-interactions
* AI-oriented product experiences
* Vite-based development
* Git/GitHub workflow

Rather than building a simple static website, Carzento focuses on creating an **interactive automotive product experience** with multiple user journeys.

---

## 🌐 Live Demo

**Live Application:**
Add your deployed Carzento URL here.

**GitHub Repository:**
[Carzento](https://github.com/PavanMamidisetti/Carzento)

---

## 👨‍💻 Author

### Pavan Mamidisetti

B.Tech Computer Science Engineering Student | Frontend Developer | Data & AI Enthusiast

* GitHub: [PavanMamidisetti](https://github.com/PavanMamidisetti)
* LinkedIn: [Pavan Mamidisetti](https://linkedin.com/in/pavan-mamidisetti-76729834)

---

## 📄 License

This project is developed for educational, portfolio, and demonstration purposes.

---

### ⭐ If you find this project interesting

Feel free to explore the repository, review the implementation, and follow the project as Carzento continues to evolve.
