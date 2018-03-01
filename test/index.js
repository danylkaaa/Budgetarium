let mongoose = require("mongoose");

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server/bin/www');
let should = chai.should();
chai.use(chaiHttp);


describe('Books', () => {
    // beforeEach((done) => { //Перед каждым тестом чистим базу
    //     done();
    // });
    /*
      * Тест для /GET
      */
    describe('/GET api v1 ', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    done();
                });
        });
    });
});