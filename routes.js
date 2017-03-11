let config = require("config"),
    log = require("./log");

/**
 * @param mailservice require("./mailservice") or test mock
 * @param {Boolean} [useRecaptcha=true] Set to false for server-side testing where recaptcha is not available
 * @returns {Object} routes
 */
module.exports = function(mailservice, useRecaptcha) {
    if (typeof useRecaptcha === "undefined") {
        useRecaptcha = true;
    }
    if (!useRecaptcha) {
        log.warn("recaptcha verification is OFF; testing only");
    }
    return {
        /**
         * Example contact form
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
         * "name" string.
         * "email" reply email address. either not present or a valid email address.
         * "message" string.
         */
        send: function send(req, res) {
            // recaptcha
            if (useRecaptcha && req.recaptcha.error) {
                log.error("recaptcha error", req.recaptcha.error);
                return res.status(400).send("recaptcha error");
            }

            // param validation
            req.check("name").notEmpty();
            req.check("email").notEmpty().isEmail();
            req.check("message").notEmpty();
            req.sanitize("name");
            req.sanitize("message");

            req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        log.error("params error", result.array());
                        return res.status(400).send("invalid form parameters");
                    } else {
                        return mailservice.send(req.body.name, req.body.email, req.body.message)
                            .then(function() {
                                res.status(204).send("");
                            });
                    }
                })
                .catch(function(err) {
                    log.error(err);
                    res.status(500).send("");
                });
        }
    };

};