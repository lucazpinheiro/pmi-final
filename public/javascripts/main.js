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
  // const content = `
  // <h6>Espécie: </h6><big>${params.type}</big>
  // <h6>Situação do animal: </h6><big>${params.status}</big>
  // <h6>Informações adicionais:</h6><big>${params.description}</big>
  // `;
  const content = `
  <big><b>Espécie:</b> ${params.type}</big><br>
  <big><b>Situação do animal:</b> ${params.status}</big><br>
  <big><b>Informações adicionais:</b> ${params.description}</big>
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
