let nodemailer = require('nodemailer');
let AWS = require('aws-sdk');
AWS.config.region = "us-west-2";
let transporter = nodemailer.createTransport({
    SES: new AWS.SES({apiVersion: '2010-12-01'})
});

module.exports = function mail(from, to, subject, message) {
    // TODO: add "from" to the body
    var data = {
        from: from,
        to: to,
        subject: subject,
        text: message
    };
    return transporter.sendMail(data)
        .catch(function(err) {
            console.error("sendMail failed", err);
            throw(err);
        });
};
