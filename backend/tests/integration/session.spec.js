const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to seek an ONG', async () => {
        const ong = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@contato.com",
                whatsapp: "2222222222",
                city: "Rio do Sul",
                uf: "SC"
            });
        const response = await request(app)
            .post('/sessions')
            .send({
                id: ong.body.id
            });
            console.log(ong.body);
        expect(response.body).toHaveProperty('name');
    })

})
