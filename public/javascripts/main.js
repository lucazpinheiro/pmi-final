import { map, baseLayer, getData } from './map.js';

baseLayer.addTo(map);

function parseProperties(props) {
  console.log(props);
  const content = `<p><b>description: ${props.description}</b></p>
  <p>description ${props.description}</p>
`;
  return content;
}

getData((geoData) => {
  L.geoJSON(geoData, {

    onEachFeature: (feature, layer) => {
      if (feature.properties) {
        // layer.bindPopup(feature.properties.popupContent);
        layer.bindPopup(parseProperties(feature.properties));
      }
    },

  }).addTo(map);
});
