
// const { disconnect } = require('mongoose');
//const { Socket } = require('socket.io');

const authSocket= require('./middleware/authSocket');
const newConnectionHandler=require('./socketHandlers/newConnectionHandler');
const disconnectHandller=require('./socketHandlers/disconnectHandler');
const serverStore=require('./serverStore');
const registerSocketServer =(server) =>
{
    const io= require("socket.io")(server,{
        cors:{
            origin:"*",
            methods:["GET", "POST"],
           credential:true,
        },
    });
    serverStore.setSocketSevrrInstance(io);

    io.use((socket,next)=>
    {
 authSocket(socket,next)
    });

    io.on("connection",(socket)=>
    {
        console.log("user connected");
        console.log(socket.id);
        newConnectionHandler(socket,io);
        socket.on("disconnect", ()=> {
            disconnectHandller(socket)
        })
    });
}

module.exports={
    registerSocketServer,
}