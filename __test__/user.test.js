const mongoose = require('mongoose');
const request = require('supertest');
const {app} = require('../index');
const User=require("../models/User")

beforeAll(async () => {
    await mongoose.connect(process.env.DB);
});
let userID;
describe('User Routes', () => {
    it("should register a new user (signup)", async () => {
        const userDets = {
            email: "testuser@gmail.com",
            password: "123456",
        }

        const res = await request(app)
            .post('/api/auth/signup')
            .send(userDets)
            .set("Content-Type", "application/json")

        expect(res.statusCode).toBe(201);
    });

})
describe('User Routes 2', () => {
    it("should login the user", async () => {
        const userCredentials = {
            email: "testuser@gmail.com",
            password: "123456",
        }

        const res = await request(app)
            .post('/api/auth/login')
            .send(userCredentials)
            .set("Content-Type", "application/json")

        expect(res.statusCode).toBe(200);
    })
})

afterAll(async () => {
    const userID=await User.findOne({email: 'testuser@gmail.com'});
    if(userID)
        await User.deleteOne({_id:userID._id})
    await mongoose.connection.close();
});