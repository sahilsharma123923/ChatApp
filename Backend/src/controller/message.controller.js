const Message = require('../models/message.model')
const userModel = require('../models/user.model')
const cloudinary = require('../config/cloudinary')

async function getContacts(req, res) {
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUser } }).select("-password")

        return res.status(200).json({
            message: "Contacts found successfully",
            filteredUsers
        })

    } catch (err) {
        console.log("Error in getContacts :", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getMessages(req, res) {
    try {
        const myID = req.user._id;
        const { id: userTochatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myID, receiverId: userTochatId },
                { senderId: userTochatId, receiverId: myID }
            ]
        });

        return res.status(200).json(messages)

    } catch (err) {
        console.log("Error in getMessages: ", err.message)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function sendMessages(req, res) {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        return res.status(201).json({
            message: "Message send successfully",
            newMessage
        });

    } catch (err) {
        console.log("Error in sendMessages controller :", err.message)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
async function getChats(req,res) {
    try{
    const loggedInUser=req.user._id;

    const messages=await Message.find({
        $or:[{senderId:loggedInUser},{receiverId:loggedInUser}]
    });
    
    const chatPartnerIDs=[
        ...new Set(
            messages.map((msg)=>
            msg.senderId.toString()===loggedInUser.toString()
        ?msg.receiverId.toString():msg.senderId.toString()
    ))
    ];
    const chatPartners=await userModel.find({id:{$in:chatPartnerIDs}}).select("-password")

    return res.status(200).json({chatPartners})
}catch(err){
    console.log("Error in getChats controller :",err)

    return res.status(500).json({
        message:"Internal server error"
    })
}
}

module.exports = { getContacts, getMessages, sendMessages , getChats}