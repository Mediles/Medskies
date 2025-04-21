// Main application module

import { fetchMinehutServers, fetchServerDetails } from './components/api/minehutService.js';
import DisplayManager from './components/display/displayManager.js';
import FavoritesManager from './components/favorites/favoritesManager.js';
import ServerModal from './components/modal/serverModal.js';
import SearchManager from './components/search/searchManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const displayManager = new DisplayManager(
        document.getElementById('servers-container'),
        document.getElementById('favorites-container'),
        document.getElementById('favorites-section')
    );
    const favoritesManager = new FavoritesManager();
    const serverModal = new ServerModal();
    const searchManager = new SearchManager();

    // Event handlers
    const handleFavoriteToggle = (server) => {
        const updatedFavorites = favoritesManager.toggleFavorite(server);
        displayManager.displayFavorites(updatedFavorites, handleFavoriteToggle, handleServerClick);
    };

    const handleServerClick = async (server) => {
        try {
            const detailedServer = await fetchServerDetails(server._id);
            serverModal.showServerDetails(server, detailedServer);
        } catch (error) {
            console.error('Error showing server details:', error);
        }
    };

    // Setup search result handler
    const handleSearchResults = () => {
        const filteredServers = searchManager.handleSearch();
        displayManager.displayServers(filteredServers, handleFavoriteToggle, handleServerClick);
    };

    // Connect search manager to display updates
    searchManager.onSearch = handleSearchResults;

    // Main function to load and display servers
    async function loadServers() {
        const initialLoadCount = 20;

        try {
            displayManager.setLoading(true);

            let initialServers = await fetchMinehutServers();
            displayManager.setAllServers(initialServers);

            // Fetch detailed information for the top N servers
            const serversToDetail = initialServers.slice(0, initialLoadCount);
            const detailedServers = await Promise.all(serversToDetail.map(async (server) => {
                try {
                    const detailedServer = await fetchServerDetails(server._id);
                    return { ...server, categories: detailedServer.categories };
                } catch (error) {
                    console.error(`Error fetching details for ${server.name}:`, error);
                    return server;
                }
            }));

            // Update the first N servers with detailed info
            initialServers = [
                ...detailedServers,
                ...initialServers.slice(initialLoadCount)
            ];
            displayManager.setAllServers(initialServers);

            displayManager.setLoading(false);
            displayManager.displayFavorites(favoritesManager.getFavorites(), handleFavoriteToggle, handleServerClick);
            displayManager.displayServers(initialServers, handleFavoriteToggle, handleServerClick);

        } catch (error) {
            displayManager.setLoading(false);
            displayManager.showError(`Error loading servers: ${error.message}. Retrying in 30 seconds...`);
            setTimeout(loadServers, 30000);
        }
    }

    // Load servers when page loads
    loadServers();
});