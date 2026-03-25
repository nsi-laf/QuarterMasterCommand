# ⚔️ Quartermaster Command

![Version](https://img.shields.io/badge/version-v8.0-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E)
![PWA](https://img.shields.io/badge/PWA-Ready-success)

**Quartermaster Command** (formerly *Jaegh's Refining Suite*) is the ultimate manufacturing calculator and logistics dashboard for **Mortal Online 2**. Designed for guild quartermasters, gatherers, and master crafters, this suite handles complex extraction math, market budgeting, and work-order dispatching in a sleek, offline-capable interface.

*"Steel wins battles, silver wins wars."* — [MTM] Jaegh

---

## ✨ Feature Overview

* 🧠 **Pipeline Intelligence:** Automatically maps out multi-step extraction, refining, and smelting tasks. The dynamic engine calculates whether to Crush, Grind, or Bake based on your global preferences (⭐ Most Efficient vs. 💎 Max Byproducts).
* ⚡ **Calculate Craftable:** Scans your current bank inventory to calculate the absolute maximum amount of target metal you can produce with your existing stockpile.
* 🛒 **Smart Market Cart:** Enter local market prices and buy quantities. Use *Auto-Fill All* to calculate exactly how much you need to buy to cover a deficit, tracking your **Total Gold Cost** in real-time.
* 💾 **Share & Import (Base64):** Generate a secure code of your current setup (Bank, Cart, Pipeline) to instantly share with guildmates or transfer between devices.
* 🚀 **Discord Dispatch:** Generates a beautifully formatted Markdown work order—separating Market Purchases from Manual Gathering—ready to be beamed directly to your guild's Discord server via Webhook.
* 📱 **PWA Ready:** Installable as a Progressive Web App on Desktop or Mobile. Fully cached for offline use.

---

## 🛠️ Architecture & Tech Stack

This project is built using **100% Vanilla Web Technologies** (HTML, CSS, JS). No external frameworks or dependencies are required, making it incredibly fast and easy to host anywhere.

### Modular Codebase
The core logic has been split into dedicated, maintainable modules:
* `data.js`: Houses the `EXTRACTION_ROUTES` and `RECIPES` dictionaries. Contains all the raw MO2 math, yields, and catalyst requirements.
* `engine.js`: The algorithmic brain. Topologically sorts required materials and dynamically builds the step-by-step pipeline.
* `pipeline.js`: Handles interactive step toggling, global routing overrides, and progress bar visualization.
* `market_bank.js`: Manages the interactive grid, math, and UI for the Inventory Bank and Market Cart.
* `discord.js`: Parses current state into Markdown and pushes payloads via the Discord Webhook API.
* `state.js`: Handles all `localStorage` saving, loading, and Base64 import/export logic.
* `theme.js` & `ui.js`: Controls custom hex-color theming, Light/Dark mode, modal popups, and module visibility.
* `lang.js`: Complete i18n support (currently English and French).

---

## 🚀 Installation & Usage

Because this is a static, client-side application, deployment is instant.

### Local Usage
1. Clone or download this repository.
2. Open `index.html` in any modern web browser.

### Hosting (GitHub Pages / Netlify / Vercel)
1. Push the repository to your preferred Git host.
2. Enable static hosting pointing to the root directory.
3. The included `sw.js` (Service Worker) and `manifest.json` will automatically allow users to install the app directly to their devices.

---

## 📖 Quick Start Guide

1. **Set Your Objective:** Select your *Target Metal* (e.g., Steel) and desired *Amount*. Set your *Crafters* count to automatically divide the workload.
2. **Check Your Bank:** Input your current inventory into the *Inventory Bank*. 
   > *Tip: If you don't know what to make, enter your materials and click **⚡ Calculate Craftable From Inventory** to see your limits.*
3. **Go Shopping:** Check the *Market Cart* module. Set local prices, then click **🛒 Auto-Fill All** to calculate your missing deficit and required gold budget.
4. **Dispatch the Order:** Review the *Deficit to Gather* and *Manufacturing Pipeline*. Go to **Settings > Integrations** and push the order to your Discord logistics channel.

---

## 🎨 Customization

Navigate to the **Settings** menu to fully personalize your Quartermaster Command:
* Toggle between Light Mode and Dark Mode.
* Set custom hex values for the Primary Accent, Background, and Text colors.
* Hide or show specific modules to streamline your dashboard.
* Switch between **Units** or **Stacks (10k)** display formats.

---

## 📜 License & Credits

* **Author:** Created by [MTM] Jaegh for the MERCANTORM guild.
* **Game:** Mortal Online 2 by Star Vault AB. (This tool is a fan-made project and is not affiliated with Star Vault).

---
*Happy Refining.*
