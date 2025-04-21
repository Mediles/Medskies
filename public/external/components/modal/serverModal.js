// Modal component for displaying server details

import { parseMotdFormatting } from '../ui/formatUtils.js';

class ServerModal {
    constructor() {
        this.modal = document.getElementById('server-modal');
        this.modalContent = document.getElementById('modal-content-container');
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = document.querySelector('.close-modal');
        document.addEventListener('click', (event) => {
            if (event.target === this.modal || event.target === closeBtn) {
                this.hide();
            }
        });
    }

    // Helper function to add a detail row to the modal
    addDetailRow(container, label, value) {
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

    // Show server details in modal
    async showServerDetails(server, detailedServer) {
        this.modalContent.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Loading server details...</p>
            </div>
        `;
        this.show();

        try {
            this.modalContent.innerHTML = ''; // Clear loading state

            // Create header with server name and status
            const headerDiv = document.createElement('div');
            headerDiv.className = 'server-detail-header';
            headerDiv.innerHTML = `
                <h2 class="server-detail-name">${detailedServer.name}</h2>
                <span class="server-detail-status ${detailedServer.online ? 'status-online' : 'status-offline'}">
                    ${detailedServer.online ? 'Online' : 'Offline'}
                </span>
            `;
            this.modalContent.appendChild(headerDiv);

            // Add player count
            this.addDetailRow(this.modalContent, 'Players', 
                `${detailedServer.playerCount} / ${detailedServer.maxPlayers || 'Unknown'}`);

            // Add server description/MOTD
            if (detailedServer.motd) {
                const descDiv = document.createElement('div');
                descDiv.className = 'server-detail description-section';
                descDiv.innerHTML = `
                    <div class="server-detail-label">Description:</div>
                    <div class="server-detail-value">${parseMotdFormatting(detailedServer.motd)}</div>
                `;
                this.modalContent.appendChild(descDiv);
            }

            // Add server IP
            this.addDetailRow(this.modalContent, 'Server IP', `${detailedServer.name}.minehut.gg`);

            // Add creation date
            if (detailedServer.creation) {
                const creationDate = new Date(detailedServer.creation);
                this.addDetailRow(this.modalContent, 'Created', creationDate.toLocaleDateString());
            }

            // Add server version
            if (detailedServer.server_version_type) {
                this.addDetailRow(this.modalContent, 'Version Type', detailedServer.server_version_type);
            }

            // Add server platform
            if (detailedServer.platform) {
                this.addDetailRow(this.modalContent, 'Platform', detailedServer.platform);
            }

            // Primary Information Section
            const primarySection = document.createElement('div');
            primarySection.className = 'server-detail-section primary';
            [
                ['Total Joins', detailedServer.joins],
                ['Credits/Day', detailedServer.credits_per_day?.toFixed(2)],
                ['Server Plan', detailedServer.activeServerPlan]
            ].forEach(([label, value]) => {
                if (value !== null && value !== undefined) {
                    this.addDetailRow(primarySection, label, value);
                }
            });
            this.modalContent.appendChild(primarySection);

        } catch (error) {
            console.error('Error displaying server details:', error);
            this.modalContent.innerHTML = `
                <div class="error-state">
                    <p>Error loading server details: ${error.message}</p>
                </div>
            `;
        }
    }

    show() {
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }
}

export default ServerModal;