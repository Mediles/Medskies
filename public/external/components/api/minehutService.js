// API service for Minehut server data

let lastApiStatus = 'unknown';
let lastApiCheck = 0;
const API_CHECK_INTERVAL = 30000; // Check every 30 seconds

// Enhanced API fetch with rate limiting and status monitoring
async function fetchMinehutServers() {
    try {
        const now = Date.now();
        if (lastApiCheck === 0 || now - lastApiCheck > API_CHECK_INTERVAL) {
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

        throw error;
    }
}

// Fetch detailed server information
async function fetchServerDetails(serverId) {
    try {
        const response = await fetch(`https://api.minehut.com/server/${serverId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.server;
    } catch (error) {
        console.error(`Error fetching details for server ${serverId}:`, error);
        throw error;
    }
}

export { fetchMinehutServers, fetchServerDetails };