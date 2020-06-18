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


reportForm.onsubmit = async (e) => {
  e.preventDefault();

  const formObjt = new FormData(reportForm);
  await formObjt.append('location', JSON.stringify(latlng));
  formObjt.forEach((value, key) => console.log(`${key} => ${value}`));

  const response = await fetch('/post', {
    method: 'POST',
    body: formObjt,
  });

  if (response.status === 201) {
    window.location.href = '/';
  } else {
    alert('Parece houve algum problema ao salvar o registro, por favor tente mais tarde.');
    window.location.href = '/report';
  }
};
