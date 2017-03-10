/**
 * @file
 * entry point
 */

let app = require("./app"),
    config = require("config"),
    mailservice = require("./mailservice")(require("./mail")),
    log = require("./log");

let mailerApp = app(mailservice);
let port = config.get("port");

mailerApp.listen(port, function () {
    log.info("Mailer version %s listening on port %d!", config.get("version"), port)
});