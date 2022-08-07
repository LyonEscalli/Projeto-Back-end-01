const request = require('supertest');
const app = require('./index');
import { erros } from "./types/erros"

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
    expect(response.body).toStrictEqual(erros.MISSING_PARAMETERS); 
    console.log(response)                                                              
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
        "type": "NOTEBOOK",
        "condition": "WORKING"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(erros.INVALID_EMAIL);                                                                 
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
    expect(response.body).toStrictEqual(erros.MISSING_PARAMETERS);                                                                
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
        "type": "NOTEBOOK",
        "condition": "WORKING"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(erros.WRONG_AMOUNT);                                                             
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
        "type": "NOTEXIST",
        "condition": "NOTEXIST"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual(erros.WRONG_TYPES);                                                                 
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
        "type": "NOTEBOOK",
        "condition": "WORKING"
      }]
    }

    const response = await request(app).post('/donation')
    .send(body)
		expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({success:true});                                                                 
  });

});