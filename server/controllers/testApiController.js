const Axios = require('axios');
const Moment = require('moment');

class ApiController {
  index (req, res){
      Axios.get("http://back:8080/api").then((response) => {
        res.send(response.data);
      }).catch((err) => {
        console.log("error get api !");
        res.send({
          backend:{
            check: false,
            time: Moment().format()
          },
          mysql:{
            check: false,
            time: Moment().format()
          }
        });
      });
  }
}


module.exports = ApiController;
