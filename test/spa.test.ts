import request from "supertest";
import App from "../src/server/App";

const app: Express.Application = App.getInstance().getApp();
const chai = require("chai");
const expect = chai.expect;

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/").expect(200);
    });
});
