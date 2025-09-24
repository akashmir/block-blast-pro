# Block Blast Pro - Development Setup Script
Write-Host "Block Blast Pro - Development Setup" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

Write-Host ""
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "Current Node.js version: $nodeVersion" -ForegroundColor Cyan

Write-Host ""
if ($nodeVersion -like "v22*") {
    Write-Host "WARNING: Node.js v22 has compatibility issues with Expo" -ForegroundColor Red
    Write-Host "Recommended: Install Node.js v18 for best compatibility" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "1. Install NVM and switch to Node.js v18" -ForegroundColor White
    Write-Host "2. Use EAS CLI for cloud development" -ForegroundColor White
    Write-Host "3. Try with compatibility flags (may not work)" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1-3)"
    
    switch ($choice) {
        "1" {
            Write-Host "Please install NVM for Windows and switch to Node.js v18" -ForegroundColor Yellow
            Write-Host "Download from: https://github.com/coreybutler/nvm-windows/releases" -ForegroundColor Cyan
            exit
        }
        "2" {
            Write-Host "Installing EAS CLI..." -ForegroundColor Yellow
            npm install -g @expo/eas-cli
            Write-Host "Please run: eas login" -ForegroundColor Yellow
            exit
        }
        "3" {
            Write-Host "Attempting to start with compatibility flags..." -ForegroundColor Yellow
            $env:NODE_OPTIONS = "--no-experimental-strip-types"
            npm start
        }
        default {
            Write-Host "Invalid choice. Exiting." -ForegroundColor Red
            exit
        }
    }
} else {
    Write-Host "Node.js version looks compatible. Starting development server..." -ForegroundColor Green
    npm start
}

