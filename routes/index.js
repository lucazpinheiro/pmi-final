/* eslint-disable no-console */
const express = require('express');
const formidable = require('formidable');

const form = new formidable.IncomingForm();

const router = express.Router();
const fs = require('fs');

const controller = require('../controller/index');

const rawdata = fs.readFileSync('./resources/content.json');
const resource = JSON.parse(rawdata);


function buildGeoJson(doc) {
  return {
    type: 'Feature',
    properties: {
      description: doc.description,
      date: doc.date,
      type: doc.species,
      status: doc.status,
      image: doc.image,
      id: doc.id,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        doc.lng,
        doc.lat,
      ],
    },
  };
}


router.get('/', async (req, res) => {
  try {
    res.render('index', { content: resource.main });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/report', async (req, res) => {
  try {
    res.render('form.ejs', { content: resource.form });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/about', async (req, res) => {
  try {
    res.render('about', { content: resource.about });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/mapData', async (req, res) => {
  try {
    const url = 'http://localhost:8080/animals';
    const data = await controller.getData(url);
    const geoJson = data.map((doc) => buildGeoJson(doc));
    console.log(geoJson);
    res.json(geoJson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// async function Base64ToImage(file) {
//   const binaryData = await fs.readFileSync(file);
//   console.log(binaryData);
//   // const base64String = new Buffer(binaryData).toString('base64');
//   const base64String = await Buffer.from(binaryData).toString('base64');
//   return base64String;
// }

// router.get('/getImage', async (req, res) => {
//   //   var data = getIcon(req.params.w);
//   //   var img = new Buffer(data, 'base64');

//   //  res.writeHead(200, {
//   //    'Content-Type': 'image/png',
//   //    'Content-Length': img.length
//   //  });
//   //  res.end(img);
//   try {
//     const base64Image = await fs.readFileSync('./files-tmp/test.txt');
//     // const spatialData = await JSON.parse(rawData);
//     console.log(base64Image);
//     res.send(base64Image);
//     res.base64
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// async function ImageToBase64(file) {
//   const binaryData = await fs.readFileSync(file);
//   console.log(binaryData);
//   // const base64String = new Buffer(binaryData).toString('base64');
//   const base64String = await Buffer.from(binaryData).toString('base64');
//   return base64String;
// }

// {
//   "date": "2020-06-17T19:11:48.958Z",
//   "description": "string",
//   "id": 0,
//   "image": "string",
//   "location": {
//     "lat": 0,
//     "lng": 0
//   },
//   "species": "CAT",
//   "status": "LOST"
// }

function parseRequest(obj) {
  const latlng = JSON.parse(obj.location);
  const postRequestBody = {
    description: obj.description,
    location: { ...latlng },
    species: obj.typeInput,
    status: obj.statusInput,
  };
  return postRequestBody;
}

router.post('/post', async (req, res) => {
  try {
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      const obj = parseRequest({ ...fields });
      console.log(obj);
      console.log(files);
      const url = 'http://localhost:8080/animals';
      const response = await controller.postData(url, obj);
      console.log(response);


      // const oldpath = files.imageInput.path;
      // const newpath = `${'./files-tmp'}/${files.imageInput.name}`;

      // console.log(oldpath);
      // console.log(newpath);
      // fs.renameSync(oldpath, newpath);

      // const base64 = await ImageToBase64(newpath);
      // console.log(base64);

      // fs.appendFile('./files-tmp/test.txt', 'test', (error) => {
      //   if (error) throw error;
      //   console.log('Saved!');
      // });

      // fs.writeFileSync('./files-tmp/test.txt', base64, (error) => {
      //   if (error) console.log(error);
      // });

      // const y = Buffer.from().toString('base64');
      // console.log(y);
      // res.write('File uploaded');
      // res.end();
    });
    res.status(201).json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
