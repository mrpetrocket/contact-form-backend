let bodyParser = require('body-parser');
let express = require("express");
let mail = require("./mail");
let routes = require("./routes")(mail);
let expressValidator = require("express-validator");

let app = express();

app.use(bodyParser.json());
app.use(expressValidator());
app.post('/send', routes.send);
