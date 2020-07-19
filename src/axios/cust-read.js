const axios = require('axios');

var query = {
  source: { "$eq":"ZoomAto.com" }
}

axios.post('http://localhost:8080/read', query)
  .then(res => {
    console.log(res.status);
    var data = res.data;
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })
