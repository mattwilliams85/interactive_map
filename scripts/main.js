class Map {
  constructor() {
    const savedCoordinates = JSON.parse(localStorage.getItem('latlng'));
    this.activeMarkers = [];
    this.storedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    this.partyLatlng = savedCoordinates || [373, 1222];
    this.marksHidden = true;
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      maxZoom: 2,
      minZoom: -5,
      zoomSnap: 0.5,
      zoomDelta: 0.5
    });
  }

  initiate() {
    this.createMap();
    this.createMarkers();
    this.createEvents();
  }

  createMap() {
    const bounds = [[0, 0], [822, 1280]];

    L.imageOverlay('images/barovia.jpg', bounds).addTo(this.map);
    this.map.fitBounds(bounds);
    this.map.setView(this.partyLatlng, 2);

    // DEBUG
    L.control.mousePosition().addTo(this.map);
  }

  createMarkers() {
    const icon = L.icon({
      iconUrl: 'images/redmark.png',
      iconSize: [25, 40]
    });

    this.partyMarker = L.marker(L.latLng(this.partyLatlng), {
      draggable: true,
      icon
    });
    this.partyMarker.addTo(this.map);

    this.storedMarkers.forEach(marker => {
      this.createMarker(marker);
    });
  }

  createMarker(marker) {
    const newMarker = Object.assign({}, marker);
    const { latlng, title } = newMarker;
    const mark = L.marker(L.latLng(latlng));
    newMarker.mark = mark;

    newMarker.mark.addEventListener(
      'click',
      this.onMarkerClickDelete.bind(this)
    );
    if (title) mark.bindTooltip(title);
    mark.addTo(this.map);

    this.activeMarkers.push(newMarker);
  }

  createEvents() {
    document.onkeypress = e => {
      if (e.keyCode === 104) {
        this.activeMarkers.forEach(marker => {
          const { mark, options } = marker;

          if (options) return;
          this.marksHidden ? mark.setOpacity(0) : mark.setOpacity(1);
        });
        this.marksHidden = !this.marksHidden;
      }
    };

    this.partyMarker.on('dragend', function(ev) {
      const coordinates = ev.target._latlng;
      const latlng = [coordinates.lat, coordinates.lng];
      localStorage.setItem('latlng', JSON.stringify(latlng));
    });

    $('.add_marker_control').on('click', e => {
      this.map.addEventListener('click', this.onMapClickAddMarker.bind(this));
    });
    $('.del_marker_control').on('click', e => {
      this.deleteMode = true;
    });
  }

  onMapClickAddMarker(e) {
    const label = window.prompt('Marker Label?');
    this.map.removeEventListener('click');
    this.map._container.style.cursor = 'auto';
    const marker = { latlng: e.latlng, title: label };
    this.createMarker(marker);
    this.storedMarkers.push(marker);
    localStorage.setItem('markers', JSON.stringify(this.storedMarkers));
  }

  onMarkerClickDelete(e) {
    if (!this.deleteMode) return;
    const { lat, lng } = e.latlng;

    this.activeMarkers.forEach((marker, index) => {
      if (marker.latlng.lat === lat && marker.latlng.lng === lng) {
        this.map.removeLayer(marker.mark);
        this.storedMarkers.splice(index, 1);
      }
    });

    this.deleteMode = false;
    localStorage.setItem('markers', JSON.stringify(this.storedMarkers));
  }
}

const NewMap = new Map();
NewMap.initiate();
