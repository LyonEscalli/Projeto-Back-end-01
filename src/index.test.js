const request = require('supertest');
const app = require('./index');

describe('Test', () => {

  it('Deve retornar alive:true na primeiraRota', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({alive:true});
  });

  it('Teste de campos faltando na rota Donation', async () => {
    const body = {
      name: "",
      email: "xxxx",
      phone: "xxx",
      zip: "xxx",
      city: "xxx", 
      state: "xxx", 
      streetAddress: "xxxx", 
      number: "", 
      complement: "", 
      neighborhood: "", 
      deviceCount: "", 
      devices: []
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.text).toMatch("Todos os campos obrigatórios devem ser informados");                                                                 
  });

  it('Teste de email inválido na rota Donations', async () => {
    const body = {
      name: "xxxx",
      email: "xxxx",
      phone: "xxx",
      zip: "xxx",
      city: "xxx", 
      state: "xxx", 
      streetAddress: "xxxx", 
      number: "xxxx", 
      complement: "xxxx", 
      neighborhood: "xxx", 
      deviceCount: 1, 
      devices: [{
        "item": "NOTEBOOK",
        "state": "WORKING"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.text).toMatch("Email informado está em formato inválido.");                                                                 
  });

  it('Teste de device não preenchido na rota Donation', async () => {
    const body = {
      name: "xxxxx",
      email: "xxxxxx@email.com",
      phone: "xxx",
      zip: "xxx",
      city: "xxx", 
      state: "xxx", 
      streetAddress: "xxxx", 
      number: "xxxxx", 
      complement: "xxxx", 
      neighborhood: "xxxxxxx", 
      deviceCount: "xxx", 
      devices: 0
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.text).toMatch("Todos os campos obrigatórios devem ser informados");                                                                 
  });

  it('Teste de erro na quantidade de equipamentos na rota Donations', async () => {
    const body = {
      name: "xxxx",
      email: "xxxxxx@email.com",
      phone: "xxx",
      zip: "xxx",
      city: "xxx", 
      state: "xxx", 
      streetAddress: "xxxx", 
      number: "xxxx", 
      complement: "xxxx", 
      neighborhood: "xxx", 
      deviceCount: 3, 
      devices: [{
        "item": "NOTEBOOK",
        "state": "WORKING"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.text).toMatch("A quantidade de equipamentos ({$deviceCount}) não está de acordo com as informações de equipamentos enviados ({$sentDevices}).");                                                                 
  });

  it('Teste de type inválido na rota Donations', async () => {
    const body = {
      name: "xxxx",
      email: "xxxxxx@email.com",
      phone: "xxx",
      zip: "xxx",
      city: "xxx", 
      state: "xxx", 
      streetAddress: "xxxx", 
      number: "xxxx", 
      complement: "xxxx", 
      neighborhood: "xxx", 
      deviceCount: 1, 
      devices: [{
        "item": "NOTEXIST",
        "state": "NOTEXIST"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.text).toMatch("O tipo informado de equipamentos ({$devices}) não é suportado; verificar documentação.");                                                                  
  });
  
  it('Teste de envio correto na rota Donations', async () => {
    const body = {
      name: "xxxx",
      email: "xxxxxx@email.com",
      phone: "xxx",
      zip: "xxx",
      city: "xxx", 
      state: "xxx", 
      streetAddress: "xxxx", 
      number: "xxxx", 
      complement: "xxxx", 
      neighborhood: "xxx", 
      deviceCount: 1, 
      devices: [{
        "item": "NOTEBOOK",
        "state": "WORKING"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(200);
    expect(response.body).toEqual({success:true});                                                                 
  });

});