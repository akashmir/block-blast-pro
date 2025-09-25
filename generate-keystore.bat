@echo off
echo Generating keystore for Block Blast Pro...
echo.
echo You will be prompted to enter:
echo 1. Keystore password (remember this!)
echo 2. Key password (can be same as keystore password)
echo 3. Your name and organization details
echo.
echo Press any key to continue...
pause >nul

"C:\Program Files\Java\jdk-23\bin\keytool.exe" -genkeypair -v -keystore block-blast-release-key.keystore -alias block-blast-key-alias -keyalg RSA -keysize 2048 -validity 10000

echo.
echo Keystore generated successfully!
echo File: block-blast-release-key.keystore
echo Alias: block-blast-key-alias
echo.
pause
