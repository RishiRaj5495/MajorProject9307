mapboxgl.accessToken = mapTokens;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: show.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
console.log("Map initialized with access token:", mapTokens);
console.log("Coordinates:", show.geometry.coordinates);
    // Set the map's center to the coordinates from the listing



    const marker = new mapboxgl.Marker({ color : "red"})
        .setLngLat(show.geometry.coordinates) // Set the marker's position
        .setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h4>${show.location}</h4><p>Exact location provided after booking</p>`)
        ) // Set the popup content
        .addTo(map); // Add the marker to the map
   