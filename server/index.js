let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
const route = require("./route/routes");
const app = express();
app.use(cors());
//JSON parsing
app.use(bodyParser.json());
// UrlEncodeed data parsing
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use("/", route)
const port = process.env.PORT || 4000;
app.use((req, res, next) => {
    res.status(404).send("Error 404!");
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
app.listen(port, () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbConfig.db).then(
        () => {
            console.log("Database successfully connected");
            console.log("Connected to port " + port);
        },
        (error) => {
            console.log("could not connect to database :" + error);
        }
    );
});