let AWS = require('aws-sdk'),
    config = require("config"),
    ejs = require("ejs"),
    fs = require("fs"),
    log = require("./log"),
    nodemailer = require('nodemailer'),
    util = require("util");

AWS.config = new AWS.Config();
AWS.config.accessKeyId = config.get("aws.access_key_id");
AWS.config.secretAccessKey = config.get("aws.secret_access_key");
AWS.config.region = "us-west-2";

let transporter = nodemailer.createTransport({
    SES: new AWS.SES({apiVersion: '2010-12-01'})
});

var emailEjs = fs.readFileSync("./views/email.ejs", {encoding: "UTF-8"});
var emailEjsTemplate = ejs.compile(emailEjs);

/**
 * @param pretendSource This is the "my email" field in the contact form
 * @param actualSource This is the email address that we use to send emails from the contact form
 * @param to
 * @param subject
 * @param message
 * @returns {Promise}
 */
module.exports = function mail(pretendSource, actualSource, to, subject, message) {
    log.silly("send mail from %s to %s", pretendSource, to);
    var data = {
        from: actualSource,
        to: to,
        subject: "[Contact Form] " + subject,
        text: bodyText(pretendSource, message),
        html: bodyHtml(pretendSource, message)
    };
    return transporter.sendMail(data)
        .catch(function(err) {
            log.error("mail() failed", err);
            throw(err);
        });
};

/**
 * Generate HTML body from the mail request
 * @param from
 * @param message
 */
function bodyHtml(from, message) {
    return emailEjsTemplate({
        from: from,
        message: message
    });
}

function bodyText(from, message) {
    return util.format("From: %s, Message: %s", from, message);
}
