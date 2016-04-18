import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import * as Rx from "rxjs/Rx"
import {Server} from 'ws';



//creates a new server socket Subject
const createRxSocket = (connection) => {
  let messages = Rx.Observable.fromEvent(connection, 'message', (message) => JSON.parse(message));
  let messageObserver:any = {
    next(message){
      if(connection.readyState === 1){
        connection.send(JSON.stringify(message));        
      }
     }
  }
  connection.on('close', () => {
    connection.streams && connection.streams.forEach(s => s.unsubscribe());
  })
  return Rx.Subject.create(messages, messageObserver);
}

const createRxServer = (options) => {
  return new Rx.Observable(serverObserver => {
    console.info('started websocket server at port :' + options.port);  
    let wss = new Server(options);
    wss.on('connection', connection => serverObserver.next(connection));
    return () => {
      wss.close();
    }
  }).share();
}



const socketServer = createRxServer({port: 8081});
const connections = socketServer.map(createRxSocket);

let messageEvents$ = connections.flatMap(connection => connection.map(message => ({connection, message})));

let [subs, unsubs] = messageEvents$.partition(({message:{type}}:any) => type === 'sub');

subs.subscribe(({connection, message:{symbol}}:any) => {
  const source = Rx.Observable.interval(500).map(() => ({
    symbol,
    price: Math.random() * 100,
    timestamp: Date.now()
  }));
  connection.streams = connection.streams || {};
  connection.streams[symbol] = source.subscribe(connection);
});
  
unsubs.subscribe(({ connection, message:{symbol}}:any) => {
  connection.streams && connection.streams[symbol].unsubscribe();
});
