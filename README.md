
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

## 🏗️ Project Structure

```
public/
├── css/                 # Modular CSS components
│   ├── global.css       # Base styling and variables
│   ├── header.css       # Command center header styles
│   ├── controls.css     # Search and filter controls
│   ├── server-list.css  # Server grid and card styles
│   ├── modal.css        # Server details modal styles
│   ├── status.css       # Loading and error states
│   ├── footer.css       # Footer styles
│   ├── responsive.css   # Media queries for responsiveness
│   └── favorites.css    # Styles for the favorites section
├── external/            # JavaScript modules
│   ├── components/      # Reusable JS components
│   │   ├── api/         # API interaction logic
│   │   │   └── minehutService.js
│   │   ├── card/        # Server card component
│   │   │   └── serverCard.js
│   │   ├── display/     # Logic for displaying server lists
│   │   │   └── displayManager.js
│   │   ├── favorites/   # Favorites management
│   │   │   ├── favoritesManager.js
│   │   │   └── favoritesDisplay.js
│   │   ├── modal/       # Server details modal component
│   │   │   └── serverModal.js
│   │   ├── search/      # Search functionality
│   │   │   └── searchManager.js
│   │   └── ui/          # General UI utilities
│   │       ├── domElements.js
│   │       └── formatUtils.js
│   └── main.js          # Main application logic
├── data/                # Static data files
├── views/               # HTML partials
└── index.html           # Main entry point
```

---

## 🛠️ Tech Stack

- **Frontend Architecture**: Modular JavaScript components
- **Styling**: Component-based CSS architecture
- **API Integration**: Dedicated `minehutService.js` for Minehut API

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

## 🔍 Component Breakdown

### 🖥️ Core Components
- **API Service** (`minehutService.js`) – Handles all Minehut API interactions with rate limiting and error handling.
- **Display Manager** (`displayManager.js`) – Controls the rendering and updating of server lists and manages loading/error states.
- **Server Card** (`serverCard.js`) – Reusable component for displaying individual server information.
- **Search Manager** (`searchManager.js`) – Implements real-time server search functionality.
- **Favorites Manager** (`favoritesManager.js`) – Manages the storage and retrieval of favorite servers using local storage.
- **Favorites Display** (`favoritesDisplay.js`) – Handles the display of the user's favorite servers.
- **Server Modal** (`serverModal.js`) – Component for displaying detailed information about a selected server.
- **Format Utilities** (`formatUtils.js`) – Provides shared functions for data formatting, such as MOTD parsing.
- **DOM Elements** (`domElements.js`) – Centralized selection of key DOM elements.

### 🎨 Styling Modules
- **Global Styles** (`global.css`) – Defines base styles, color palettes, and CSS variables.
- **Controls** (`controls.css`) – Styles for search input, filter chips, and other interactive elements.
- **Server List** (`server-list.css`) – Styles for the grid layout and individual server cards.
- **Modal** (`modal.css`) – Styles for the server details modal window.
- **Status** (`status.css`) – Styles for loading indicators and error messages.
- **Footer** (`footer.css`) – Styling for the application footer.
- **Responsive** (`responsive.css`) – Media queries to ensure the layout adapts to different screen sizes.
- **Favorites** (`favorites.css`) – Specific styles for the favorites section and its display.

---

## 🔌 API Integration

Enhanced Minehut API integration with:
- Rate limiting protection
- Error handling with recovery mechanisms
- Asynchronous fetching of detailed server metadata

---

## 🤝 Contributions

We follow strict commit message guidelines - see `docs/COMMIT_RULES.md` for details.
Feel free to submit pull requests or suggest improvements via Issues.

---

## 📜 License

Licensed under the **GNU GPL v3.0**.
You’re free to use, modify, and redistribute under the following terms:

- Include source code when sharing
- Derivative works must also use GPL-3.0
- Credit all contributors

---
### 👥 Credits

Crafted with ❤️ by **Mediles**
Large contributions and design support by **WiseDodge**

---
