/**
 * @file
 * sits between routes.send and mail()
 */
let config = require("config"),
    ejs = require("ejs"),
    fs = require("fs"),
    util = require("util");

var emailEjs = fs.readFileSync("./views/email.ejs", {encoding: "UTF-8"});
var emailEjsTemplate = ejs.compile(emailEjs);

module.exports = function(mail) {
    return {
        bodyText: bodyText,
        bodyHtml: bodyHtml,

        /**
         * Takes contact form parameters and sends them as an email
         * @param fromName
         * @param fromEmail
         * @param message Message plain text
         * @returns Promise
         */
        send: function (fromName, fromEmail, message) {
            return mail(
                config.get("email.source"),
                config.get("email.destination"),
                config.get("email.subject"),
                bodyText(fromName, fromEmail, message),
                bodyHtml(fromName, fromEmail, message)
            );
        }
    };
};

/**
 * Generate HTML body from the mail request
 * @param name
 * @param email
 * @param message
 */
function bodyHtml(name, email, message) {
    return emailEjsTemplate({
        email: email,
        message: message,
        name: name
    });
}

function bodyText(name, email, message) {
    return util.format("From: %s, Email: %s, Message: %s", name, email, message);
}
