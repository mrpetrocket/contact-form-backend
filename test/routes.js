var mailMock = {
    send: function() {
        console.log("fake mail() call with arguments", arguments);
    }
};
var routes = require("../routes")(mailMock);
describe("routes", function() {
    it("should return 204 for valid mail request");
    it("should return 400 for missing 'from' address");
    it("should return 400 for invalid 'from' address");
    it("should return 400 for missing param 'subject'");
    it("should return 400 for missing param 'message'");
    it("should return 400 for invalid recaptcha");
});
