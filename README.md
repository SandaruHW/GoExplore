# GoExplore

A React Native mobile app built with Expo for exploring travel destinations.

## Features

- User authentication (Login/Register)
- Browse travel destinations
- Search and filter destinations
- Favorite destinations
- Dark mode support
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SandaruHW/GoExplore.git
   cd GoExplore
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on device/simulator:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For web: `npm run web`

## Project Structure

```
GoExplore/
├── App.js                 # Main app component
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
├── app.json              # Expo configuration
├── src/
│   ├── context/
│   │   └── AppContext.jsx # Global state management
│   ├── screens/
│   │   ├── LoginScreen.jsx
│   │   ├── RegisterScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── DestinationCard.jsx
│   │   └── FeaturedCarousel.jsx
│   └── data/
│       └── destinations.js # Sample destination data
└── assets/               # Images and other assets
```

## Technologies Used

- React Native
- Expo
- React Navigation (planned)
- Redux Toolkit (planned)
- AsyncStorage
- Axios

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

Sandaru Sathsara - [Your Email]

Project Link: [https://github.com/SandaruHW/GoExplore](https://github.com/SandaruHW/GoExplore)