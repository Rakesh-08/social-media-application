let mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
let dbConnection = mongoose.connection;

dbConnection.on("error", () => {
    console.log("Error occurred while connecting to MongoDB")
});

dbConnection.once("open", () => {
    console.log("Connected to MongoDB");
});

// cron background job for notification;
require("./utils/cronJobForNotifications")

// express middleware configuration
let express = require("express");
let expressApp = express();
let bodyParser = require("body-parser");
let cors = require("cors");
let path = require("path")

expressApp.use(express.static(path.join(__dirname, "/public")));


expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(cors());



// routes
require("./Routes/userRoutes")(expressApp);
require("./Routes/authRoutes")(expressApp);
require("./Routes/postRoutes")(expressApp);
require("./Routes/notificationRoutes")(expressApp);



expressApp.listen(process.env.PORT, () => {

    console.log("server listening on port " + process.env.PORT)
})


