const Todo = require('../models/Todo');
let token = '';

beforeAll(async () => {
    await Todo.deleteMany();

    const res = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123'
    });
    token = res.body.token;
});

describe('Todo Routes', () => {
    test('Create a new Todo', async () => {
        const res = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Todo', description: 'Todo description' });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Todo');
    });

    test('Get all Todos', async () => {
        const res = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Update a Todo', async () => {
        const todo = await Todo.create({ title: 'Old Title', description: 'Old Desc', user: 'testUserId' });
        const res = await request(app)
            .put(`/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Title');
    });

    test('Delete a Todo', async () => {
        const todo = await Todo.create({ title: 'To Delete', description: 'Delete Desc', user: 'testUserId' });
        const res = await request(app)
            .delete(`/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Todo deleted successfully');
    });
});
