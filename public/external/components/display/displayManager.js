// Display manager for handling server list rendering

import { createServerCard } from '../card/serverCard.js';

class DisplayManager {
    constructor(serversContainer, favoritesContainer, favoritesSection) {
        this.serversContainer = serversContainer;
        this.favoritesContainer = favoritesContainer;
        this.favoritesSection = favoritesSection;
        this.allServers = [];
    }

    setAllServers(servers) {
        this.allServers = servers;
    }

    // Display all servers
    displayServers(servers, onFavoriteToggle, onServerClick) {
        this.serversContainer.innerHTML = '';
        servers.forEach((server, index) => {
            const serverCard = createServerCard(server, index, false, onFavoriteToggle, onServerClick);
            if (serverCard) {
                this.serversContainer.appendChild(serverCard);
            } else {
                console.error('createServerCard returned null for:', server.name);
            }
        });
    }

    // Display favorite servers
    displayFavorites(favoriteServers, onFavoriteToggle, onServerClick) {
        this.favoritesContainer.innerHTML = '';
        if (favoriteServers.length === 0) {
            this.favoritesSection.style.display = 'none';
            return;
        }
        this.favoritesSection.style.display = 'block';
        favoriteServers.forEach(server => {
            const serverCard = createServerCard(server, null, true, onFavoriteToggle, onServerClick);
            this.favoritesContainer.appendChild(serverCard);
        });
        document.getElementById('favorites-count').textContent = `${favoriteServers.length} tracked`;
    }

    // Search servers
    searchServers(searchTerm, onFavoriteToggle, onServerClick) {
        if (searchTerm === '') {
            this.displayServers(this.allServers, onFavoriteToggle, onServerClick);
            return;
        }

        const filteredServers = this.allServers.filter(server =>
            server.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.displayServers(filteredServers, onFavoriteToggle, onServerClick);
    }

    // Update loading state
    setLoading(isLoading) {
        const loadingElement = document.getElementById('loading');
        const errorElement = document.getElementById('error');
        
        if (isLoading) {
            loadingElement.style.display = 'block';
            errorElement.style.display = 'none';
            this.serversContainer.innerHTML = '';
        } else {
            loadingElement.style.display = 'none';
        }
    }

    // Display error state
    showError(message) {
        const errorElement = document.getElementById('error');
        errorElement.style.display = 'block';
        errorElement.textContent = message;
    }
}

export default DisplayManager;