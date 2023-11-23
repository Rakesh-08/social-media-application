let mongoose = require("mongoose");
let { DB_Name, DB_URL } = require("./config/dbConfig")

mongoose.connect(DB_URL);
let dbConnection = mongoose.connection;

dbConnection.on("error", () => {
    console.log("Error occurred while connecting to MongoDB")
});

dbConnection.once("open", () => {
    console.log("Connected to MongoDB");
 })



// express middleware configuration

require("dotenv").config();
let express = require("express");
let expressApp = express();
let bodyParser = require("body-parser");
let cors = require("cors");

expressApp.use(bodyParser.json({limit:'30mb'}))
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(cors());


// routes
require("./Routes/userRoutes")(expressApp);
require("./Routes/authRoutes")(expressApp);
require("./Routes/postRoutes")(expressApp);


expressApp.listen(process.env.Port, () => {

     console.log("server listening on port " + process.env.Port)
})


