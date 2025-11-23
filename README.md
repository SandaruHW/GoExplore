# GoExplore

A comprehensive React Native mobile application built with Expo for discovering and exploring travel destinations worldwide. GoExplore provides users with an intuitive platform to browse, search, and save their favorite travel destinations with modern features like user authentication, dark mode support, and responsive design.

## 📋 Project Overview

GoExplore is a full-featured travel exploration application that combines modern mobile development practices with a user-friendly interface. The app enables travelers to discover new destinations, manage their favorites, and access detailed information about each location. With support for multiple platforms (iOS, Android, and Web), GoExplore offers a seamless experience across all devices.

## ✨ Features

### User Management
- **User Authentication** - Secure login and registration system
- **User Profiles** - Personal profile management and user details display
- **Session Persistence** - Automatic session handling with AsyncStorage

### Destination Discovery
- **Browse Destinations** - Explore a curated collection of travel destinations
- **Featured Carousel** - Highlighted destinations on the home screen
- **Detailed Destination Cards** - Comprehensive information about each location
- **Search Functionality** - Advanced search and filtering capabilities
- **Favorites System** - Save and manage favorite destinations

### User Experience
- **Dark Mode Support** - Automatic dark theme based on system preferences
- **Responsive Design** - Optimized layouts for all screen sizes
- **Modal Interactions** - Smooth modal experiences for destination details
- **Bottom Tab Navigation** - Intuitive navigation between major features
- **Help & Support** - Dedicated help and support section

## 🛠 Technologies & Stack

### Frontend Framework
- **React Native** (v0.81.5) - Cross-platform mobile development
- **Expo** (v54.0.25) - Fast development and deployment platform
- **React** (v19.1.0) - UI component library

### Navigation
- **React Navigation** - Navigation library with support for:
  - Bottom Tab Navigation
  - Native Stack Navigation
  - Stack Navigation

### State Management
- **Redux Toolkit** (v2.10.1) - Centralized state management
- **React Redux** (v9.2.0) - React bindings for Redux
- **Context API** - Global app context for auth, favorites, and theme

### Forms & Validation
- **React Hook Form** (v7.66.1) - Efficient form handling
- **Yup** (v1.7.1) - Schema validation for user inputs

### Storage & API
- **AsyncStorage** - Local data persistence
- **Axios** (v1.13.2) - HTTP client for API requests

### UI & Design
- **Expo Vector Icons** - Icon library
- **Expo Linear Gradient** - Gradient backgrounds
- **Expo Blur** - Blur effects
- **Expo Image Picker** - Image selection functionality
- **React Native Safe Area Context** - Safe area handling

### Utilities
- **React Native Web** - Web platform support
- **React DOM** - Web rendering

### Development Tools
- **TypeScript** (v5.9.2) - Type safety and enhanced development experience

## 📁 Project Structure

```
GoExplore/
├── App.js                          # Main app component & navigation setup
├── index.js                        # Application entry point
├── package.json                    # Dependencies and npm scripts
├── app.json                        # Expo configuration
├── tsconfig.json                   # TypeScript configuration
├── README.md                       # Project documentation
│
├── assets/                         # Static assets
│   ├── icon.png                   # App icon
│   ├── splash-icon.png            # Splash screen
│   ├── adaptive-icon.png          # Android adaptive icon
│   └── favicon.png                # Web favicon
│
├── src/
│   ├── screens/                   # Screen components
│   │   ├── LoginScreen.jsx        # Authentication login
│   │   ├── RegisterScreen.jsx     # User registration
│   │   ├── HomeScreen.jsx         # Main home screen
│   │   ├── SearchScreen.jsx       # Destination search
│   │   ├── FavoritesScreen.jsx    # Saved favorites
│   │   ├── ProfileScreen.jsx      # User profile display
│   │   ├── UserDetailsScreen.jsx  # User details editing
│   │   ├── HelpSupportScreen.jsx  # Help and support
│   │   ├── DestinationCard.jsx    # Destination card component
│   │   └── FeaturedCarousel.jsx   # Featured destinations carousel
│   │
│   ├── components/                # Reusable UI components
│   │   ├── MainLayout.jsx         # Main layout wrapper
│   │   └── DestinationModal.jsx   # Destination detail modal
│   │
│   ├── context/                   # React Context
│   │   └── AppContext.jsx         # Global app state (auth, favorites, theme)
│   │
│   ├── redux/                     # Redux store management
│   │   └── slices/                # Redux slices
│   │
│   ├── services/                  # API and business logic
│   │   └── authService.js         # Authentication service
│   │
│   ├── data/                      # Mock data
│   │   └── destinations.js        # Sample destination data
│   │
│   ├── navigation/                # Navigation configuration
│   │
│   └── utils/                     # Utility functions
│       └── validationSchemas.js   # Yup validation schemas
│
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS Simulator** (for iOS development) - part of Xcode on macOS
- **Android Studio** (for Android development)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SandaruHW/GoExplore.git
   cd GoExplore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your platform of choice:**
   - **iOS Simulator:**
     ```bash
     npm run ios
     ```
   - **Android Emulator:**
     ```bash
     npm run android
     ```
   - **Web Browser:**
     ```bash
     npm run web
     ```

### Development Workflow

- The dev server runs on port 19000 by default
- Use the Expo Go app to scan QR codes for live preview
- Hot reload is enabled for fast development iteration
- TypeScript provides type safety during development

## 🔐 Authentication Flow

The app implements a complete authentication system:
- User registration with validation
- Secure login mechanism
- Session persistence using AsyncStorage
- User context management through AppContext
- Automatic user session restoration on app launch

## 🎨 Theme Support

- **Automatic Theme Detection** - Respects system dark mode preferences
- **Theme Toggle** - Manual theme switching in app settings
- **Persistent Theme** - Theme preference saved locally

## 🌍 Supported Platforms

- **iOS** - Native iOS application support via Expo
- **Android** - Native Android application support via Expo
- **Web** - Responsive web application support via React Native Web

## 📚 Key Features Explained

### Destination Discovery
Users can explore destinations through multiple interfaces:
- Featured carousel on home screen for trending destinations
- Full destination list with filtering and search
- Detailed destination cards with comprehensive information
- Quick access to destination details via modals

### Favorites Management
- Save destinations to personal favorites list
- Access favorites from dedicated favorites screen
- Persistent storage of favorite selections
- Quick add/remove functionality

### Search & Filter
- Text-based search across destination names and descriptions
- Filter destinations by various criteria
- Real-time search results
- Advanced filtering options

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m 'Add: your feature description'
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit** a pull request with detailed description

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👤 Author

**Sandaru Sathsara**
- GitHub: [@SandaruHW](https://github.com/SandaruHW)
- Repository: [GoExplore](https://github.com/SandaruHW/GoExplore)

## 📞 Support & Contact

For questions, issues, or suggestions regarding GoExplore, please:
- Open an issue on GitHub
- Check the in-app Help & Support section
- Review the project documentation

## 🔄 Project Status

- **Current Version**: 1.0.0
- **Status**: In Active Development
- **Branch**: dev

---

*Happy exploring! 🗺️ Discover the world with GoExplore.*