const express =  require('express');
const app = express();
const http = require('http');
const server = http.createServer(app); //Request listener
const path = require('path');
const socketio = require('socket.io');
const io = socketio(server); // io s an object



const users = {}
// for server start
app.use('/',express.static(path.join(__dirname, 'public')));

io.on('connection', (socket)=>{
    console.log(`connection establised at ${socket.id}`);

    socket.on('Send-msg' , (data)=>{
        console.log(data)
        // socket.emit('recive-msg' , {
        io.emit('recive-msg' , {
            msg : data.msg ,
            id: socket.id,
            username : users[socket.id]
        })
    })
    socket.on('login' , (data)=>{
        // console.log(data);
        users[socket.id] = data.username;

    })



})

const port = process.env.PORT || 3000;

server.listen (port ,() =>{
    console.log(`Server connected at port ${port}`)
});