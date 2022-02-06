//let Jest able to understand the ES6 syntax by npm i regenerator-runtime -D & import the below
import "regenerator-runtime/runtime";

const request = require("supertest");
const app = require("../src/server/app.js");

describe("Test the root path", () => {
    test("It should response the GET method", () => {
        return request(app)
            .get("/")
            .expect(200);
    });
});