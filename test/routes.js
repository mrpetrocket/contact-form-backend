let chai = require("chai");
let expect = chai.expect;
let httpMocks = require('node-mocks-http');
let request = require('supertest');

let mailMock = function() {
    console.log("fake mail() call with arguments", arguments);
};
let routes = require("../routes")(mailMock);
let res = httpMocks.createResponse({
    eventEmitter: require("events").EventEmitter
});

// basically recreate express app so we can test the routes
let express = require("express");
let expressValidator = require("express-validator");
let app = express();

app.use(expressValidator());
app.post('/send', routes.send);

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
    console.log(params);
    return request(app)
        .post("/send")
        .send(params)
        .expect(expectedCode);
}

function createMailRequestMock(params) {
    return httpMocks.createRequest({
        method: "POST",
        url: "/send",
        params: params
    });
}
