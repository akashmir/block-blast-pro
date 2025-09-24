# Block Blast Pro - Deployment Guide

## Pre-Deployment Checklist

### Development Environment Setup
- [ ] Node.js 16+ installed
- [ ] Expo CLI installed globally
- [ ] Android Studio (for Android builds)
- [ ] Xcode (for iOS builds)
- [ ] Git configured with proper credentials

### Account Setup
- [ ] Google Play Console account
- [ ] Apple Developer account
- [ ] AdMob account
- [ ] Firebase project
- [ ] Expo account

## Configuration Steps

### 1. Environment Configuration

Create environment files for different stages:

```bash
# .env.development
EXPO_PUBLIC_API_URL=https://dev-api.blockblastpro.com
EXPO_PUBLIC_ADMOB_APP_ID=ca-app-pub-3940256099942544~3347511713
EXPO_PUBLIC_FIREBASE_PROJECT_ID=block-blast-pro-dev

# .env.production
EXPO_PUBLIC_API_URL=https://api.blockblastpro.com
EXPO_PUBLIC_ADMOB_APP_ID=ca-app-pub-1234567890123456~1234567890
EXPO_PUBLIC_FIREBASE_PROJECT_ID=block-blast-pro-prod
```

### 2. App Configuration

Update `app.json` for production:

```json
{
  "expo": {
    "name": "Block Blast Pro",
    "slug": "block-blast-pro",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "blockblastpro",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.blockblastpro.app",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.blockblastpro.app",
      "versionCode": 1
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    }
  }
}
```

### 3. AdMob Configuration

Replace test ad unit IDs with production IDs:

```typescript
// services/ads/AdMobService.ts
const AD_UNIT_IDS: AdConfig = {
  bannerAdUnitId: Platform.OS === 'ios' 
    ? 'ca-app-pub-1234567890123456/1234567890' // Production iOS Banner
    : 'ca-app-pub-1234567890123456/0987654321', // Production Android Banner
  interstitialAdUnitId: Platform.OS === 'ios'
    ? 'ca-app-pub-1234567890123456/2345678901' // Production iOS Interstitial
    : 'ca-app-pub-1234567890123456/1098765432', // Production Android Interstitial
  rewardedAdUnitId: Platform.OS === 'ios'
    ? 'ca-app-pub-1234567890123456/3456789012' // Production iOS Rewarded
    : 'ca-app-pub-1234567890123456/2109876543', // Production Android Rewarded
};
```

### 4. Firebase Configuration

#### Android Setup
1. Download `google-services.json` from Firebase Console
2. Place in `android/app/` directory
3. Update `android/build.gradle`:

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

4. Update `android/app/build.gradle`:

```gradle
apply plugin: 'com.google.gms.google-services'
```

#### iOS Setup
1. Download `GoogleService-Info.plist` from Firebase Console
2. Add to Xcode project
3. Update `ios/Podfile`:

```ruby
pod 'Firebase/Analytics'
pod 'Firebase/Crashlytics'
```

### 5. In-App Purchase Configuration

#### iOS (App Store Connect)
1. Create app in App Store Connect
2. Add in-app purchase products:
   - Remove Ads: $2.99
   - Power-up Pack: $0.99
   - Premium Themes: $1.99
   - Premium Subscription: $4.99/month
3. Update product IDs in `services/purchases/PurchaseService.ts`

#### Android (Google Play Console)
1. Create app in Google Play Console
2. Add in-app products with same pricing
3. Update product IDs in `services/purchases/PurchaseService.ts`

## Build Process

### 1. Development Build

```bash
# Start development server
expo start

# Run on specific platform
expo start --ios
expo start --android
expo start --web
```

### 2. Preview Build

```bash
# Build for testing
expo build:android --type apk
expo build:ios --type simulator
```

### 3. Production Build

#### Android (APK)
```bash
expo build:android --type apk --release-channel production
```

#### Android (AAB for Play Store)
```bash
expo build:android --type app-bundle --release-channel production
```

#### iOS (App Store)
```bash
expo build:ios --type archive --release-channel production
```

