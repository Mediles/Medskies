class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.currentFilter = 'name';
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchButton.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Setup filter chips
        document.querySelectorAll('.filter-chips .chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.currentFilter = chip.dataset.filter;
                this.handleSearch();
            });
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.trim();
        return this.filterServers(searchTerm, this.currentFilter);
    }

    filterServers(searchTerm, filterType) {
        if (!searchTerm) return [];

        return window.serverData.filter(server => {
            switch (filterType) {
                case 'name':
                    return server.name.toLowerCase().includes(searchTerm.toLowerCase());
                case 'tags':
                    return server.tags && server.tags.some(tag => 
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                case 'players':
                    return server.playerCount >= parseInt(searchTerm) || 
                           server.playerCount <= parseInt(searchTerm);
                default:
                    return false;
            }
        });
    }
}

export default SearchManager;