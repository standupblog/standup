# SafeYouth Platform – Deployment Guide

A free, anonymous platform for youth facing abuse, addiction, and trauma. Features free courses with certificates, anonymous messaging via Telegram bot, blog/events management, and full admin panel.

## 🚀 Quick Deploy to Cloudflare (30 minutes)

### Prerequisites
- GitHub account
- Cloudflare account (free)
- Upstash account (free)
- Telegram account
- Cloudinary account (free)

---

## 📦 Part 1: GitHub Setup

```bash
# Clone or create your repository
git clone https://github.com/yourusername/safeyouth.git
cd safeyouth

# Add all your files (index.html, pages/, css/, js/, admin.html)
git add .
git commit -m "Initial SafeYouth platform"
git push origin main
