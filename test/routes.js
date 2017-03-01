let chai = require("chai"),
    log = require("../log"),
    request = require('supertest');
let expect = chai.expect;
let mailMock = function() {
    log.silly("fake mail() call with arguments", arguments);
};
let app = require("../app")(mailMock, false);
var validMailParams = {
    from: "valid@email.com",
    subject: "valid subject",
    message: "valid message"
};

describe("routes", function() {
    it("should return 204 for valid mail request", function() {
        return testSendRoute(validMailParams, 204);
    });
    it("should return 400 for missing 'from' address", function() {
        return testSendRoute({
            subject: "valid subject",
            message: "valid message"
        }, 400);
    });
    it("should return 400 for invalid 'from' address", function() {
        return testSendRoute({
            from: "lol not valid",
            subject: "valid subject",
            message: "valid message"
        }, 400);
    });
    it("should return 400 for missing param 'subject'", function() {
        return testSendRoute({
            from: "valid@email.com",
            message: "valid message"
        }, 400);
    });
    it("should return 400 for missing param 'message'", function() {
        return testSendRoute({
            from: "valid@email.com",
            subject: "valid subject"
        }, 400);
    });
    it("should return 400 for missing recaptcha", function() {
        return request(require("../app")(mailMock))
            .post("/send")
            .send(validMailParams)
            .expect(400)
            .then(response => {
                expect(response.error.text).to.equal("recaptcha error");
            });
    });
});

// generic test "send X parameters to send route, see what response code comes out"
function testSendRoute(params, expectedCode) {
    return request(app)
        .post("/send")
        .send(params)
        .expect(expectedCode);
}
