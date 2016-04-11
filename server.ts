///<reference path="node_modules/rxjs/Rx.d.ts"/> 

import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import * as Rx from "rxjs/Rx"

//import * as io from "socket.io"  



const app = express(); // 1

app.get('/', (req, res) => res.send('Hello from Express')); // 2

const products = require('./routes/product/product.js')(app);


const server = app.listen(7000, "localhost", () => { // 3
 
   const {address, port} = server.address(); // 4
   console.log('Listening on http://localhost:' + port);
});

var io = require('../..')(server);

var observable = Rx.Observable.create(function (observer){
    
});

var source = Rx.Observable.interval(500)
    .startWith(1)
    .take(1);
    

io.on('connection', function (socket) {
  var addedUser = false;

  source.subscribe(x =>
  {
      console.log('emit' + x);
     socket.broadcast.emit('newData', { 
        currentCount: x 
     });
  });
  // when the client emits 'new message', this listens and executes
//   socket.on('new message', function (data) {
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit('new message', {
//       username: socket.username,
//       message: data
//     });
//   });
});  