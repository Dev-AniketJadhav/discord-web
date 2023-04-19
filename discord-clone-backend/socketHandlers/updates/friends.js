const User=require('../../models/user');
const FriendInvitation=require('../../models/friendInvitation');
const serverStore=require('../../serverStore');

const updateFriendsPendingInvitation= async (userId)=>{
    try {
        const pendingInvitations= await FriendInvitation.find({
            receiverId:userId,
        }).populate('senderId')
        const receiverList= serverStore.getActiveConnections(userId);
  const io=serverStore.getSocketServerInstance();
   receiverList.forEach(receiverSocketId=>{
    io.to(receiverSocketId.emit('friends-invitations',{
        pendingInvitations:pendingInvitations? pendingInvitations:[],
    }))
   })
    } catch (err) {
        console.log(err);
    }
    //find ll active connectioons of specific userId
  

}
module.exports={
    updateFriendsPendingInvitation
}