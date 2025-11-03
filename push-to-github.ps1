# PowerShell script to push all files to GitHub
Write-Host "========================================" -ForegroundColor Green
Write-Host "Pushing ALL files to GitHub..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Add all files
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host ""

# Commit with message
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Complete portfolio with AI chatbot, publications page, and Vercel deployment config"

Write-Host ""

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ ALL FILES PUSHED TO GITHUB!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://vercel.com" -ForegroundColor White
Write-Host "2. Import your GitHub repository" -ForegroundColor White
Write-Host "3. Deploy automatically!" -ForegroundColor White
Write-Host ""

pause

