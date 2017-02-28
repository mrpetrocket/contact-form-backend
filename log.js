let config = require("config"),
    winston = require("winston");

module.exports = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: config.get('log.level'),
            colorize: true
        })
    ]
});
