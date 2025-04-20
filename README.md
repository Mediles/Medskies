
---

# Medskies Analytics 📊

**A real-time analytics dashboard for Minehut servers.**  
Track live server activity, analyze trends, and manage favorites — all in a sleek, responsive interface.

---

## 🚀 Live Demo

👉 [Launch Medskies Analytics](https://mediles.github.io/Medskies/) – ZERO installs required!

---

## ✨ Features

- 🔍 **Live Server Monitoring** – Real-time tracking of active Minehut servers and player counts  
- 🧠 **Server Intelligence** – MOTD parsing, category tags, and detailed server metadata  
- ⭐ **Favorites System** – Save and monitor your favorite servers (stored locally)  
- ⚡ **Instant Search & Filtering** – Real-time server search and dynamic filtering  
- 🎨 **Category Tags** – Color-coded labels to quickly classify and browse  
- 📱 **Responsive Design** – Works smoothly on desktop, tablet, and mobile

---


## 🛠️ Tech Stack

- **Frontend**: Vanilla JS, HTML5, CSS3  
- **API**: [Minehut Public API](https://api.minehut.com/)  
- **Icons**: Material Design Icons  
- **Fonts**: Inter (via Google Fonts)  
- **Storage**: Browser LocalStorage

---

## 💻 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/mediles/Medskies.git

# 2. Open in browser (any of the following):

# Option A: Python HTTP Server
python -m http.server 8000

# Option B: VS Code Live Server
code . # then right-click index.html → "Open with Live Server"
```

---

## 🔍 Feature Breakdown

### 🖥️ Server Tracking
- Real-time status & player monitoring  
- MOTD parsing with color formatting  
- Categorization using tags (PvP, Minigame, Economy, etc.)

### ⭐ Favorites System
- Add/remove favorites with a single click  
- Stored locally across sessions  
- Fast access panel for tracked servers

### 🔎 Search & Filter
- Instant filtering by server name  
- Sort by category or player count  
- Category-based toggle filtering

### 🎨 UI Components
- **Command Center**: Global filters & stats  
- **Server Cards**: Clean and compact info blocks  
- **Status Indicators**: Real-time status colors  
- **Category Tags**: Color-coded labels  
- **Details Modal**: Expanded view with deep server data  

---

## 🧭 Roadmap & Future Enhancements

- 🔄 Auto-refresh toggle with sync indicator  
- 🔧 Configurable tag system with custom categories  
- 📊 Trend tracking (player history, uptime graphs)  
- 🔐 Optional login for syncing favorites

---

## 🔌 API Integration

Powered by Minehut's public API:
- `/servers` – Live list of servers  
- `/server/{name}` – Individual server details  
- Rate-limit aware with graceful error handling

---

## 🤝 Contributions

Open source and community-driven!  
Feel free to submit pull requests or suggest improvements via Issues.

---

## 📜 License

Licensed under the **GNU GPL v3.0**.  
You’re free to use, modify, and redistribute under the following terms:

- Include source code when sharing  
- Derivative works must also use GPL-3.0  
- Credit all contributors (like @Mediles & @WiseDodge 💡)

---
### 👥 Credits

Crafted with ❤️ by **Mediles**  
Large contributions and design support by **WiseDodge**

---
