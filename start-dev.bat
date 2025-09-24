@echo off
echo Block Blast Pro - Development Setup
echo ====================================

echo.
echo Checking Node.js version...
node --version

echo.
echo Current Node.js version may not be compatible with Expo.
echo Please install Node.js v18 for best compatibility.
echo.

echo Attempting to start with compatibility flags...
set NODE_OPTIONS=--no-experimental-strip-types
npm start

pause

