const connectedUsers= new Map();

let io=null;
const setSocketSevrrInstance=(ioInstance)=>{
    io=ioInstance;
 
}
const getSocketSevrerInstance=()=>{
    return io;
};
const addNewConnectUser= ({socketId, userId}) =>
{
    connectedUsers.set(socketId,{userId});
    console.log(("new connected users"));
    console.log(connectedUsers );
};
const removeConnectedUser=(socketId)=>{
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log('new connected users');
    console.log(connectedUsers);

    }

}
//Events specific to client Specific Id

const getActiveConnections=(userId)=>{
    const activeConnections=[];
    connectedUsers.forEach(function (value,key){
        if(value.userId==userId){
             activeConnections.push(key)
        }
    });
}

module.exports =
{
    addNewConnectUser,
    removeConnectedUser,
    getActiveConnections,
   
    setSocketSevrrInstance,
    getSocketSevrerInstance,
}