### 4. EAS Build (Recommended)

Install EAS CLI:
```bash
npm install -g @expo/eas-cli
```

Configure EAS:
```bash
eas build:configure
```

Build commands:
```bash
# Android
eas build --platform android --profile production

# iOS
eas build --platform ios --profile production

# Both platforms
eas build --platform all --profile production
```

## Store Submission

### Google Play Store

1. **Prepare Store Listing**:
   - App title: "Block Blast Pro"
   - Short description: "Addictive block puzzle game with smooth gameplay"
   - Full description: Use content from README.md
   - Screenshots: Take screenshots on different devices
   - App icon: 512x512 PNG
   - Feature graphic: 1024x500 PNG

2. **Upload APK/AAB**:
   - Upload production build
   - Test on internal testing track first
   - Promote to closed testing
   - Finally release to production

3. **Content Rating**:
   - Complete content rating questionnaire
   - Target audience: Everyone
   - Content descriptors: None

4. **Pricing & Distribution**:
   - Set as free app
   - Select countries for distribution
   - Set up in-app products

### Apple App Store

1. **Prepare App Store Connect**:
   - App name: "Block Blast Pro"
   - Subtitle: "Block Puzzle Game"
   - Description: Use content from README.md
   - Keywords: "puzzle,block,game,casual"
   - Category: Games > Puzzle

2. **Upload Build**:
   - Upload production build via Xcode or EAS
   - Test on TestFlight first
   - Submit for review

3. **App Review Information**:
   - Provide demo account if needed
   - Explain any special features
   - Include testing notes

4. **Pricing & Availability**:
   - Set as free app
   - Select territories
   - Set up in-app purchases

## Post-Deployment

### 1. Monitoring Setup

#### Firebase Analytics
- Set up custom dashboards
- Configure alerts for crashes
- Monitor user engagement metrics

#### AdMob
- Monitor ad performance
- Optimize ad placement
- Track revenue metrics

#### App Store Analytics
- Monitor download numbers
- Track user ratings
- Respond to reviews

### 2. Launch Strategy

#### Soft Launch
1. Release in select markets first
2. Gather user feedback
3. Fix critical issues
4. Optimize based on data

#### Global Launch
1. Release in all markets
2. Promote on social media
3. Submit to app review sites
4. Run advertising campaigns

### 3. Maintenance Schedule

#### Daily
- Monitor crash reports
- Check user reviews
- Review analytics data

#### Weekly
- Update dependencies
- Analyze performance metrics
- Plan content updates

#### Monthly
- Release bug fixes
- Add new features
- Optimize monetization

## Troubleshooting

### Common Build Issues

#### Android Build Fails
```bash
# Clear cache
expo r -c

# Update dependencies
npm update

# Check Android SDK
android list targets
```

#### iOS Build Fails
```bash
# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Update pods
cd ios && pod install

# Check Xcode version
xcodebuild -version
```

#### EAS Build Issues
```bash
# Check EAS status
eas build:list

# View build logs
eas build:view [BUILD_ID]

# Cancel stuck builds
eas build:cancel [BUILD_ID]
```

### Store Rejection Issues

#### Google Play Rejection
- Fix policy violations
- Update app description
- Provide additional information
- Resubmit after fixes

#### App Store Rejection
- Address review feedback
- Fix technical issues
- Update metadata
- Resubmit for review

## Security Considerations

### Code Protection
- Obfuscate production builds
- Use environment variables for secrets
- Implement proper error handling
- Validate all user inputs

### Data Protection
- Encrypt sensitive data
- Use secure storage
- Implement proper authentication
- Follow GDPR/CCPA guidelines

### Network Security
- Use HTTPS for all API calls
- Implement certificate pinning
- Validate SSL certificates
- Use secure communication protocols

## Performance Optimization

### Build Optimization
- Enable code splitting
- Optimize bundle size
- Use tree shaking
- Implement lazy loading

### Runtime Optimization
- Optimize images
- Implement caching
- Use efficient algorithms
- Monitor memory usage

### Network Optimization
- Implement request caching
- Use compression
- Optimize API calls
- Implement offline support
