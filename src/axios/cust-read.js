const axios = require('axios');

var sampleData = {
  author: { $eq:"JasonEats" }
}

axios.post('http://localhost:8080/read', sampleData)
  .then(res => {
    console.log(res.status);
    var data = res.data;
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })
