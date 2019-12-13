const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express(); 
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

const server = app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})

const io = socketIO(server);

io.on('connection',(socket)=>{
    console.log(`New User connected`);

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    })


    socket.on('createMessage',(message)=>{
        console.log(`Create message: ${message.text}`);
        io.emit('newMessage',{
            from: 'Ambuj',
            message: 'Hello',
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect',()=>{
        console.log('disconnected from client');
    });
})
