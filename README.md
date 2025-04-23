
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
- ⭐ **Favorites System** – Save and monitor your favorite servers (stored locally) – **Improved stability and multi-server tracking!**
- ⚡ **Instant Search & Filtering** – Real-time server search and dynamic filtering
- 🎨 **Category Tags** – Color-coded labels to quickly classify and browse – **Reliable category display!**
- ✅ **Intuitive Details Modal** – Expanded view with deep server data and a **fully functional close button!**
- 📱 **Responsive Design** – Works smoothly on desktop, tablet, and mobile
- 🖱️ **Click-to-Copy** (Coming Soon) – Easily copy server IP and join commands.
- ℹ️ **Enhanced Server Details** (Coming Soon) – More comprehensive server information including platform, creation date, plan, and more.
- 🖼️ **Server Icons** (Coming Soon) – Display server icons for visual identification.
- 📊 **Grid/Table and List Modes** (Coming Soon) – Switch between different server viewing layouts.
- 🌑 **Modern UI Aesthetic** (Coming Soon) – A refreshed and modern dark theme and UI design.
- ⚔️ **PvP Category Symbol** (Coming Soon) – Distinct visual for PvP servers.
- 🚫 **No Search Results Feedback** (Coming Soon) – Clear message when no servers match the search.
- 💨 **Efficient Data Caching** (Coming Soon) – Improved performance through client-side data caching.

---


## 🛠️ Tech Stack

- **Frontend**: Vanilla JS, HTML5, CSS3
- **API**: [Minehut Public API](https://api.minehut.com/)
- **Icons**: Material Design Icons
- **Fonts**: Inter (via Google Fonts)
- **Storage**: Browser LocalStorage
- **Table View**: gridjs (Coming Soon, if implemented with this library)

---

## 💻 Local Development

```bash
# 1. Clone the repo
git clone [https://github.com/mediles/Medskies.git](https://github.com/mediles/Medskies.git)

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
- **Server Icons** (Coming Soon): Visual icons displayed next to server names.
- **View Mode Toggle** (Coming Soon): Buttons to switch between grid/card and list views.

---

## 🧭 Roadmap & Future Enhancements

**Next Up (High Priority):**

### UI/UX Improvements
- [ ] Fix offline button display
- [ ] Add click-to-copy functionality in server details
- [ ] Enhanced server details modal
- [ ] Add server icon before server name
- [ ] Implement Grid/Table and List Modes
- [ ] Adopt a Modern UI Aesthetic (Dark Theme, etc.)
- [ ] Display "No search results" message
- [ ] Efficiently cache server detailed data

### API Data Management
- [ ] Optimize API response handling
- [ ] Advanced server relationship tracking

### Medium Priority
- [ ] Make buttons interactive
- [ ] Create community-driven rating system (may or may not be implemented)
- [ ] Implement smart server recommendations (tba)
- [ ] Add server event notifications

### Low Priority
- [ ] Enhance data visualization
- [ ] Implement advanced search features
- [ ] Set up mkdocs for project documentation.
- [ ] Add repository link in footer

---

## 🔌 API Integration

Powered by Minehut's public API:
- `/servers` – Live list of servers
- `/server/{name}` – Individual server details
- Rate-limit aware with graceful error handling

---

## 🤝 Contributions

Open source and community-driven!
Feel free to submit pull requests or suggest improvements via Issues. We're particularly looking for contributions in:

- **UI/UX Design:** Ideas and implementation for the modern UI aesthetic.
- **Front-end Development:** Implementing the Grid/Table list view (potentially using `gridjs` or other suitable libraries).
- **Feature Implementation:** Helping with any of the upcoming features listed in the roadmap.

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
