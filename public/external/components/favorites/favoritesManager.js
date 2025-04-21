// Favorites manager for handling favorite servers

class FavoritesManager {
    constructor() {
        this.favoriteServers = this.loadFavorites();
    }

    // Load favorites from local storage
    loadFavorites() {
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
    saveFavorites() {
        localStorage.setItem('minehutFavorites', JSON.stringify(this.favoriteServers));
    }

    // Check if a server is in favorites
    isServerFavorite(serverId) {
        return this.favoriteServers.some(server => server._id === serverId);
    }

    // Add or remove a server from favorites
    toggleFavorite(server) {
        const index = this.favoriteServers.findIndex(s => s._id === server._id);

        if (index === -1) {
            // Add to favorites
            this.favoriteServers.push(server);
        } else {
            // Remove from favorites
            this.favoriteServers.splice(index, 1);
        }

        // Save to local storage
        this.saveFavorites();
        return this.favoriteServers;
    }

    // Get all favorite servers
    getFavorites() {
        return this.favoriteServers;
    }
}

export default FavoritesManager;