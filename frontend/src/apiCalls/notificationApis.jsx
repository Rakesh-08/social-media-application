
import apis from "./apiUtils";


let fetchAllNotifications = async () => {
    return await apis.axiosInstance.get("/pgm/notifications");
}

let deleteNotification = async (id) => {
    return await apis.axiosInstance.delete("/pgm/notification/" + id);
}

let changeSeenStatus=async (ids) => {
    return await apis.axiosInstance.put("/pgm/notifications", ids);
}
 
export {fetchAllNotifications,deleteNotification,changeSeenStatus}