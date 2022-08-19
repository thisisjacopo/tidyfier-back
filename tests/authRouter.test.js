import request from "supertest";
import authRouter from "../routes/authRouter";
// const authRouter = require("../routes/authRouter");

describe("POST /signup", () => {
  describe("given a username, email and password", () => {
    // * should save username and email and password to the db
    // * should store the user id in a session and or cookie
    // * should hash password
    test("should respond with a status code 201", async () => {
      const response = await request(authRouter).post("/signup").send({
        username: "test",
        password: "test@test.com",
        email: "test",
      });
      expect(response.statusCode).toBe(201);
    });
    // * should specify json in the content type header
  });

  describe("if username, email or password are missing", () => {
    // * should respond with a 400 error code
  });
});
