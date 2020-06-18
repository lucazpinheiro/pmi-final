
const axios = require('axios').default;


const auxData = [
  {
    date: '2020-06-16T18:03:08.683',
    description: 'string',
    id: 1,
    lat: -27.58711073037582,
    lng: -48.49845886230469,
    species: 'CAT',
    status: 'LOST',
    image: null,
    changeDate: '2020-06-16T15:53:47.942605',
    inclusionDate: '2020-06-16T15:53:47.942605',
  },
  {
    date: '2020-06-16T18:03:08.683',
    description: 'encontrei um gato, ele parece ser caseiro, tá muuito limpo pra ser gato de rua',
    id: 2,
    lat: -27.60354113900649,
    lng: -48.47579956054687,
    species: 'CAT',
    status: 'FOUND',
    image: null,
    changeDate: '2020-06-16T15:59:59.845805',
    inclusionDate: '2020-06-16T15:59:59.845805',
  },
  {
    date: '2020-06-16T18:03:08.683',
    description: 'meu coelho fugiu',
    id: 3,
    lat: -27.578590289821886,
    lng: -48.430824279785156,
    species: 'OTHER',
    status: 'LOST',
    image: null,
    changeDate: '2020-06-16T16:03:03.650852',
    inclusionDate: '2020-06-16T16:03:03.650852',
  },
  {
    date: '2020-06-16T18:03:08.683',
    description: 'meu cachorro pulou o muro de casa e se perdeu, help!!! É meio pastor alemão, meio viralata ele é muito manso',
    id: 4,
    lat: -27.57919891466959,
    lng: -48.535194396972656,
    species: 'DOG',
    status: 'LOST',
    image: null,
    changeDate: '2020-06-16T16:12:59.758802',
    inclusionDate: '2020-06-16T16:12:59.758802',
  },
];

async function getData(url) {
  try {
    const rawResponse = await axios.get(url);
    const data = await rawResponse.data;
    return auxData;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function postData(url, obj) {
  // exemplo de obj
  // const x = {
  //   date: "2020-06-16T18:03:08.683Z",
  //   description: "string",
  //   location: {
  //     lat: 0,
  //     lng: 0
  //   },
  //   species: "CAT",
  //   status: "LOST"
  // }

  try {
    const rawResponse = await axios.post(url, obj);
    const data = await rawResponse.data;
    return data;
  } catch (err) {
    return err;
  }
}

module.exports.getData = getData;
module.exports.postData = postData;
