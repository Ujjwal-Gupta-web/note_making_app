const request = require('supertest');
const mongoose = require('mongoose');
const {app} = require('../index');
const User = require('../models/User');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const axios=require('axios');

beforeAll(async () => {
    await mongoose.connect(process.env.DB);
});

afterAll(async () => {
    await Note.deleteMany({ isTestData: true });
    await mongoose.connection.close();
});

let authToken,randomUser,sampleNote;

describe('Note Routes', () => {

    beforeAll(async () => {
        const res = await request(app).get('/api/auth/getRandomUser');
        authToken = res.body.token;
        randomUser = res.body.user;

        sampleNote = new Note({
            title: 'my test note in jest',
            desc: 'this is my description',
            author:randomUser._id,
            allowedAccess:[randomUser._id],
            isTestData: true
        });
        await sampleNote.save();
    })

    it('should create a new note', async () => {
        const newNote = {
            title: 'mY New Note',
            desc: 'This is test',
            isTestData: true
        };

        const res = await request(app)
            .post('/api/notes/')
            .set('Authorization', `${authToken}`)
            .send(newNote);
        console.log("RESPONSE : ",res.body);
        expect(res.statusCode).toBe(201);
        // expect(res.body.message).toBe('Note created successfully');
    });

    it('should get all notes', async() => {
        const res = await request(app)
            .get('/api/notes/')
            .set('Authorization', `${authToken}`);
        
        expect(res.statusCode).toBe(200);
        // expect(res.body.data.length).toBeGreaterThanOrEqual(0);
    })



    it('should search notes', async () => {
        const query = 'Note';

        const res = await request(app)
            .get(`/api/search?q=${query}`)
            .set('Authorization', `${authToken}`);

        expect(res.statusCode).toBe(200);
    });

    it('should get a specific note by ID', async () => {
        const res = await request(app)
            .get(`/api/notes/${sampleNote._id}`)
            .set('Authorization', `${authToken}`);

        expect(res.statusCode).toBe(200);
    });

    it('should update a specific note by ID', async () => {
        const updatedNote = {
            title: 'Updated Sample Note',
            content: 'Updated content for the sample note.',
        };

        const res = await request(app)
            .put(`/api/notes/${sampleNote._id}`)
            .set('Authorization', `${authToken}`)
            .send(updatedNote);

        expect(res.statusCode).toBe(200);
        // expect(res.body.message).toBe('Note updated successfully');
    });

    it('should share a specific note by ID', async () => {
        const randomUserRes = await request(app).get('/api/auth/getRandomUser');
        const shareWithUserEmail=randomUserRes.body.user.email;
        const res = await request(app)
            .post(`/api/notes/${sampleNote._id}/share`)
            .set('Authorization', `${authToken}`)
            .send({ email: shareWithUserEmail});

        expect(res.statusCode).toBe(200);
        // expect(res.body.message).toBe('Note shared successfully');
    });


    it('should delete a specific note by ID', async () => {
        const res = await request(app)
            .delete(`/api/notes/${sampleNote._id}`)
            .set('Authorization', `${authToken}`);

        expect(res.statusCode).toBe(200);
        // expect(res.body.message).toBe('Note deleted successfully');
    });

})