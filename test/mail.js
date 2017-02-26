var mail = require("../mail");
describe("mailer", function() {
    it("should not report error when mailing", function() {
        return mail("mrpetrocket+from@gmail.com", "mrpetrocket+to@gmail.com", "subject", "message");
    });
    it("should send email");
});
