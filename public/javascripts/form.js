/* eslint-disable no-undef */

theForm.onsubmit = async (e) => {
  e.preventDefault();
  const x = new FormData(theForm);
  // console.log(x.get('typeInput'));
  const obj = {
    type: x.get('typeInput'),
    description: x.get('description'),
    image: x.get('imageInput'),
  };
  console.log(obj);
  // console.log(x.get('imageInput'));
  const blob = new Blob([JSON.stringify(x.get('imageInput'), null, 2)], { type: 'image/*' });
  // console.log('blob', blob);

  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    // reader.result contains the contents of blob as a typed array
    console.log(reader);
  });
  reader.readAsArrayBuffer(blob);

  // x.forEach((value, name) => console.log(`${name} = ${value}`)); // key1=value1, then key2=value2 console.log(y, z));

  // const response = await fetch('/post', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(new FormData(theForm)),
  // });

  // const result = await response.json();

  // console.log(result.message);
};