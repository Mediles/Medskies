document.addEventListener('DOMContentLoaded', () => {
    const serversContainer = document.getElementById('servers-container');
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesSection = document.getElementById('favorites-section');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const modal = document.getElementById('server-modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Store all servers for searching
    let allServers = [];
    // Store favorite servers and IMMEDIATELY LOAD THEM
    let favoriteServers = loadFavorites();
    console.log("[INIT] favoriteServers:", favoriteServers); // should now show favorites if any

    // Function to parse MOTD formatting with color tags
    function parseMotdFormatting(motd) {
        if (!motd) return '';
        // Replace color tags with span elements
        let formatted = motd
            // Handle color tags like <color:#00ccff>
            .replace(/<color:(#[0-9a-fA-F]{6})>/g, '<span style="color:$1;">')
            // Handle predefined color tags like <white>, <green>
            .replace(/<white>/g, '<span style="color:white;">')
            .replace(/<green>/g, '<span style="color:green;">')
            .replace(/<blue>/g, '<span style="color:#00ccff;">')
            .replace(/<\/color>/g, '</span>')
            // Close any unclosed color tags
            .replace(/<\/white>/g, '</span>')
            .replace(/<\/green>/g, '</span>')
            .replace(/<\/blue>/g, '</span>')
            // Handle bold tags
            .replace(/<b>/g, '<strong>')
            .replace(/<\/b>/g, '</strong>');

        return formatted;
    }

    // Function to fetch servers from Minehut API
    // API Status monitoring
    let lastApiStatus = 'unknown';
    let lastApiCheck = 0;
    const API_CHECK_INTERVAL = 30000; // Check every 30 seconds

    // Enhanced API fetch with rate limiting and status monitoring
    async function fetchMinehutServers() {
        try {
            const now = Date.now();
            if (lastApiCheck === 0 || now - lastApiCheck > API_CHECK_INTERVAL) { // Allow initial call
                lastApiCheck = now;
                const apiStatusElement = document.getElementById('api-status');
                const lastUpdateElement = document.getElementById('last-update');

                apiStatusElement.className = 'status-chip';
                apiStatusElement.textContent = 'API: Checking...';

                const response = await fetch('https://api.minehut.com/servers');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (!data || !data.servers || !Array.isArray(data.servers)) {
                    throw new Error('Invalid data format received from API');
                }

                lastApiStatus = 'connected';
                apiStatusElement.className = 'status-chip status-online';
                apiStatusElement.textContent = 'API: Connected';
                lastUpdateElement.textContent = `Last Update: ${new Date().toLocaleTimeString()}`;

                document.getElementById('total-servers').textContent = data.servers.length;
                const totalPlayers = data.servers.reduce((sum, server) =>
                    sum + (server.playerData ? server.playerData.playerCount : 0), 0);
                document.getElementById('total-players').textContent = totalPlayers;

                return data.servers.sort((a, b) =>
                    (b.playerData ? b.playerData.playerCount : 0) -
                    (a.playerData ? a.playerData.playerCount : 0)
                );
            }

            throw new Error('Rate limit: Please wait before refreshing');
        } catch (error) {
            console.error('Error fetching Minehut servers:', error);

            const apiStatusElement = document.getElementById('api-status');
            apiStatusElement.className = 'status-chip status-offline';
            apiStatusElement.textContent = 'API: Error';

            errorElement.style.display = 'block';
            errorElement.textContent = `Error: ${error.message}. Retrying in 30 seconds...`;

            lastApiStatus = 'error';
            throw error;
        }
    }

    // Load favorites from local storage
    function loadFavorites() {
        const storedFavorites = localStorage.getItem('minehutFavorites');
        console.log("[LOAD] Stored Favorites:", storedFavorites);
        if (storedFavorites) {
            try {
                const parsedFavorites = JSON.parse(storedFavorites);
                const filteredFavorites = parsedFavorites.filter(fav => fav && fav._id);
                console.log("[LOAD] Parsed and Filtered Favorites:", filteredFavorites);
                return favoriteServers; // should return the loaded and filtered array
            } catch (e) {
                console.error('Error parsing favorites from local storage:', e);
                return [];
            }
        }
        return [];
    }

    // Save favorites to local storage
    function saveFavorites() {
        console.log("[SAVE] Saving Favorites:", favoriteServers);
        localStorage.setItem('minehutFavorites', JSON.stringify(favoriteServers));
    }

    // Check if a server is in favorites
    function isServerFavorite(serverId) {
        return favoriteServers.some(server => server._id === serverId);
    }

    // Add or remove a server from favorites
    function toggleFavorite(server) {
        const index = favoriteServers.findIndex(s => s._id === server._id);

        if (index === -1) {
            favoriteServers.push(server);
            console.log("[TOGGLE] Added to Favorites:", server.name, "Current Favorites:", favoriteServers);
        } else {
            favoriteServers.splice(index, 1);
            console.log("[TOGGLE] Removed from Favorites:", server.name, "Current Favorites:", favoriteServers);
        }

        saveFavorites();
        displayFavorites();

        // Update the favorite button on ALL server cards
        const allFavoriteButtons = document.querySelectorAll('.server-card .favorite-btn');
        allFavoriteButtons.forEach(btn => {
            const serverId = btn.parentNode.dataset.serverId;
            if (serverId === server._id) {
                btn.classList.toggle('active', isServerFavorite(serverId));
                btn.title = isServerFavorite(serverId) ? 'Remove from favorites' : 'Add to favorites';
            }
        });
    }

    // Category color mapping and display order
    const categoryColors = {
        "pvp": { label: "⚔️ PvP", color: "#DF3D4B" },
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

    // Create a server card element (simplified overview)
    function createServerCard(server, index, isFavorite = false) {
        const serverCard = document.createElement('div');
        serverCard.className = 'server-card';
        serverCard.dataset.serverId = server._id;

        // Add click event to show server details (will be implemented later)
        serverCard.addEventListener('click', () => showServerDetails(server));

        // Main info line
        const mainInfo = document.createElement('div');
        mainInfo.className = 'server-main-info';

        // Rank
        if (index !== null && !isFavorite) { // Only show rank on the main list
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

        // Check if the server object has the 'categories' property and it's an array
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
        favoriteBtn.className = `favorite-btn ${isServerFavorite(server._id) ? 'active' : ''}`;
        favoriteBtn.innerHTML = '★';
        favoriteBtn.title = isServerFavorite(server._id) ? 'Remove from favorites' : 'Add to favorites';
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(server);
            favoriteBtn.classList.toggle('active');
            favoriteBtn.title = favoriteBtn.classList.contains('active') ? 'Remove from favorites' : 'Add to favorites';
        });
        serverCard.appendChild(favoriteBtn);

        return serverCard;
    }

    // Function to display servers (modified to use the simplified card)
    function displayServers(servers) {
        serversContainer.innerHTML = '';
        console.log("First server object:", servers[0]); // Add this line
        servers.forEach((server, index) => {
            const serverCard = createServerCard(server, index);
            if (serverCard) {
                serversContainer.appendChild(serverCard);
            } else {
                console.error('createServerCard returned null for:', server.name);
            }
        });
    }

    // Function to display favorite servers (modified to use the simplified card)
    function displayFavorites() {
        favoritesContainer.innerHTML = '';
        console.log("[DISPLAY-FAV] Rendering Favorites:", favoriteServers);
        if (favoriteServers.length === 0) {
            favoritesSection.style.display = 'none';
            return;
        }
        favoritesSection.style.display = 'block';
        favoriteServers.forEach(server => {
            const serverCard = createServerCard(server, null, true);
            if (serverCard) {
                favoritesContainer.appendChild(serverCard);
            } else {
                console.error('createServerCard returned null for favorite:', server.name);
            }
        });
        document.getElementById('favorites-count').textContent = `${favoriteServers.length} tracked`;

        // Update the favorite button in the MAIN server list
        const allServerCards = document.querySelectorAll('.server-card');
        allServerCards.forEach(card => {
            const serverId = card.dataset.serverId;
            const favoriteButton = card.querySelector('.favorite-btn');
            if (favoriteButton) {
                favoriteButton.classList.toggle('active', isServerFavorite(serverId));
                favoriteButton.title = isServerFavorite(serverId) ? 'Remove from favorites' : 'Add to favorites';
            }
        });
    }

    // Search servers function
    function searchServers() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            // If search is empty, show all servers
            displayServers(allServers);
            return;
        }

        // Filter servers by name
        const filteredServers = allServers.filter(server =>
            server.name.toLowerCase().includes(searchTerm)
        );

        // Display filtered results
        displayServers(filteredServers);
    }

    // Main function to load and display servers
    async function loadServers() {
        const errorElement = document.getElementById('error');
        const serversContainer = document.getElementById('servers-container');
        const initialLoadCount = 20;
    
        try {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            serversContainer.innerHTML = '';
    
            favoriteServers = loadFavorites();
            console.log("[LOADSERVERS] After loading, favoriteServers:", favoriteServers);
            let initialServers = await fetchMinehutServers();
            allServers = initialServers.map(server => {
                console.log(`[INITIAL] Server ${server.name} Categories:`, server.allCategories); // ![DEBUG 1]
                return {...server, categories: server.allCategories || [], online: false};
            });
    
            // Fetch detailed information for the top N servers
            const serversToDetail = initialServers.slice(0, initialLoadCount);
            const detailedServers = await Promise.all(serversToDetail.map(async (server) => {
                try {
                    const response = await fetch(`https://api.minehut.com/server/${server._id}`);
                    if (!response.ok) {
                        console.error(`[DETAIL-FAIL] Failed to fetch details for ${server.name}: ${response.status}`);
                        return server;
                    }
                    const data = await response.json();
                    if (data && data.server) {
                        console.log(`[DETAIL-SUCCESS] Server ${server.name} Detailed Categories:`, data.server.categories); // ![DEBUG 2]
                        return {...server, online: data.server.online, categories: data.server.categories || server.allCategories || []};
                    }
                    console.log(`[DETAIL-MISSING] Detailed data missing for ${server.name}:`, data);
                    return server;
                } catch (error) {
                    console.error(`[DETAIL-ERROR] Error fetching details for ${server.name}:`, error);
                    return server;
                }
            }));
    
            // Update servers with detailed info
            for (let i = 0; i < detailedServers.length && i < allServers.length; i++) {
                console.log(`[MERGE] Server ${allServers[i]?.name} Before Merge - Categories:`, allServers[i]?.categories, "Detailed Categories:", detailedServers[i]?.categories, "Online:", detailedServers[i]?.online); // before merge
                allServers[i] = {
                    ...allServers[i],
                    online: detailedServers[i]?.online !== undefined ? detailedServers[i].online : allServers[i].online, // ensures online is updated only if present
                    categories: detailedServers[i]?.categories || allServers[i].categories
                };
                console.log(`[MERGE] Server ${allServers[i]?.name} After Merge - Categories:`, allServers[i]?.categories, "Online:", allServers[i]?.online); // after merge
            }

            console.log("[FINAL - First Server]", allServers[0]); // logs the final state of the first server
    
            loadingElement.style.display = 'none';
            displayFavorites();
            displayServers(allServers);
    
        } catch (error) {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.textContent = `Error loading servers: ${error.message}. Retrying in 30 seconds...`;
            setTimeout(loadServers, 30000);
        }
    }

    // Event listeners
    searchButton.addEventListener('click', searchServers);

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchServers();
        }
    });

    // Function to show server details in modal
    async function showServerDetails(server) {
        const modal = document.getElementById('server-modal');
        const modalContent = document.getElementById('modal-content-container');

        // Show loading state
        modalContent.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Loading server details...</p>
            </div>
        `;
        modal.style.display = 'block';

        try {
            // Fetch detailed server data
            const response = await fetch(`https://api.minehut.com/server/${server._id}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            const detailedServer = data.server;

            modalContent.innerHTML = ''; // Clear loading state

            // Create header with server name and status
            const headerDiv = document.createElement('div');
            headerDiv.className = 'server-detail-header';
            headerDiv.innerHTML = `
                <h2 class="server-detail-name">${detailedServer.name}</h2>
                <span class="server-detail-status ${detailedServer.online ? 'status-online' : 'status-offline'}">
                    ${detailedServer.online ? 'Online' : 'Offline'}
                </span>
            `;
            modalContent.appendChild(headerDiv);

            // Add player count (use detailedServer if available, otherwise fallback to server)
            addDetailRow(modalContent, 'Players', `${detailedServer.playerCount} / ${detailedServer.maxPlayers || 'Unknown'}`);

            // Add server description/MOTD if available (use detailedServer)
            if (detailedServer.motd) {
                const descDiv = document.createElement('div');
                descDiv.className = 'server-detail description-section';
                descDiv.innerHTML = `
                    <div class="server-detail-label">Description:</div>
                    <div class="server-detail-value">${parseMotdFormatting(detailedServer.motd)}</div>
                `;
                modalContent.appendChild(descDiv);
            }

            // Add server IP
            addDetailRow(modalContent, 'Server IP', `${detailedServer.name}.minehut.gg`);

            // Add creation date
            if (detailedServer.creation) {
                const creationDate = new Date(detailedServer.creation);
                addDetailRow(modalContent, 'Created', creationDate.toLocaleDateString());
            }

            // Add server version
            if (detailedServer.server_version_type) {
                addDetailRow(modalContent, 'Version Type', detailedServer.server_version_type);
            }

            // Add server platform
            if (detailedServer.platform) {
                addDetailRow(modalContent, 'Platform', detailedServer.platform);
            }

            // Primary Information Section
            const primarySection = document.createElement('div');
            primarySection.className = 'server-detail-section primary';
            [
                ['Total Joins', detailedServer.joins],
                ['Credits/Day', detailedServer.credits_per_day?.toFixed(2)],
                ['Server Plan', detailedServer.activeServerPlan]
            ].forEach(([label, value]) => {
                if (value !== null && value !== undefined) addDetailRow(primarySection, label, value);
            });
            modalContent.appendChild(primarySection);

            // Secondary Information Section
            const secondarySection = document.createElement('div');
            secondarySection.className = 'server-detail-section secondary';
            // Add any other secondary information from detailedServer here

            modalContent.appendChild(secondarySection);

        } catch (error) {
            console.error('Error fetching server details:', error);
            modalContent.innerHTML = `
                <div class="error-state">
                    <p>Error loading server details: ${error.message}</p>
                    <button class="retry-button" onclick="showServerDetails(${JSON.stringify(server)})">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    // Helper function to add a detail row to the modal
    function addDetailRow(container, label, value) {
        const detailDiv = document.createElement('div');
        detailDiv.className = 'server-detail';

        const labelElement = document.createElement('span');
        labelElement.className = 'server-detail-label';
        labelElement.textContent = `${label}: `;
        detailDiv.appendChild(labelElement);

        const valueElement = document.createElement('span');
        valueElement.className = 'server-detail-value';
        valueElement.textContent = value;
        detailDiv.appendChild(valueElement);

        container.appendChild(detailDiv);
    }

    // Close modal when clicking the close button or outside the modal
    document.addEventListener('click', (event) => {
        if (modal && (event.target === modal || event.target === closeBtn)) {
            modal.style.display = 'none';
        }
    });

    // Load servers when page loads
    loadServers();
});