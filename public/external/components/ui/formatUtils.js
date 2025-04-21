// UI utilities for formatting and common operations

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

export { parseMotdFormatting };