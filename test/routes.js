let request = require('supertest');
let mailMock = function() {
    console.log("fake mail() call with arguments", arguments);
};
let app = require("../app")(mailMock);

describe("routes", function() {
    it("should return 204 for valid mail request", function() {
        return testSendRoute({
            from: "valid@email.com",
            subject: "valid subject",
            message: "valid message"
        }, 204);
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
    it("should return 400 for invalid recaptcha");
});

// generic test "send X parameters to send route, see what response code comes out"
function testSendRoute(params, expectedCode) {
    return request(app)
        .post("/send")
        .send(params)
        .expect(expectedCode);
}
