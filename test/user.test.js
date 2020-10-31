const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Users = require('../models/users');

const app = require('../app');
const { after } = require('mocha');
const expect = chai.expect;

chai.use(chaiAsPromised);
var user;

describe('functional - user', () => {

  before(function (done) {
    mongoose.connect('mongodb://localhost/test', done);
  });
  after(function(done){
    mongoose.connection.close(done);
  });

  afterEach(()=>{
    sinon.restore();
  })


  it('should fail to create a user without a firstName', async () => {
    const res = await request(app).post('/users').send({
      lastName: 'Smith',
      age: '16',
      profession: 'gamer',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"firstName" is required');
  });

  it('should create a user', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Smith',
      age: 16,
      profession: 'gamer',
    };

    sinon.stub(Users.prototype,'save').resolves(user);
    const res = await request(app).post('/users').send(user);
    expect(res.status).to.equal(201);
    expect(res.body.firstName).to.equal(user.firstName);
    expect(res.body.lastName).to.equal(user.lastName);
    expect(res.body.age).to.equal(user.age);
    expect(res.body.profession).to.equal(user.profession);
  });
});