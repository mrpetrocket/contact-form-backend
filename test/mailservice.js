let config = require("config"),
    chai = require("chai"),
    expect = chai.expect;

describe("mailer", function() {
    it("should send pertinent details from contact form to mail()", function(done) {
        var contactForm = {
            name: "valid name",
            email: "valid@email.com",
            message: "valid message"
        };
        let mailMock = function(from, to, subject, text, html) {
            expect(from).to.equal(config.get("email.source"));
            expect(to).to.equal(config.get("email.destination"));
            expect(subject).to.equal(config.get("email.subject"));

            expect(text).to.contain(contactForm.name);
            expect(text).to.contain(contactForm.email);
            expect(text).to.contain(contactForm.message);

            expect(html).to.contain(contactForm.name);
            expect(html).to.contain(contactForm.email);
            expect(html).to.contain(contactForm.message);

            done();
        };
        var mailService = require("../mailservice")(mailMock);
        mailService.send(contactForm.name, contactForm.email, contactForm.message);

    });
});

/**
 * Returns true if text contains all other strings.
 * @param text
 * @param {...string} text must contain these string(s)
 * @returns boolean
 */
function contains(text) {

}
