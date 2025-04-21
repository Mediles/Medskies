// Server card component for displaying server information

import { parseMotdFormatting } from '../ui/formatUtils.js';

// Category color mapping and display order
const categoryColors = {
    "pvp": { label: "⚔ PvP", color: "#DF3D4B" },
    "lifesteal": { label: "❤️ Lifesteal", color: "#70C8D2" },
    "smp": { label: "🏡 SMP", color: "#0DC255" },
    "gens": { label: "⚡ Gens", color: "#484372" },
    "box": { label: "📦 Box", color: "#A068B7" },
    "minigames": { label: "🎉 Minigames", color: "#F6BC51" },
    "rpg": { label: "🛡️ RPG", color: "#982341" },
    "roleplay": { label: "🎭 Roleplay", color: "#D384F2" },
    "parkour": { label: "🤸 Parkour", color: "#DE916C" },
    "farming": { label: "🌾 Farming", color: "#B44176" },
    "prison": { label: "⛓️ Prison", color: "#188643" },
    "factions": { label: "🚩 Factions", color: "#C4E04A" },
    "puzzle": { label: "🧩 Puzzle", color: "#85827B" },
    "meme": { label: "😂 Meme", color: "#12BF59" },
    "creative": { label: "🎨 Creative", color: "#2F7D7C" }
};

const categoryOrder = [
    "pvp", "lifesteal", "smp", "gens", "box", "minigames", "rpg",
    "roleplay", "parkour", "farming", "prison", "factions", "puzzle", "meme", "creative"
];

// Create a server card element
function createServerCard(server, index, isFavorite = false, onFavoriteToggle, onServerClick) {
    const serverCard = document.createElement('div');
    serverCard.className = 'server-card';
    serverCard.dataset.serverId = server._id;

    // Add click event to show server details
    serverCard.addEventListener('click', () => onServerClick(server));

    // Main info line
    const mainInfo = document.createElement('div');
    mainInfo.className = 'server-main-info';

    // Rank
    if (index !== null && !isFavorite) {
        const rankElement = document.createElement('span');
        rankElement.className = `server-rank ${index < 3 ? 'top-3' : ''}`;
        rankElement.textContent = `#${index + 1}`;
        mainInfo.appendChild(rankElement);
    }

    // Server name
    const nameElement = document.createElement('span');
    nameElement.className = 'server-name';
    nameElement.textContent = server.name;
    mainInfo.appendChild(nameElement);

    // Player count
    const playersElement = document.createElement('span');
    playersElement.className = 'server-players';
    playersElement.textContent = `${server.playerData ? server.playerData.playerCount : 0} Online`;
    mainInfo.appendChild(playersElement);

    // Status
    const statusElement = document.createElement('span');
    statusElement.className = `server-status ${server.online ? 'online' : 'offline'}`;
    statusElement.textContent = server.online ? 'Online' : 'Offline';
    mainInfo.appendChild(statusElement);

    serverCard.appendChild(mainInfo);

    // Category tags
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'server-categories';

    if (server.categories && Array.isArray(server.categories)) {
        const prioritizedCategories = server.categories
            .sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
            .slice(0, 3);

        prioritizedCategories.forEach(category => {
            if (categoryColors[category]) {
                const tagElement = document.createElement('span');
                tagElement.className = 'category-tag';
                tagElement.textContent = categoryColors[category].label;
                tagElement.style.backgroundColor = categoryColors[category].color;
                categoryContainer.appendChild(tagElement);
            }
        });
    }

    serverCard.appendChild(categoryContainer);

    // Favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = `favorite-btn ${isFavorite ? 'active' : ''}`;
    favoriteBtn.innerHTML = '★';
    favoriteBtn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onFavoriteToggle(server);
        favoriteBtn.classList.toggle('active');
        favoriteBtn.title = favoriteBtn.classList.contains('active') ? 'Remove from favorites' : 'Add to favorites';
    });
    serverCard.appendChild(favoriteBtn);

    return serverCard;
}

export { createServerCard, categoryColors, categoryOrder };