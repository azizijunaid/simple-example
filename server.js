var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


var app = express();
var port = (process.env.PORT || 7000);

app.use(bodyParser.json())


//////////////schema and model///////////////////////////////////////////
var studentSchema = new mongoose.Schema({
    email: String,
    name: String
});
var studentModel = mongoose.model("student", studentSchema);
//////////////schema and model//////////////////////////////////////////


app.post("/add", function (req, res, next) {

    console.log("body is: ", req.body);

    var newStudent = new studentModel({
        email: req.body.email,
        name: req.body.name,
    })

    newStudent.save(function (err, data) {
        if (!err) {
            console.log("student is saved");
            res.send("student is saved");
        } else {
            res.send("student saving failed", err);
            console.log("student saving failed", err);
        }
    });
});



app.get("/", function (req, res, next) {
    console.log("reauest is comming to '/' ");
    res.send("Hello world");
});

app.listen(port, function () {
    console.log('app is running on port', port);
});

mongoose.connect("mongodb://addmin:addmin@ds059185.mongolab.com:59185/salesmanapp");

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});