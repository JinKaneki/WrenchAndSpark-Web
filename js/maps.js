// Google Maps Integration for Contact Page
function initMap() {
    // Johannesburg coordinates
    const johannesburg = { lat: -26.2041, lng: 28.0473 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: johannesburg,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });
    
    // Add multiple locations
    const locations = [
        {
            position: { lat: -26.2041, lng: 28.0473 },
            title: "Wrench & Spark Main Store",
            address: "123 Tool Lane, Johannesburg"
        },
        {
            position: { lat: -26.1952, lng: 28.0346 },
            title: "Wrench & Spark Service Center",
            address: "456 Mechanic Street, Sandton"
        },
        {
            position: { lat: -26.2386, lng: 27.9089 },
            title: "Wrench & Spark Warehouse",
            address: "789 Industrial Ave, Roodepoort"
        }
    ];
    
    // Add markers
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FF7900" d="M16 0C10.477 0 6 4.477 6 10c0 6 10 16 10 16s10-10 10-16c0-5.523-4.477-10-10-10zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${location.title}</h3>
                    <p>${location.address}</p>
                    <p><i class="fas fa-phone"></i> (011) 123-4567</p>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Fallback if Google Maps fails
function loadMapFallback() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="map-fallback">
                <h3>Our Locations</h3>
                <div class="location-list">
                    <div class="location-item">
                        <h4>Main Store</h4>
                        <p>123 Tool Lane, Johannesburg</p>
                        <p><i class="fas fa-phone"></i> (011) 123-4567</p>
                    </div>
                    <div class="location-item">
                        <h4>Service Center</h4>
                        <p>456 Mechanic Street, Sandton</p>
                        <p><i class="fas fa-phone"></i> (011) 234-5678</p>
                    </div>
                    <div class="location-item">
                        <h4>Warehouse</h4>
                        <p>789 Industrial Ave, Roodepoort</p>
                        <p><i class="fas fa-phone"></i> (011) 345-6789</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        // Check if Google Maps is available
        if (typeof google !== 'undefined') {
            initMap();
        } else {
            loadMapFallback();
        }
    }
});