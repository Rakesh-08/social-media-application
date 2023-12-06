
let notificationModel = require("../models/notificationModel");

let deleteNotification = async (req, res) => {
    try {
        let notification = await notificationModel.findOne({ _id: req.params.notificationId });

        notification.To= notification.To.filter(id=>id!=req._id)
        await notification.save();

        res.status(200).send({
            message:"notification deleted successfully"
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message:"some error occured while sending notification"
        })
    }
}
let getNotificationsByUserId = async (req, res) => {
    try {

        let notifications = await notificationModel.find({
            To:req._id
        })

        if (notifications.length > 0) {
            res.status(200).send(notifications)
         } else {
            res.status(200).send([])
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "some error occured while fetching notification"
        })
    }
}

let changeNotificationReadStatus = async(req,res) => {
    try {
        let ids = req.body.ids;

        console.log(ids)

        let notifications = await notificationModel.updateMany({
            _id: {
                $in: ids
            }
        },{$push:{seen:req._id}},{new:true})
       
        res.status(200).send(notifications);
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "some error occured while changing the seen/read status of notification" });
    }
}

let sendNotifications = async (from,To,msg,senderImage) => {
    
    try {

        let notification = await notificationModel.create({
            from,To,msg,senderImage
        })
        
        return notification
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "some error occured while creating notification" });
    }
}

module.exports = {
    deleteNotification,
    getNotificationsByUserId,
    sendNotifications,
    changeNotificationReadStatus
}
