const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/userModel");
const Feedback = require("../models/feedbackModel");
const { default: isTaxID } = require("validator/lib/isTaxID");

const testFeedbacks = [
    {
    sender: "john",
    message: "testMessage",
    rating: 5,
},
{
    sender: "alice",
    message: "testMessage2",
    rating: 4,
}
];

const testUser = {
    email: "john@smith.com",
    password: "jlRS567@##",
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "123456789",
    role: "user",
};

beforeAll(async () => {
    await User.deleteMany({});
    await Feedback.deleteMany({});
    const user = await api.post("/api/user/signup").send(testUser);
    token = user.body.token;
    emailu = user.body.email;
});

describe("test feedback api routes", () => {
    describe("After a user is signed up", () => {
        beforeEach(async () => {
            const email = testUser.email;
            url = "/api/feedback/" + email;
            await Feedback.deleteMany({});
            await api.post(url).set("Authorization", `Bearer ${token}`).send(testFeedbacks[0]);
        });
    
        // GET all feedback
        it("should return all feedback as JSON", async () => {
            await api.get("/api/feedback").set("Authorization", `Bearer ${token}`).expect(200).expect("Content-Type", /application\/json/);
        });

        // POST a new feedback
        it("should create a new feedback", async () => {
            const emailu = testUser.email;
            url = "/api/feedback/" + emailu;
            console.log("url:", url)
            const newFeedback = {
                sender: "alice",
                message: "testMessage",
                rating: 5,
                email: emailu
            };
            await api.post(url).set("Authorization", `Bearer ${token}`).send(newFeedback).expect(201).expect("Content-Type", /application\/json/);
        });

        
        // GET feedback by ID
        it("should return one feedback by its id", async () => {
            const feedback = await Feedback.findOne();
            const id = feedback._id;
            await api.get(`/api/feedback/${id}`).set("Authorization", `Bearer ${token}`).expect(200).expect("Content-Type", /application\/json/);
        });
        

        // DELETE a feedback
        it("should delete a feedback by its id", async () => {
            const feedback = await Feedback.findOne();
            const id = feedback._id;
            await api.delete(`/api/feedback/${id}`).set("Authorization", `Bearer ${token}`).expect(200);
        });

        // UPDATE a feedback
        it("should update a feedback by its id", async () => {
            const feedback = await Feedback.findOne();
            const id = feedback._id;
            const updatedFeedback = {
                message: "updatedMessage",
                rating: 4,
            };
            await api.put(`/api/feedback/${id}`).set("Authorization", `Bearer ${token}`).send(updatedFeedback).expect(200).expect("Content-Type", /application\/json/);
        });
    });
});