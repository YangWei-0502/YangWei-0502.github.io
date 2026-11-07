# 个人网站一键启动（Windows PowerShell）
# 用法：
#   .\start.ps1          # 开发模式（npm run dev，http://localhost:3000）
#   .\start.ps1 build    # 静态构建到 out/（构建后可用任意静态服务器托管）
param([string]$Mode = "dev")
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "安装依赖（npm install）..." -ForegroundColor Yellow
    npm install
}

if ($Mode -eq "build") {
    Write-Host "静态构建到 out/ ..." -ForegroundColor Yellow
    npm run build
    Write-Host "构建完成：out\（可直接用 nginx / 静态托管部署）" -ForegroundColor Green
} else {
    Write-Host "启动开发服务器 http://localhost:3000 ..." -ForegroundColor Yellow
    npm run dev
}
