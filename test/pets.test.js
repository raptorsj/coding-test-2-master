const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Pets = require('../models/pets');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - user', () => {
let mongooseConn;

  before( (done) =>  {
    mongoose.connect('mongodb://localhost/test', done);
  });
  after((done) => {
    mongoose.connection.close(done);
  });
  afterEach(()=>{
    sinon.restore();
  })

  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: '16',
      colour: 'gamer',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet', async () => {
    const pet = {
      name:'scooby',
      age:5,
      colour:'white'
    };
    sinon.stub(Pets.prototype,'save').resolves(pet);
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.colour).to.equal(pet.colour);
    expect(res.body.age).to.equal(pet.age);
  });

  it('should get a pets list', async () => {
    const pet = {
      name:'scooby',
      age:5,
      colour:'white'
    };
    
    sinon.stub(Pets,'find').resolves(pet);
    const res = await request(app).get('/pets');
   
    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.colour).to.equal(pet.colour);
    expect(res.body.age).to.equal(pet.age);
  });
  it('should delete a pet', async () => {
    const pet = {
      name:'scooby',
     };
    
    sinon.stub(Pets,'deleteOne').resolves(pet);
    const res = await request(app).delete('/pets').send(pet);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('deleted successfully');
  });

  it('delete a pet should fail when schema validation is failed ', async () => {
    const pet = {
      name:'scooby',
     };
    
    sinon.stub(Pets,'deleteOne').resolves(pet);
    const res = await request(app).delete('/pets');
   console.log(res.body);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });
});