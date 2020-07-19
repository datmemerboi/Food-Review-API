Food Review API
=
## NodeJS | MongoDB | Express

Basic CRUD API built on Express for reviews stored in MongoDB

### Installation
Run `npm install && npm start` or `npm install && node src/app.js PORT_NUMBER` to start the server.
Go to `http://localhost:8080` (default) or `http://localhost:PORT_NUMBER` for instructions.

### API Endpoints
* create, read, update, delteOne, deleteMany
* all
* find
* stats/sku/{which sku}/ratings
* stats/author/ratings
* stats/time/ratings

**Note**: you can provide query parameters such as `?limit=10` or `?page=2`.

### File Description

*src/app.js* - entry point

*public/index.html* - landing page

*mongo/schemaModel.js* - contains mongoose schema & model

*mongo/interaction-module.js* - function modules for all mongo interactions

*mongo/populatedata.js* - to popluate DB with sample data

*axios/* - axios request to check each API endpoint
