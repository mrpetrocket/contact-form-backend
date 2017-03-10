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
 * @param pretendSource This is the "your email" field in the contact form
 * @param actualSource This is the email address that shows up in the "from" field of the email that comes from the contact form
 * @param senderName Name of the sender from the contact form
 * @param to
 * @param subject
 * @param message
 * @returns {Promise}
 */
module.exports = function mail(pretendSource, actualSource, senderName, to, subject, message) {
    log.silly("send mail from %s to %s", pretendSource, to);
    var data = {
        from: actualSource,
        to: to,
        subject: subject,
        text: bodyText(senderName, pretendSource, message),
        html: bodyHtml(senderName, pretendSource, message)
    };
    return transporter.sendMail(data)
        .catch(function(err) {
            log.error("mail() failed", err);
            throw(err);
        });
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
