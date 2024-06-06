let lat = 50.850346;
let long = 4.351721;
const map = L.map('map').setView([lat, long], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

let markerPosition = [50.860, 4.345];//[lat,long]
var marker = L.marker(markerPosition).addTo(map);