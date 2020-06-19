/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import { map, baseLayer, drawControl } from './map.js';

let latlng = {};

baseLayer.addTo(map);

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, (event) => {
  const { layer } = event;

  latlng = { ...layer._latlng };

  map.addLayer(layer);
});

function isEmpty(obj) {
  for(const key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

reportForm.onsubmit = async (e) => {
  e.preventDefault();


  try {
    if (isEmpty(latlng)) throw new Error('Por favor, insira um ponto no mapa antes de tentar salvar o registro.');

    const formObjt = new FormData(reportForm);
    await formObjt.append('location', JSON.stringify(latlng));
    formObjt.forEach((value, key) => console.log(`${key} => ${value}`));

    const response = await fetch('/post', {
      method: 'POST',
      body: formObjt,
    });

    if (response.status === 201) {
      alert('Registro salvo com sucesso');
      window.location.href = '/';
    } else {
      throw new Error('Parece que houve algum problema ao salvar o registro, por favor tente novamente.');
    }
  } catch (err) {
    alert(err);
    window.location.href = '/report';
  }


};
