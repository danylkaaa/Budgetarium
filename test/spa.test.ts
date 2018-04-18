import request from "supertest";
import app from "../src/server/server";

const chai = require("chai");
const expect = chai.expect;

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/").expect(200);
    });
    it("should return 404 NOT FOUND", () => {
        return request(app).get("/ABC").expect(404);
    });
});
