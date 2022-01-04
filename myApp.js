var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.get("/:word/echo", (req, res) => {
    res.json({"echo": req.params.word})
})

app.get("/name", (req, res) => {
    res.json({"name": req.query.first + " " + req.query.last})
})

app.post("/name", function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
})



 module.exports = app;
