# ⚡ KeepItAlive — Universal Server Anti-Sleep & Keep-Alive Studio

> **An open-source, Editorial Bento Keep-Alive Studio designed to prevent free-tier cloud platforms (Render, Koyeb, Glitch, Supabase, Railway, Fly.io, Replit) from putting your web applications to sleep.**

🌐 **Live Demo Website:** [https://mahesh-more1.github.io/keep-it-alive/](https://mahesh-more1.github.io/keep-it-alive/)

---

## 🌟 Why KeepItAlive?

Free cloud hosting providers enforce strict **idle timeout rules** to save server RAM and CPU cores:
* **Render Free Web Services**: Container goes to sleep after **15 minutes** of no HTTP traffic.
* **Glitch & Replit**: Projects sleep after **4–5 minutes** of inactivity.
* **Koyeb & Fly.io**: Free web services auto-suspend when idle.
* **MongoDB Atlas**: M0 free clusters pause after 60 days of zero database connections.

When a user visits your application after inactivity, the host must spin up the server container from scratch—causing a **30 to 60-second delay** called a **Cold Start**.

**KeepItAlive** solves this by routinely sending automated, lightweight HTTP pings (`GET` or `HEAD`) every 5–10 minutes to your live backend URLs. This resets the provider's idle countdown timer and keeps your server container warm in memory 24/7/365.

---

## ✨ Features

- 🌐 **Live Web Application**: Hosted on GitHub Pages at [https://mahesh-more1.github.io/keep-it-alive/](https://mahesh-more1.github.io/keep-it-alive/)
- 🎨 **Modern Editorial Minimalist & Bento Tech UI**: Clean 12-column Bento grid architecture with **Plus Jakarta Sans** and **Outfit** typography.
- ⚡ **Multi-Platform Target Manager**: Supports Render, Koyeb, Glitch, Supabase, MongoDB Atlas, Railway, Fly.io, Replit, Back4App, Vercel, and Custom APIs.
- 📊 **Real-Time Latency Spectrum**: Visualizes response times (in ms) of your last 10 pings per application with instant color indicators.
- 📜 **Live Telemetry Log Stream**: Full activity log table with timestamped HTTP codes, response durations, search filter, and CSV export.
- 🤖 **24/7 GitHub Actions Worker Generator**: 1-click workflow generator (`keep_it_alive.yml`) that pings your backends automatically from GitHub's free cloud infrastructure—**even when your PC is turned off!**

---

## 📊 Cloud Platform Conditions & Keep-Alive Policy Matrix

| Hosting Platform | Idle Sleep Condition | Cold Start Delay | Recommended Ping Frequency | Safety & Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Render** | Spins down after **15 min** of no HTTP traffic | 30s to 60s delay | Every 10 to 14 minutes | 100% Safe (resets 15m idle timer) |
| **Koyeb** | Free web instances pause when idle | 15s to 30s delay | Every 10 minutes | Safe & highly effective |
| **Glitch** | Project sleeps after **5 min** of inactivity | 10s to 20s delay | Every 4 minutes | Required for constant availability |
| **Replit** | Repls sleep shortly after tab closes | 5s to 15s delay | Every 4 minutes | Keeps Repl instance awake |
| **Fly.io** | Machines auto-suspend when idle | 2s to 5s delay | Every 10 minutes | Keeps machines warm in memory |
| **Supabase** | Free DB pauses after 7 days of inactivity | Manual unpause | Every 14 minutes (to API) | Keeps connected DB active |
| **MongoDB Atlas** | M0 Cluster pauses after 60 days zero DB conn | Resumes on connection | Every 14 minutes (to API) | Maintains active Mongoose pool |
| **Vercel (Frontend)**| Never sleeps (Served on global Edge CDN) | 0 ms (Instant) | Not required for static UI | Pinging unnecessary for static UI |

---

## 🚀 Quick Start Guide

### Live Web Application
Use the hosted app directly at:  
👉 **[https://mahesh-more1.github.io/keep-it-alive/](https://mahesh-more1.github.io/keep-it-alive/)**

### Clone & Run Locally

```bash
# Clone repository
git clone https://github.com/Mahesh-more1/keep-it-alive.git
cd keep-it-alive

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open **`http://localhost:5190`** in your browser.

---

## 🤖 Setting Up 24/7 GitHub Actions Cloud Worker

To keep your servers active **24/7 without keeping your computer on**:

1. In your GitHub repository, create the directory structure:
   ```bash
   .github/workflows/
   ```
2. Create a file named **`keep_it_alive.yml`**.
3. Copy the workflow YAML code generated inside the **24/7 Cloud Worker** tab of KeepItAlive Studio.

---

## 📄 License

Distributed under the **MIT License**. Open-source for everyone to host and use!
