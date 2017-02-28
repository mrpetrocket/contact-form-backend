let log = require("./log");

/**
 * @param config require("config") or test mock
 * @param mail require("mail") or test mock
 * @returns {Object} routes
 */
module.exports = function(config, mail) {
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
            log.debug(req.body["g-recaptcha-response"]);
            log.debug(req.body);
            if (config.get("recaptcha.use") && req.recaptcha.error) {
                log.error(req.recaptcha.error);
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
                        log.debug(result.array());
                        return res.status(400).send("invalid form parameters");
                    } else {
                        mail(req.body.from, config.get("email.destination"), req.body.subject, req.body.message);
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