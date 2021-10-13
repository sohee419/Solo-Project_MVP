mapboxgl.accessToken = 'pk.eyJ1Ijoic29oZWU0MTkiLCJhIjoiY2t1b3huNDB6MGg2aTJwbzFlZndhcDZnNyJ9.S8pWvGWPlCrGti6ALYkBOQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-118.1436, 34.1478], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

// Load map with businesses
function loadMap(){
  map.on('load', function(){
    map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-118.1436, 34.1478]
                },
                properties: {
                  businessId: '0001',
                  icon: 'dog-park'
                }
              }
            ]
          }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{businessId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

loadMap();