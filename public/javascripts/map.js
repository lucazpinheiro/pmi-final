const initialCordinates = [-27.59, -48.54]; // Cordenadas de Florianópolis
const initialZoom = 12;

export const map = L.map('map').setView(initialCordinates, initialZoom);

export const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19,
});

export async function getData(callback) {
  try {
    const response = await fetch('/mapData');
    const geoData = await response.json();
    callback(geoData);
  } catch (err) {
    console.log(err);
  }
}


export const drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    rectangle: false,
    marker: true,
    circlemarker: false,
  },
});
