let AWS = require('aws-sdk'),
    log = require("./log"),
    nodemailer = require('nodemailer');
AWS.config.region = "us-west-2";
let transporter = nodemailer.createTransport({
    SES: new AWS.SES({apiVersion: '2010-12-01'})
});

module.exports = function mail(from, to, subject, message) {
    log.silly("send mail from %s to %s", from, to);
    // TODO: add "from" to the body
    var data = {
        from: from,
        to: to,
        subject: "[Contact Form]" + subject,
        text: message
    };
    return transporter.sendMail(data)
        .catch(function(err) {
            log.error("mail() failed", err);
            throw(err);
        });
};
