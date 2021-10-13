mapboxgl.accessToken = 'pk.eyJ1Ijoic29oZWU0MTkiLCJhIjoiY2t1b3huNDB6MGg2aTJwbzFlZndhcDZnNyJ9.S8pWvGWPlCrGti6ALYkBOQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-118.1436, 34.1478], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

// Fetch businesses from API
async function getBusiness(){
  const res = await fetch('/api/v1/business')
  const data = await res.json()
  //console.log(data)

  // Take the returned data from db and reconstructed each object into a shape that mapbox needs:
  const business = data.data.map(biz => {
    return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [biz.location.coordinates[0], biz.location.coordinates[1]]
          },
          properties: {
            businessId: biz.businessID,
            icon: 'dog-park'
          }
        }
    })
  loadMap(business);
}

// Load map with business
function loadMap(){
  map.on('load', function(){
    map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: biz,
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

getBusiness();