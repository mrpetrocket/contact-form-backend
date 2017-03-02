/**
 * @file
 * entry point
 */

let app = require("./app"),
    config = require("config"),
    mail = require("./mail"),
    log = require("./log");

let mailerApp = app(mail);
let port = config.get("port");

mailerApp.listen(port, function () {
    log.info("Mailer version %s listening on port %d!", config.get("version"), port)
});