const axios = require('axios');

axios.get('http://localhost:8080/stats/sku/lotus_cafe_-_jw_marriott_mumbai_juhu_juhu,_mumbai/ratings/')
  .then(res => {
    console.log(res.status);
    console.log(res.data);
  })
  .catch(err => { console.log(err); });
