# 🚀 Building APK for Block Blast Pro

## Prerequisites
- Expo account (free)
- EAS CLI installed
- Node.js v18 (already installed)

## Step 1: Install EAS CLI
Open a **new PowerShell terminal** (to avoid Node.js PATH issues) and run:
```bash
npm install -g eas-cli
```

**Alternative (no global install):**
```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

## Step 2: Login to Expo
```bash
eas login
```
Enter your Expo account credentials.

## Step 3: Configure Project
```bash
cd "C:\Users\Akash\Desktop\Block Blast"
eas build:configure
```

## Step 4: Build APK
### For Testing (Preview Build):
```bash
eas build --platform android --profile preview
```

### For Production:
```bash
eas build --platform android --profile production
```

## Step 5: Download APK
1. Visit the build URL provided in terminal
2. Download the APK file
3. Install on Android device

## Alternative: Local Build (Advanced)
If you want to build locally without EAS:

### Install Android Studio
1. Download Android Studio
2. Install Android SDK
3. Set up environment variables

### Build Locally
```bash
npx expo run:android
```

## Troubleshooting

### Node.js PATH Issues
If you get Node.js errors:
1. Open **new PowerShell terminal**
2. Navigate to project: `cd "C:\Users\Akash\Desktop\Block Blast"`
3. Verify Node.js: `node --version` (should show v18.20.4)

### Build Errors
- Check `app.json` configuration
- Verify all dependencies are installed
- Ensure internet connection for EAS builds

## Build Profiles Explained

### Preview Profile
- **Purpose**: Testing and internal distribution
- **Size**: Smaller, faster build
- **Features**: All game features included
- **Distribution**: Can be shared with testers

### Production Profile
- **Purpose**: App store release
- **Size**: Optimized for production
- **Features**: All features + optimizations
- **Distribution**: Ready for Google Play Store

## Expected Build Time
- **EAS Build**: 10-15 minutes
- **Local Build**: 5-10 minutes (after setup)

## APK Size
- **Preview**: ~15-25 MB
- **Production**: ~10-20 MB (optimized)

## Next Steps After APK
1. Test APK on Android device
2. Share with beta testers
3. Submit to Google Play Store
4. Configure real services (AdMob, Analytics)

---

**Note**: EAS Build requires internet connection and Expo account. Local builds require Android Studio setup.
