# Favicon Generator Script for ZESHO
# This script helps create multiple favicon formats from your existing Favicon.webp

Write-Host "ZESHO Favicon Setup Guide" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Current favicon setup includes:" -ForegroundColor Green
Write-Host "✅ Enhanced HTML meta tags with multiple format support"
Write-Host "✅ Web App Manifest (site.webmanifest) for PWA support"
Write-Host "✅ Browser Config (browserconfig.xml) for Windows tiles"
Write-Host "✅ Proper theme colors (#7c3aed - ZESHO violet)"

Write-Host ""
Write-Host "To complete the favicon setup:" -ForegroundColor Yellow
Write-Host "1. Convert your existing Favicon.webp to PNG formats"
Write-Host "2. Create the following files in /public/ directory:"
Write-Host "   - favicon-16x16.png (16x16 pixels)"
Write-Host "   - favicon-32x32.png (32x32 pixels)" 
Write-Host "   - apple-touch-icon.png (180x180 pixels)"
Write-Host "   - safari-pinned-tab.svg (SVG format)"

Write-Host ""
Write-Host "Recommended tools:" -ForegroundColor Magenta
Write-Host "• Online: https://favicon.io/favicon-converter/"
Write-Host "• Online: https://realfavicongenerator.net/"
Write-Host "• Software: GIMP, Photoshop, or Canva"

Write-Host ""
Write-Host "Manual conversion steps:" -ForegroundColor Blue
Write-Host "1. Upload your Favicon.webp to https://favicon.io/favicon-converter/"
Write-Host "2. Download the generated ZIP file"
Write-Host "3. Extract and copy these files to /public/:"
Write-Host "   - favicon-16x16.png"
Write-Host "   - favicon-32x32.png"
Write-Host "   - apple-touch-icon.png"
Write-Host "4. Your favicon setup will be complete!"

Write-Host ""
Write-Host "Current files in public directory:" -ForegroundColor White
Get-ChildItem -Path "." -Name "Favicon*", "*.webmanifest", "browserconfig.xml" 2>$null | ForEach-Object { 
    Write-Host "📁 $_" 
}

Write-Host ""
Write-Host "Favicon setup is now configured in HTML!" -ForegroundColor Green
