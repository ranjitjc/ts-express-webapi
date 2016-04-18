///<reference path="node_modules/rxjs/Rx.d.ts"/> 

import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import * as Rx from "rxjs/Rx"

//import * as io from "socket.io"  

require('./ws-server.js');


const app = express(); // 1

app.get('/', (req, res) => res.send('Hello from Express')); // 2

const products = require('./routes/product/product.js')(app);


const server = app.listen(7000, "197.16.8.159", () => { // 3
 
   const {address, port} = server.address(); // 4
   console.log('Listening on http://197.16.8.159:' + port);
});

var io = require('socket.io')(server);

var observable = Rx.Observable.create(function (observer){
    
});

var source = Rx.Observable.interval(500)
    .startWith(1)
    .take(1);
    
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;




  source.subscribe(x =>
  {
      console.log('emit' + x);
     socket.broadcast.emit('newData', { 
        currentCount: x 
     });
  });
  
  
  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
    
    console.log('add user:' + username + '; numUsers: ' + numUsers);
    
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



