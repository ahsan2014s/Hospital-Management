# Hospital-Management

## To run:
Git clone the repo. Then:

```Node
cd client
npm install
npm start
```

```Node
cd server
npm install
node server.js
```

## Endpoints
- localhost:5000/api/"endpoints" sends json format data using backend/src/routes/api.js. backend/src/data/dummyData.js file stores dummy data (will be replaced with     mongoDB later). 
- localhost:3000 is client side, where we will login from. 
- frontend/src/services/api grabs data from backend and sends to react compnenets for render.
