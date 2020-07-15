const axios = require('axios');

axios.get('http://localhost:8080/stats/author/ratings')
  .then(res => {
    console.log(res.status);
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });
