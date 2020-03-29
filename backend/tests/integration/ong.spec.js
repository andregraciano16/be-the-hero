const request = require('supertest')
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {

    beforeEach(async () => {
        //Sempre executar esse comando antes de novos testes para evitar que dados gravados em 
        // em testes antigos possam influênciar nos atuais.
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@contato.com",
                whatsapp: "2222222222",
                city: "Rio do Sul",
                uf: "SC"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to list ONGs', async () => {
        const response = await request(app)
            .get('/ongs')
            .expect(200);

    })

});