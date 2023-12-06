let { verifyToken } = require("../middlewares/authMiddleware");
let {deleteNotification,getNotificationsByUserId,changeNotificationReadStatus } = require("../controllers/notificationController");

module.exports = (app) => {
    app.get("/pgm/notifications",verifyToken,getNotificationsByUserId);
    app.delete("/pgm/notification/:notificationId", verifyToken, deleteNotification);
    app.put("/pgm/notifications", verifyToken, changeNotificationReadStatus)
}