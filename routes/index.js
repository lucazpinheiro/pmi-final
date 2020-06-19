/* eslint-disable no-console */
const express = require('express');
const formidable = require('formidable');
const path = require('path');

const form = new formidable.IncomingForm();

const router = express.Router();
const fs = require('fs');

const controller = require('../controller/index');

const rawdata = fs.readFileSync('./resources/content.json');
const resource = JSON.parse(rawdata);


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


function buildGeoJson(doc) {
  return {
    type: 'Feature',
    properties: {
      description: doc.description,
      date: doc.inclusionDate,
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


router.get('/image/:imageId', async (req, res) => {
  const fileName = req.params.imageId;
  console.log(fileName);
  try {
    res.sendFile(path.join(__dirname, '../uploaded-images', fileName));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


function parseRequest(obj) {
  const latlng = JSON.parse(obj.location);
  const postRequestBody = {
    description: obj.description,
    location: { ...latlng },
    species: obj.typeInput,
    status: obj.statusInput,
  };
  console.log(postRequestBody);
  return postRequestBody;
}

function generateFileID(fileName, fileType, status, type) {
  const name = fileName.replace(/[\. ,:-]+/g, '-');
  return `${name}-${status}${type}.${fileType}`;
}

router.post('/post', async (req, res) => {
  try {
    form.parse(req, async (err, fields, files) => {
      const obj = parseRequest({ ...fields });
      const url = 'http://localhost:8080/animals';
      const response = await controller.postData(url, obj);
      console.log(response);

      if (files.length !== 0) {
        const fileName = files.imageInput.name.split('.');
        const fileType = files.imageInput.type.split('/');
        const imageId = generateFileID(fileName[0], fileType[1], fields.statusInput, fields.typeInput);


        const tempPath = files.imageInput.path;
        const newpath = `${'./uploaded-images'}/${imageId}`;
        fs.renameSync(tempPath, newpath);
      }
    });
    res.status(201).json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
