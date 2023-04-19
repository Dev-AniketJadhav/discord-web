const User=require('../../models/user');
//const FriendInvitation=require('../../models/friendInvitation');
const FriendInvitation=require('../../models/friendInvitation');
const friendsUpdate=require('../../socketHandlers/updates/friends')
const postInvite =async (req,res)=>{
    const {targetMailAddres}= req.body;

    const {userId,mail}=req.user;
    //friend that we would like to invite is nnit use-----check coondition
    if(mail.toLowerCase()===targetMailAddres.toLowerCase())
    {
    //conflict response  
    return res.status(409).send('Sorry, You cannot send request to yourself')
    }

    const targetUser= await User.findOne({
        mail:targetMailAddres.toLowerCase()
    });

    if(!targetUser){
        return res.status(404).send(`${targetMailAddres} has not found please check maill  address`);
    };

    //what if invitaation has been already send ?
    const invittationAlreadyReceived= await FriendInvitation.findOne({
        senderId:userId,
        receiverId:targetUser._id   
    })
    if (invittationAlreadyReceived) {
        return res.status(409).send('Invitation has been already send ')
        
    };

    //what if user is already my friend 
    const usersAlreadyFriend= targetUser.friend.find(
        friendId=> friendId.toString()===userId.toString());

        if(usersAlreadyFriend){
            return res.status(409).status('Friend Already Exist !')
        };

        // create new Invitation in database
        const newInvitation=await FriendInvitation.create({
            senderId:userId,
            receiverId:targetUser._id,
        });

        //send pending invitiation update to specific user
        friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('controller is working');
}

module.exports=postInvite;