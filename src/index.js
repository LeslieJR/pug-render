require('./mongo');
const server = require('./server');

server.listen(server.get('port'), ()=>{
    console.log('listening to port number: ', server.get('port'));
})
