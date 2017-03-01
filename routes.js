let config = require("config"),
    log = require("./log");

/**
 * @param mail require("mail") or test mock
 * @param {Boolean} [useRecaptcha=true] Set to false for server-side testing where recaptcha is not available
 * @returns {Object} routes
 */
module.exports = function(mail, useRecaptcha) {
    if (typeof useRecaptcha === "undefined") {
        useRecaptcha = true;
    }
    if (!useRecaptcha) {
        log.warn("recaptcha verification is OFF; testing only");
    }
    return {
        /**
         * Basic contact form for end to end test
         * @param req
         * @param res
         */
        contactform: function contactform(req, res) {
            return res.render("index.ejs", {
                captcha: req.recaptcha
            });
        },
        /**
         * request parameters
         * "from" reply email address. either not present or a valid email address.
         * "subject" string. valid characters for subject
         * "message" string. valid characters for message.
         */
        send: function send(req, res) {
            // recaptcha
            if (useRecaptcha && req.recaptcha.error) {
                log.error("recaptcha error", req.recaptcha.error);
                return res.status(400).send("recaptcha error");
            }

            // param validation
            req.check("from").notEmpty().isEmail();
            req.check("subject").notEmpty();
            req.check("message").notEmpty();
            req.sanitize("subject");
            req.sanitize("message");

            req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        log.error("params error", result.array());
                        return res.status(400).send("invalid form parameters");
                    } else {
                        mail(req.body.from, config.get("email.source"), config.get("email.destination"), req.body.subject, req.body.message);
                        res.status(204).send("");
                    }
                })
                .catch(function(err) {
                    log.error(err);
                    res.status(500).send("");
                });
        }
    };

};