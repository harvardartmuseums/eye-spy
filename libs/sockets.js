
let io = require('socket.io');

let stats = {
    playerCount: 0,
    players: []
};

let game = {
    clues: [],
    gallery: {},
    object: {}
}

let state = Object.assign({}, game);

module.exports.listen = function(app){
    io = io.listen(app)

    let mcpSockets = io.of('/mcp');
    let playerSockets = io.of('/player');
    
    
    playerSockets.on('connection', function(socket) {
        console.log('player connected');
        
        state.playerCount +=1;
        socket.emit('join game', state);
        
        socket.on('disconnect', function() {
            state.playerCount -=1;
            console.log('player disconnect')
        });
    });
    
    mcpSockets.on('connection', function(socket) {
        console.log('mcp connected');
        
        socket.emit('start up', state);

        socket.on('start game', function() {
            playerSockets.emit('game started');
        });

        socket.on('update game', function() {
            playerSockets.emit('game updated');
        })

        socket.on('end game', function() {
            playerSockets.emit('game ended');
        });

        socket.on('disconnect', function() {
            console.log('mcp disconnect')
        });
    });

    return io;
}