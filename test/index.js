let mongoose = require("mongoose");

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
//Наш основной блок
describe('Books', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        console.log("Cleared")
    });
    /*
      * Тест для /GET
      */
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});