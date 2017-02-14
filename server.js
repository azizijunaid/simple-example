var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


var app = express();
var port = (process.env.PORT || 7000);

app.use(bodyParser.json())

var dbUrl = mongoose.connect('mongodb://mani:mani@ds153179.mlab.com:53179/example');

//////////////schema and model///////////////////////////////////////////
var signUpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    pass: Number,
    address: String,
    time: { type: Date, default: Date.now }
});
var userModel = mongoose.model("user", signUpSchema);
//////////////schema and model//////////////////////////////////////////


app.post("/signup", function (req, res, next) {
    var newUser = new userModel({
        email: req.body.email,
        name: req.body.name,
        pass: req.body.pass,
        address: req.body.address
    })
    newUser.save(function (err, data) {
        if (!err) {
            console.log("student is saved" + data);
            res.send("student is saved");
        } else {
            res.send("student saving failed");
            console.log("student saving failed" + err);
        }
    });
});


app.get("/user", function (req, res, next) {
    userModel.find({address : "karachi",name: "majid"}, function (err, data) {
        if (err) {
            console.log("Error" + err )
            res.send(err)
        }
        else {
            console.log("Data" + data )            
            res.send(data)
        }
    })
});


app.delete("/user", function (req, res, next) {
    userModel.remove({address : "karachi",name: "majid"}, function (err, data) {
        if (err) {
            console.log("Error" + err )
            res.send(err)
        }
        else {
            console.log("Data" + data )            
            res.send(data)
        }
    })
});

app.listen(port, function () {
    console.log('app is running on port', port);
});

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});