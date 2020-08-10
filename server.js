const http = require('http');

const server = http.createServer((req,res)=>{
 
  //set header content type
  res.setHeader('Content-Type','text/plain');
  
  res.write('hello, ninjas');
  res.end();
});

server.listen(4000, 'localhost',()=>{
  console.log('listening on port 4000')
})