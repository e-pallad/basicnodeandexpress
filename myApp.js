var express = require('express');
var app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
      var json_string = "Hello json".toUpperCase();
    } else {
      var json_string = "Hello json";
    }
    res.json({"message": json_string})
})

app.get('/now', function(req, res, next) {
    req.timestamp = new Date().toString();
    next();
}, function(req, res) {
    res.send({"time": req.timestamp});
});







 module.exports = app;
