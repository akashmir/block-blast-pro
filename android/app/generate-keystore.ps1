# Generate keystore for Block Blast Pro
Write-Host "Generating keystore for Block Blast Pro..." -ForegroundColor Green
Write-Host ""
Write-Host "Using development password: 'blockblast123'" -ForegroundColor Yellow
Write-Host ""

$keytoolPath = "C:\Program Files\Java\jdk-23\bin\keytool.exe"
$keystoreFile = "block-blast-release-key.keystore"
$alias = "block-blast-key-alias"
$password = "blockblast123"

# Generate keystore with predefined values
& $keytoolPath -genkeypair -v -keystore $keystoreFile -alias $alias -keyalg RSA -keysize 2048 -validity 10000 -storepass $password -keypass $password -dname "CN=Block Blast Pro, OU=Development, O=Block Blast Pro, L=City, S=State, C=US"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Keystore generated successfully!" -ForegroundColor Green
    Write-Host "File: $keystoreFile" -ForegroundColor Cyan
    Write-Host "Alias: $alias" -ForegroundColor Cyan
    Write-Host "Password: $password" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "❌ Failed to generate keystore" -ForegroundColor Red
}
