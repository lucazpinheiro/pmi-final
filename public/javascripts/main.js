/* eslint-disable import/extensions */
import { map, baseLayer, getData } from './map.js';

baseLayer.addTo(map);


function parseProperties(props) {
  let animalType = '';
  if (props.type === 'CAT') {
    animalType = 'Gato';
  } else if (props.type === 'DOG') {
    animalType = 'Cachorro';
  } else {
    animalType = 'Especie não identificada';
  }
  const obj = {
    description: props.description,
    status: props.status === 'LOST' ? 'Animal desaparecido' : 'Animal de rua reportado',
    type: animalType,
  };
  return obj;
}

function buildPopup(params) {
  const content = `
  <h5>Espécie: </h5><big>${params.type}</big>
  <h5>Situação do animal: </h5><big>${params.status}</big>
  <h5>Informações adicionais:</h5><big>${params.description}</big>
  `;
  return content;
}

getData((geoData) => {
  L.geoJSON(geoData, {

    onEachFeature: (feature, layer) => {
      if (feature.properties) {
        layer.bindPopup(buildPopup(parseProperties(feature.properties)));
      }
    },

  }).addTo(map);
});
