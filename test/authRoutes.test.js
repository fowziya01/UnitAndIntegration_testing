const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Routes', () => {
    test('Register a new user', async () => {
        const res = await request(app).post('/auth/register').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    test('Login with valid credentials', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'test@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('Login with invalid credentials', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'invalid@example.com',
            password: 'wrongpassword'
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
});

