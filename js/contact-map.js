// contact-map.js

// Array of hub objects with their details and approximate coordinates
const hubs = [
    {
      name: "Leicestershire, Nottinghamshire and Rutland (East Midlands)",
      address: "Beauchamp College, Ridge Way, Oadby, LE2 5TP",
      email: "teachcomputing@lionhearttrust.org.uk",
      phone: "01162 986234",
      lat: 52.5350,
      lng: -1.1200
    },
    {
      name: "Lincolnshire (East Midlands)",
      address: "The Priory Academy LSST, Cross O'Cliff Hill, Lincoln, LN5 8PW",
      email: "teachcomputing@prioryacademies.co.uk",
      phone: "01522 889297",
      lat: 53.2300,
      lng: -0.5400
    },
    {
      name: "Milton Keynes & Northamptonshire (East Midlands)",
      address: "Denbigh School, Burchard Crescent, Shenley Church End, MK5 6EX",
      email: "teachcomputing@denbigh.net",
      phone: "01908 794094",
      lat: 52.0400,
      lng: -0.7600
    },
    {
      name: "Cambridge & Northamptonshire (East of England)",
      address: "Chesterton Community College, Gilbert Road, Cambridge, CB4 3NY",
      email: "teachcomputing@ccc.tela.org.uk",
      phone: "01223 712150 (ext 136)",
      lat: 52.2200,
      lng: 0.1500
    },
    {
      name: "London, Hertfordshire and Essex (East of England)",
      address: "Saffron Walden County High School, Audley End Road, Saffron Walden, CB11 4UH",
      email: "teachcomputing@swchs.net",
      phone: "01799 513030 (ext 1264)",
      lat: 52.0280,
      lng: 0.2040
    },
    {
      name: "Maidstone and Kent (East of England)",
      address: "Maidstone Grammar School for Girls, Buckland Road, Maidstone, ME16 0SF",
      email: "teachcomputing@mggs.org",
      phone: "01622 752103",
      lat: 51.2700,
      lng: 0.5200
    },
    {
      name: "Oxfordshire, Buckinghamshire and Berkshire (East of England)",
      address: "St Clement Danes School, Chenies Road, Chorleywood, WD3 6EW",
      email: "teachcomputing@scd.herts.sch.uk",
      phone: "01923 284169",
      lat: 51.6400,
      lng: -0.3900
    }
  ];
  
  // Initialize the Leaflet map in the "hubMap" div
  var map = L.map('hubMap').setView([52.0, 0.0], 6);
  
  // Add the OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  // Add markers for each hub with a popup showing its details
  hubs.forEach(hub => {
    var marker = L.marker([hub.lat, hub.lng]).addTo(map);
    var popupContent = `
      <strong>${hub.name}</strong><br>
      ${hub.address}<br>
      Email: <a href="mailto:${hub.email}">${hub.email}</a><br>
      Phone: <a href="tel:${hub.phone}">${hub.phone}</a>
    `;
    marker.bindPopup(popupContent);
  });
  
  // When the user clicks the map, open a new tab with the full map (Google My Maps URL)
  // (Replace YOUR_GOOGLE_MY_MAP_ID with your actual map ID.)
  document.getElementById('hubMap').addEventListener('click', function () {
    window.open("https://www.google.com/maps/d/viewer?mid=YOUR_GOOGLE_MY_MAP_ID", "_blank");
  });
  
  // --- Postcode Search Functionality ---
  
  // Listen for clicks on the search button
  document.getElementById('postcodeSearchBtn').addEventListener('click', function () {
    var postcode = document.getElementById('postcodeInput').value.trim();
    if (!postcode) {
      alert("Please enter a postcode.");
      return;
    }
    // Use Nominatim (OpenStreetMap geocoding API) to convert postcode to coordinates
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcode)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          var userLocation = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          };
          // For each hub, calculate the distance from the user's location
          hubs.forEach(hub => {
            hub.distance = getDistance(userLocation.lat, userLocation.lng, hub.lat, hub.lng);
          });
          // Sort hubs by distance (closest first)
          var sortedHubs = hubs.slice().sort((a, b) => a.distance - b.distance);
          // Display the sorted results in the searchResults div
          displaySearchResults(sortedHubs);
        } else {
          alert("Postcode not found.");
        }
      })
      .catch(error => {
        console.error("Error fetching geocode:", error);
        alert("Error fetching location. Please try again.");
      });
  });
  
  // Haversine formula: calculates the distance (in kilometers) between two coordinate pairs
  function getDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  // Display sorted hub search results
  function displaySearchResults(sortedHubs) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = "<h3>Hubs Sorted by Proximity</h3>";
    sortedHubs.forEach(hub => {
      resultsDiv.innerHTML += `
        <div class="hub-result">
          <h4>${hub.name}</h4>
          <p><strong>Address:</strong> ${hub.address}</p>
          <p><strong>Distance:</strong> ${hub.distance.toFixed(2)} km</p>
          <p><strong>Email:</strong> <a href="mailto:${hub.email}">${hub.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${hub.phone}">${hub.phone}</a></p>
        </div>
        <hr>
      `;
    });
  }
  