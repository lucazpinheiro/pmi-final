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
  // e.default();
  await fetch('/post', {
    method: 'POST',
    body: formObjt,
  });

  window.location.href = '/';
};
