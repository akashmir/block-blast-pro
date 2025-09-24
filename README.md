# Block Blast Pro

An addictive block puzzle game inspired by Block Blast! Built with React Native + Expo for cross-platform mobile deployment.

## Features

### Core Gameplay
- 8x8 grid block placement mechanics
- Drag-and-drop controls with smooth animations
- Progressive difficulty with varying block shapes
- Line-breaking mechanics for score multipliers
- Combo system for advanced players

### Visual & Audio
- Modern, clean UI/UX design
- Animated particles and block movements
- Sound effects for all game actions
- Smooth animations and transitions

### Monetization
- AdMob integration (banner, interstitial, rewarded ads)
- In-app purchases for premium features
- Remove ads option
- Power-up packs
- Premium subscription with exclusive content

### Social Features
- Local leaderboards with high scores
- Achievement system with progress tracking
- Social sharing capabilities
- Daily challenges for engagement

### Analytics & Performance
- Firebase Analytics integration
- Crash reporting with Crashlytics
- User retention tracking
- Performance monitoring

## Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Jotai
- **Animations**: React Native Reanimated
- **Monetization**: AdMob, Expo In-App Purchases
- **Analytics**: Firebase Analytics & Crashlytics
- **Storage**: AsyncStorage for local data

## Project Structure

```
├── app/                    # Expo Router app structure
├── components/             # React components
│   ├── game/              # Game-specific components
│   ├── ads/               # Ad components
│   ├── premium/           # Premium features
│   └── social/            # Social features
├── services/              # Business logic services
│   ├── ads/               # AdMob integration
│   ├── analytics/         # Firebase Analytics
│   ├── purchases/         # In-app purchases
│   └── social/            # Social features
├── constants/             # Game constants and utilities
├── hooks/                 # Custom React hooks
└── assets/                # Images, fonts, sounds
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd block-blast-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Configuration

### AdMob Setup
1. Create an AdMob account and app
2. Replace test ad unit IDs in `services/ads/AdMobService.ts` with your actual IDs
3. Configure ad placement in your app

### Firebase Setup
1. Create a Firebase project
2. Add your app to the project
3. Download configuration files:
   - `google-services.json` for Android
   - `GoogleService-Info.plist` for iOS
4. Place files in the appropriate directories

### In-App Purchases
1. Set up products in App Store Connect / Google Play Console
2. Update product IDs in `services/purchases/PurchaseService.ts`
3. Test purchases in sandbox environment

## Game Modes

### Classic Mode
- 8x8 grid
- 3 pieces in hand
- Standard block-blast gameplay

### Chaos Mode
- 10x10 grid
- 5 pieces in hand
- More challenging gameplay

## Monetization Strategy

### Ad Revenue
- Banner ads at bottom of game screen
- Interstitial ads between games
- Rewarded ads for power-ups

### In-App Purchases
- Remove ads ($2.99)
- Power-up packs ($0.99)
- Premium themes ($1.99)
- Premium subscription ($4.99/month)

## Analytics Events

The app tracks the following events:
- Game start/end
- Score achievements
- Ad views/clicks
- Purchase events
- User retention
- Feature usage

## Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Base implementation from [tokaa1/blockerino](https://github.com/tokaa1/blockerino)
- Inspired by Block Blast! game mechanics
- Built with React Native and Expo ecosystem