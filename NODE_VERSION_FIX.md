# Node.js Version Compatibility Fix

## Issue
You're experiencing a TypeScript stripping error with Node.js v22.19.0 and Expo. This is a known compatibility issue.

## Solution Options

### Option 1: Use Node Version Manager (Recommended)

#### Install NVM for Windows
1. Download NVM for Windows from: https://github.com/coreybutler/nvm-windows/releases
2. Install the latest version
3. Restart your command prompt/PowerShell

#### Switch to Node.js v18
```bash
# Install Node.js v18 (LTS)
nvm install 18.19.0

# Use Node.js v18
nvm use 18.19.0

# Verify version
node --version
```

#### Start the project
```bash
npm start
```

### Option 2: Use Yarn instead of npm
```bash
# Install Yarn globally
npm install -g yarn

# Install dependencies with Yarn
yarn install

# Start with Yarn
yarn start
```

### Option 3: Use EAS CLI (Cloud Build)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Start development build
eas build --platform android --profile development
```

### Option 4: Use Expo Go App
1. Install Expo Go on your phone from App Store/Play Store
2. Use the QR code from the web interface
3. Scan with Expo Go app

## Recommended Next Steps

1. **Install NVM and switch to Node.js v18** (Option 1)
2. **Run the project**: `npm start`
3. **Test on web**: Open http://localhost:8081
4. **Test on mobile**: Use Expo Go app

## Alternative: Use Docker
If you prefer not to change Node.js versions, you can use Docker:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "start"]
```

## Troubleshooting

### If NVM doesn't work on Windows:
1. Use Chocolatey: `choco install nodejs --version=18.19.0`
2. Or download Node.js v18 directly from nodejs.org

### If you want to keep Node.js v22:
1. Wait for Expo to update compatibility
2. Use EAS Build for cloud development
3. Use React Native CLI instead of Expo

## Current Status
- Node.js v22.19.0: ❌ Not compatible
- Node.js v18.19.0: ✅ Compatible
- Node.js v20.x: ⚠️ May work with some issues

