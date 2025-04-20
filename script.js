document.addEventListener('DOMContentLoaded', () => {
    const serversContainer = document.getElementById('servers-container');
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesSection = document.getElementById('favorites-section');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Store all servers for searching
    let allServers = [];
    // Store favorite servers
    let favoriteServers = [];
    
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
        if (storedFavorites) {
            try {
                return JSON.parse(storedFavorites);
            } catch (e) {
                console.error('Error parsing favorites from local storage:', e);
                return [];
            }
        }
        return [];
    }
    
    // Save favorites to local storage
    function saveFavorites() {
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
            // Add to favorites
            favoriteServers.push(server);
        } else {
            // Remove from favorites
            favoriteServers.splice(index, 1);
        }
        
        // Save to local storage
        saveFavorites();
        
        // Update only favorites display without redrawing all servers
        displayFavorites();
    }
    
    // Display favorite servers
    function displayFavorites() {
        favoritesContainer.innerHTML = '';
        
        // We'll use our current in-memory favorites array directly
        // This ensures we're working with the most up-to-date favorites that were just modified
        
        if (favoriteServers.length === 0) {
            favoritesSection.style.display = 'none';
            return;
        }
        
        favoritesSection.style.display = 'block';
        
        // Display all favorited servers
        favoriteServers.forEach(server => {
            const serverCardWrapper = createServerCard(server, null, true);
            favoritesContainer.appendChild(serverCardWrapper);
        });
        
        // Log for debugging
        console.log('Displaying favorites:', favoriteServers.length, 'servers', favoriteServers);
    }
    
    // Create a server card element
    function createServerCard(server, index, isFavorite = false) {
        const serverCardWrapper = document.createElement('div');
        serverCardWrapper.className = 'server-card-wrapper';
        serverCardWrapper.dataset.serverId = server._id; // Add server ID as data attribute
        
        const serverCard = document.createElement('div');
        serverCard.className = 'server-card';
        
        // Add click event to show server details
        serverCard.addEventListener('click', () => showServerDetails(server));
        
        // Add rank indicator if not in favorites section
        if (index !== null) {
            const rankElement = document.createElement('div');
            rankElement.className = `rank ${index < 3 ? 'top-3' : ''}`;
            rankElement.textContent = index + 1;
            serverCardWrapper.appendChild(rankElement);
        }
        
        // Add favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = `favorite-btn ${isServerFavorite(server._id) ? 'active' : ''}`;
        favoriteBtn.innerHTML = '★';
        favoriteBtn.title = isServerFavorite(server._id) ? 'Remove from favorites' : 'Add to favorites';
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the server card click
            toggleFavorite(server);
            // Update only this button's state
            favoriteBtn.classList.toggle('active');
            favoriteBtn.title = favoriteBtn.classList.contains('active') ? 'Remove from favorites' : 'Add to favorites';
        });
        serverCardWrapper.appendChild(favoriteBtn);
        
        // Server name
        const nameElement = document.createElement('div');
        nameElement.className = 'server-name';
        nameElement.textContent = server.name;
        
        // Player count
        const playersElement = document.createElement('div');
        playersElement.className = 'server-players';
        playersElement.textContent = `Players: ${server.playerData ? server.playerData.playerCount : 0}`;
        
        // Server description if available
        if (server.motd) {
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'server-description';
            
            // Parse and format the MOTD with HTML-like tags
            const formattedMotd = parseMotdFormatting(server.motd);
            descriptionElement.innerHTML = formattedMotd;
            
            serverCard.appendChild(descriptionElement);
        }
        
        // Append elements
        serverCard.appendChild(nameElement);
        serverCard.appendChild(playersElement);
        serverCardWrapper.appendChild(serverCard);
        
        return serverCardWrapper;
    }
    
    // Function to display servers
    function displayServers(servers) {
        serversContainer.innerHTML = '';
        
        servers.forEach((server, index) => {
            const serverCardWrapper = createServerCard(server, index);
            serversContainer.appendChild(serverCardWrapper);
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
        const loadingElement = document.getElementById('loading');
        const errorElement = document.getElementById('error');
        const serversContainer = document.getElementById('servers-container');

        try {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            serversContainer.innerHTML = '';

            favoriteServers = loadFavorites();
            allServers = await fetchMinehutServers();

            loadingElement.style.display = 'none';
            displayFavorites();
            displayServers(allServers);

        } catch (error) {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.textContent = `Error loading servers: ${error.message}. Retrying in 30 seconds...`;
            setTimeout(loadServers, 30000); // Retry after 30 seconds
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
        const modal = document.getElementById('server-modal');
        const closeBtn = document.querySelector('.close-modal');
        
        if (event.target === modal || event.target === closeBtn) {
            modal.style.display = 'none';
        }
    });
    
    // Load servers when page loads
    loadServers();
});