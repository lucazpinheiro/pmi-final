import { map, baseLayer, getData } from './map.js';

baseLayer.addTo(map);

getData((geoData) => {
  L.geoJSON(geoData, {

    onEachFeature: (feature, layer) => {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    },

  }).addTo(map);
});
