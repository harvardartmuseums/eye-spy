
let io = require('socket.io');

let connections = [];

module.exports.listen = function(app){
    io = io.listen(app)

    let screenSockets = io.of('/screens');
    let shadeSockets = io.of('/shades');
    let controllerSockets = io.of('/controller');
    
    
    screenSockets.on('connection', function(socket) {
        console.log('screen socket connected');
        
        //socket.emit('start up', 'value');
        
        socket.on('disconnect', function() {
            console.log('screen socket disconnect')
        });
    });
    
    controllerSockets.on('connection', function(socket) {
        console.log('controller socket connected');
        
        //socket.emit('start up', 'value');

        socket.on('disconnect', function() {
            console.log('controller socket disconnect')
        });
    });
    
    shadeSockets.on('connection', function(socket) {
        console.log('shade socket connected');
        
        //socket.emit('start up', 'value');
        
        socket.on('disconnect', function() {
            console.log('shade socket disconnect')
        });
    });

    return io;
}