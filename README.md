# front

> My neat Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Server API

If you want use another API to get data, you must to add your controller in folder ``server`` and update `index.js`

Add controler in folder `server`

```
'use strict'
const Moment = require("moment");
const Database = use('App/Models/Database');

class ApiController {
  constructor(app) {
    this.app = app;
    this.index();
  }
  index (){
    this.app.get('/api', (req, res) => {
      Axios.get("http://back/api").then((response) => {
        res.send(response.data);
      }).catch((err) => {
        console.log(err);
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
    });
  }
}

module.exports = ApiController;


```

Update ``server.js`` to add your controller.
```
const ApiController = require("./controllers/testApiController.js");
new ApiController(app);
```

#Docker
## Config
When i want to run with docker, you must to run the node server on ``loacalhost``.
I have add new line in ``nuxt.config.js`` to run on `0.0.0.0` host and `8080` port
```
module.exports = {
  
  ...
  
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  }
}
```

I have use image prepared by TheCodingMachine to build my image. ``thecodingmachine/nodejs:10``.

#docker compose

```
front:
    image: thecodingmachine/nodejs:10
    command: npm run dev
    working_dir: /usr/src/app
    labels:
      - 'traefik.backend=frontend'
      - 'traefik.frontend.rule=Host:front.${HOST_URL}'
      - 'traefik.port=8080'
    volumes:
      - ./front:/usr/src/app
    env_file:
      - ./.env
```
