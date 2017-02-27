var config = require("config");

/**
 * @param mail require("mail") or test mock
 * @returns {Object} routes
 */
module.exports = function(mail) {
    return {
        /**
         * request parameters
         * "from" reply email address. either not present or a valid email address.
         * "subject" string. valid characters for subject
         * "message" string. valid characters for message.
         */
        send: function send(req, res) {
            // param validation
            req.check("from").notEmpty().isEmail();
            req.check("subject").notEmpty();
            req.check("message").notEmpty();
            req.sanitize("subject");
            req.sanitize("message");

            req.getValidationResult()
                .then(function(result) {
                    if (!result.isEmpty()) {
                        return res.status(400).send("invalid form parameters");
                    }
                    mail(req.body.from, config.get("email.destination"), req.body.subject, req.body.message);
                    res.status(204).send("");
                });
        }
    };

};