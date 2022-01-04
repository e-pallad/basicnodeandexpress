var express = require('express');
var app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
      var json_string = "Hello json".toUpperCase();
    } else {
      var json_string = "Hello json";
    }
    res.json({"message": json_string})
})









 module.exports = app;
