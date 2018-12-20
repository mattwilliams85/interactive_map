class Map {
  constructor() {
    this.savedCoordinates = JSON.parse(localStorage.getItem('latlng'));
    this.partyLatlng = savedCoordinates || [373, 1222];
    this.marksHidden = true;
    this.markers = [];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      // minZoom: 2,
      minZoom: -5,
      // maxZoom: 2,
      maxZoom: 0,
      zoomSnap: 0.5,
      zoomDelta: 0.5
    });

    initiate();
  }

  initiate() {
    createMap();
    createMarkers();
    createEvents();
  }

  createMap() {
    // const bounds = [[0, 0], [822, 1280]];
    const bounds = [[0, 0], [1636, 1200]];
    L.imageOverlay('phandalin.jpg', bounds).addTo(this.map);
    this.map.fitBounds(bounds);
    this.map.setView(partyLatlng, 1);

    // DEBUG
    L.control.mousePosition().addTo(this.map);
  }

  createMarkers() {
    const icon = L.icon({
      iconUrl: 'redmark.png',
      iconSize: [25, 40]
    });

    this.markers = [
      { latlng: partyLatlng, options: { draggable: true, icon } },
      { latlng: [407, 915], title: 'RavenLoft' },
      { latlng: [633, 1104], title: 'Old Owl Well' },
      { latlng: [872, 495], title: 'Thundertree' },
      { latlng: [366, 691], title: 'Phandalin' }
    ];

    this.markers.forEach(marker => {
      const { latlng, title, options } = marker;
      const mark = L.marker(L.latLng(latlng), options || {});

      this.markers[key].mark = mark;
      if (key !== 'party') mark.setOpacity(0);
      mark.addTo(map);
      if (title) mark.bindTooltip(title);
    });
  }

  createEvents() {
    document.onkeypress = e => {
      if (e.keyCode === 104) {
        this.markers.forEach(marker => {
          const { mark, options } = marker;

          if (options) return;
          marksHidden ? mark.setOpacity(1) : mark.setOpacity(0);
        });
        marksHidden = !marksHidden;
      }
    };

    thi.smarkers[0].mark.on('dragend', function(ev) {
      const coordinates = ev.target._latlng;
      const latlng = [coordinates.lat, coordinates.lng];
      localStorage.setItem('latlng', JSON.stringify(latlng));
    });
  }
}
// INITIATE
const savedCoordinates = JSON.parse(localStorage.getItem('latlng'));
const partyLatlng = savedCoordinates || [373, 1222];
let marksHidden = true;
const map = L.map('map', {
  crs: L.CRS.Simple,
  // minZoom: 2,
  minZoom: -5,
  // maxZoom: 2,
  maxZoom: 0,
  zoomSnap: 0.5,
  zoomDelta: 0.5
});
// const bounds = [[0, 0], [822, 1280]];
const bounds = [[0, 0], [1636, 1200]];
const image = L.imageOverlay('phandalin.jpg', bounds).addTo(map);
map.fitBounds(bounds);
map.setView(partyLatlng, 1);

// DEBUG
L.control.mousePosition().addTo(map);

// LOCATION MARKERS
const icon = L.icon({
  iconUrl: 'redmark.png',
  iconSize: [25, 40]
});

const markers = [
  { latlng: partyLatlng, options: { draggable: true, icon } },
  { latlng: [407, 915], title: 'RavenLoft' },
  { latlng: [633, 1104], title: 'Old Owl Well' },
  { latlng: [872, 495], title: 'Thundertree' },
  { latlng: [366, 691], title: 'Phandalin' }
];

markers.forEach(marker => {
  const { latlng, title, options } = marker;
  // options = {
  //   zIndexOffset: -1,
  //   ...options
  // };
  const mark = L.marker(L.latLng(latlng), options || {});

  markers[key].mark = mark;
  if (key !== 'party') mark.setOpacity(0);
  mark.addTo(map);
  if (title) mark.bindTooltip(title);
});

// EVENT HANDLERS
document.onkeypress = e => {
  if (e.keyCode === 104) {
    markers.forEach(marker => {
      const { mark, options } = markers;

      if (marker.options) return;
      marksHidden ? mark.setOpacity(1) : mark.setOpacity(0);
    });
    marksHidden = !marksHidden;
  }
};

markers[0].mark.on('dragend', function(ev) {
  const coordinates = ev.target._latlng;
  const latlng = [coordinates.lat, coordinates.lng];
  localStorage.setItem('latlng', JSON.stringify(latlng));
});

// TESTING

// JUNK
// var myIcon = L.icon({
//   iconUrl: 'marker.png',
//   iconSize: [40, 40]
// iconAnchor: [22, 94],
// popupAnchor: [-3, -76],
// shadowUrl: 'my-icon-shadow.png',
// shadowSize: [68, 95],
// shadowAnchor: [22, 94]
// });

// var myRenderer = L.canvas({ padding: 0.5 });
// L.rectangle(bounds, {
//   weight: 3,
//   opacity: 1,
//   fill: true,
//   fillColor: '#000000',
//   fillOpacity: 0.9,
//   renderer: myRenderer
// }).addTo(map);

// function l(lat, lng) {
//   return L.latLng([lat, lng]);
// }

// const roads = {
//   barovia: [[310, 1000], [304, 993], [235, 950], [228, 93]],
//   gypsy:

// };

// var travel = L.polyline(
//   [
//     l(savedCoordinates[0], savedCoordinates[1]),
//     l(310, 1000),
//     l(304, 993),
//     l(235, 950),
//     l(228, 935)
//   ],
//   { weight: 5 }
// ).addTo(map);
