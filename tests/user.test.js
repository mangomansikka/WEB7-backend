const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");


beforeAll(async () => {
  await User.deleteMany({});
});

describe("test use api routes", () => {
    describe("POST /api/user/signup", () => {
        it("should signup a new user with a valid credentials", async () => {
            const testUser = {
                username: "john_smith",
                email: "john@smith.com",
                password: "jlRS567@##",
                password2: "jlRS567@##",
            };
            const response = await api.post("/api/user/signup").send(testUser);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
        });
    });
    
    it("should return an error with invalid credentials", async () => {
        const userData = {
            username: "johnny",
            email: "testi@email.com",
            password: "wrongpassword#gh",
            password2: "wrongpassword#gh",
        };
        const response = await api.post("/api/user/signup").send(userData);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        });

    describe("POST /api/users/login", () => {
        it("should login a new user with valid credentials", async () => {
        const userData = {
            email: "john@smith.com",
            password: "jlRS567@##",
        };

        const response = await api.post("/api/user/login").send(userData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        });

        it("should return an error with invalid credentials", async () => {
        const userData = {
            email: "john@smith.com",
            password: "wrongpassword#gh",
        };

        const response = await api.post("/api/user/login").send(userData);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        });
    });
});

afterAll(() => {
    mongoose.connection.close();
  });