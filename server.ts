import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

//import * as routes from "./routes/product";


const app = express(); // 1

app.get('/', (req, res) => res.send('Hello from Express')); // 2

const products = require('./routes/product/product.js')(app);


const server = app.listen(7000, "localhost", () => { // 3
 
   const {address, port} = server.address(); // 4
   console.log('Listening on http://localhost:' + port);
});