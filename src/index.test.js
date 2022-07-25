const request = require('supertest');
const app = require('./index');

describe('Test', () => {
  it('Deve retornar alive:true', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({alive:true});
  });
});