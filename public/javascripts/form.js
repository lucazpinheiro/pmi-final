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


theForm.onsubmit = async (e) => {
  e.preventDefault();
  const x = new FormData(theForm);

  const obj = {
    type: x.get('typeInput'),
    description: x.get('description'),
    image: x.get('imageInput'),
    date: new Date(),
    location: latlng,
  };
  console.log('obj', obj);


  // const response = await fetch('/post', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(obj),
  // });

  // const result = await response.json();

  // console.log(result.message);
};
