let bodyParser = require('body-parser'),
    express = require("express"),
    expressValidator = require("express-validator");

module.exports = function(mail) {
    let routes = require("./routes")(mail);
    let app = express();

    app.use(bodyParser.json());
    app.use(expressValidator());
    app.post('/send', routes.send);

    return app;
};

