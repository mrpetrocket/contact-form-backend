let bodyParser = require('body-parser'),
    config = require('config'),
    cors = require("cors"),
    express = require("express"),
    expressValidator = require("express-validator"),
    log = require("./log"),
    recaptcha = require("express-recaptcha");

recaptcha.init(config.recaptcha.site_key, config.recaptcha.secret_key);

module.exports = function(mailservice, useRecaptcha) {
    let routes = require("./routes")(mailservice, useRecaptcha);
    let app = express();

    app.use(bodyParser.json());
    // from http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
    // html forms are by default urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(expressValidator());
    app.set("view engine", "ejs");
    app.post('/send', cors({
        optionsSuccessStatus: 200
    }), recaptcha.middleware.verify, routes.send);
    app.get("/", recaptcha.middleware.render, routes.contactform);

    return app;
};

