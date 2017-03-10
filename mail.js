let AWS = require('aws-sdk'),
    config = require("config"),
    log = require("./log"),
    nodemailer = require('nodemailer');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = config.get("aws.access_key_id");
AWS.config.secretAccessKey = config.get("aws.secret_access_key");
AWS.config.region = "us-west-2";

let transporter = nodemailer.createTransport({
    SES: new AWS.SES({apiVersion: '2010-12-01'})
});

/**
 * Send mail via SES
 * @param from Email address
 * @param to Email address
 * @param subject Email subject
 * @param text Body as text
 * @param html Body as html
 * @returns {Promise}
 */
module.exports = function mail(from, to, subject, text, html) {
    log.silly("send mail from %s to %s", from, to);
    var data = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
    return transporter.sendMail(data)
        .catch(function(err) {
            log.error("mail() failed", err);
            throw(err);
        });
};
