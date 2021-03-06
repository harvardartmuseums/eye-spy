
let io = require('socket.io');
let _ = require('lodash');

let stats = {
    playerCount: 0,
    players: []
};

let game = {
    started: false,
    clues: [],
    gallery: {},
    object: {}
}

let state = _.cloneDeep(game);

module.exports.listen = function(app){
    io = io.listen(app)

    let mcpSockets = io.of('/mcp');
    let playerSockets = io.of('/player');    
    
    playerSockets.on('connection', function(socket) {
        console.log('player connected');
        
        stats.playerCount +=1;
        socket.emit('join game', state);
        
        socket.on('disconnect', function() {
            stats.playerCount -=1;
            console.log('player disconnect')
        });
    });
    
    mcpSockets.on('connection', function(socket) {
        console.log('mcp connected');
        
        socket.emit('start up', state);

        socket.on('start game', function(object, gallery) {
            state = _.cloneDeep(game);
            state.started = true;
            state.gallery = gallery;
            state.object = object
            playerSockets.emit('game started', state);
        });

        socket.on('update game', function(data) {
            if (state.started) {
                state.clues.push(data);
                playerSockets.emit('game updated', state);
            }
        })

        socket.on('end game', function(data) {
            state.started = false;
            playerSockets.emit('game ended', state);
        });

        socket.on('disconnect', function() {
            console.log('mcp disconnect')
        });
    });

    return io;
}