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
    async function fetchMinehutServers() {
        try {
            // Fetch all servers from Minehut API
            const response = await fetch('https://api.minehut.com/servers');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Check if we have valid server data
            if (!data || !data.servers || !Array.isArray(data.servers)) {
                throw new Error('Invalid data format received from API');
            }
            
            // Sort servers by player count (descending)
            const sortedServers = data.servers
                .sort((a, b) => (b.playerData ? b.playerData.playerCount : 0) - (a.playerData ? a.playerData.playerCount : 0));
            // Return all servers instead of just top 100
            
            return sortedServers;
        } catch (error) {
            console.error('Error fetching Minehut servers:', error);
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
        try {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            serversContainer.innerHTML = '';
            
            // Load favorites from local storage
            favoriteServers = loadFavorites();
            
            // Fetch all servers
            allServers = await fetchMinehutServers();
            
            loadingElement.style.display = 'none';
            
            // Display favorites if any
            displayFavorites();
            
            // Display all servers
            displayServers(allServers);
        } catch (error) {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.textContent = `Error loading servers: ${error.message}`;
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
    function showServerDetails(server) {
        const modal = document.getElementById('server-modal');
        const modalContent = document.getElementById('modal-content-container');
        
        // Clear previous content
        modalContent.innerHTML = '';
        
        // Create header with server name and status
        const headerDiv = document.createElement('div');
        headerDiv.className = 'server-detail-header';
        
        const nameElement = document.createElement('h2');
        nameElement.className = 'server-detail-name';
        nameElement.textContent = server.name;
        headerDiv.appendChild(nameElement);
        
        const statusElement = document.createElement('span');
        statusElement.className = `server-detail-status ${server.online ? 'status-online' : 'status-offline'}`;
        statusElement.textContent = server.online ? 'Online' : 'Offline';
        headerDiv.appendChild(statusElement);
        
        modalContent.appendChild(headerDiv);
        
        // Add player count
        addDetailRow(modalContent, 'Players', `${server.playerData ? server.playerData.playerCount : 0} / ${server.maxPlayers || 'Unknown'}`);
        
        // Add server description/MOTD if available
        if (server.motd) {
            const descDiv = document.createElement('div');
            descDiv.className = 'server-detail';
            
            const descLabel = document.createElement('div');
            descLabel.className = 'server-detail-label';
            descLabel.textContent = 'Description:';
            descDiv.appendChild(descLabel);
            
            const descValue = document.createElement('div');
            descValue.className = 'server-detail-value';
            descValue.innerHTML = parseMotdFormatting(server.motd);
            descDiv.appendChild(descValue);
            
            modalContent.appendChild(descDiv);
        }
        
        // Add server IP if available
        if (server.connectInfo && server.connectInfo.serverIP) {
            addDetailRow(modalContent, 'Server IP', `${server.connectInfo.serverIP}${server.connectInfo.port ? `:${server.connectInfo.port}` : ''}`);
        } else {
            addDetailRow(modalContent, 'Server IP', `${server.name}.minehut.gg`);
        }
        
        // Add creation date if available
        if (server.creation) {
            const creationDate = new Date(server.creation);
            addDetailRow(modalContent, 'Created', creationDate.toLocaleDateString());
        }
        
        // Add server version if available
        if (server.serverVersion) {
            addDetailRow(modalContent, 'Version', server.serverVersion);
        }
        
        // Add server platform if available
        if (server.platform) {
            addDetailRow(modalContent, 'Platform', server.platform);
        }
        
        // Show the modal
        modal.style.display = 'block';
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