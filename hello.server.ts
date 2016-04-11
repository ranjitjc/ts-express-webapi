import * as http from 'http'; // 1
 
const server = http.createServer((request, response)=> {
response.writeHead(200, {'Content-Type': 'text/application/json'});
//response.end('Hello World!\n');
response.end('{"message": "Hello Json!"}\n');
});
 
const port = 7000;
 
server.listen(port); // 2
console.log('Listening on http://localhost:' + port);

//To minimize manual coding we’ll install Express,