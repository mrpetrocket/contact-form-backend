/**
 * @file
 * entry point
 */

let app = require("./app"),
    config = require("config"),
    mail = require("./mail"),
    log = require("./log");

let mailerApp = app(mail);
let port = 3000;

mailerApp.listen(port, function () {
    log.info("Mailer version %s listening on port %d!", config.get("version"), port)
});