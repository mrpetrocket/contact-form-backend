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
                .then(function() {
                    mail(req.params.from, config.get("email.destination"), req.params.subject, req.params.message);
                    res.status(204).send("");
                });
        }
    };

};