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

## Project Status

✅ **Current Status**: Production Ready
- ✅ Core gameplay fully implemented
- ✅ Local APK build working
- ✅ Web version functional
- ✅ Mock services for monetization features
- ✅ Modern React Native + Expo setup
- ✅ TypeScript implementation
- ✅ Cross-platform compatibility

### Recent Updates
- Migrated from `expo eject` to `expo prebuild` (modern approach)
- Implemented local APK build with React Native CLI
- Fixed mobile rendering issues (boxShadow compatibility)
- Added comprehensive error handling and debugging
- Configured proper keystore signing for release builds

## Getting Started

### Prerequisites
- Node.js v18.20.4 (required for Expo SDK 52 compatibility)
- Expo CLI
- Java Development Kit (JDK 23)
- Android Studio with Android SDK
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

## Testing

### Web Testing
```bash
npm start
# Open http://localhost:8082 in browser
```

### Android Testing
1. **Emulator**: Install APK on Android emulator
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

2. **Physical Device**: Transfer APK to device and install
   - Enable "Install from Unknown Sources" in Android settings
   - Install the APK file

### Known Issues & Solutions
- **White Screen on Mobile**: Fixed by replacing `boxShadow` with React Native shadow properties
- **Node.js Compatibility**: Use Node.js v18.20.4 for Expo SDK 52
- **Disk Space**: Ensure at least 10GB free space for builds
- **Expo Go Compatibility**: Project uses SDK 52, may need Expo Go SDK 52

## Analytics Events

The app tracks the following events:
- Game start/end
- Score achievements
- Ad views/clicks
- Purchase events
- User retention
- Feature usage

## Building for Production

### Local APK Build (Recommended)

This project supports local APK builds using React Native CLI with `expo prebuild`. This approach provides better control and faster builds.

#### Prerequisites for Local Build
- Node.js v18.20.4 (compatible with Expo SDK 52)
- Java Development Kit (JDK 23)
- Android Studio with Android SDK
- At least 10GB free disk space

#### Environment Setup
1. Set environment variables:
```bash
# Windows PowerShell
$env:ANDROID_HOME = "C:\Users\YourUsername\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\tools\bin"
```

2. Verify setup:
```bash
adb version
java -version
```

#### Build Process
1. Generate native code:
```bash
npx expo prebuild --platform android
```

2. Build release APK:
```bash
cd android
.\gradlew clean
.\gradlew assembleRelease
```

3. APK location:
```
android/app/build/outputs/apk/release/app-release.apk
```

#### Keystore Configuration
The project includes a development keystore (`block-blast-release-key.keystore`) with password `blockblast123`. For production, generate your own keystore:

```bash
keytool -genkeypair -v -keystore your-release-key.keystore -alias your-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### EAS Build (Cloud)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Legacy Expo Build (Deprecated)
```bash
# Android
expo build:android

# iOS
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