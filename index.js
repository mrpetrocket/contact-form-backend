/**
 * @file
 * entry point
 */

let app = require("./app"),
    config = require("config"),
    mail = require("./mail"),
    log = require("./log");

let mailerApp = app(config, mail);
let port = 3000;

mailerApp.listen(port, function () {
    log.info("Mailer listening on port %d!", port)
});