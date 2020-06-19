
const axios = require('axios').default;


async function getData(url) {
  try {
    const rawResponse = await axios.get(url);
    const data = await rawResponse.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function postData(url, obj) {
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
