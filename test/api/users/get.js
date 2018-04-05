const chai = require("chai"),
    expect = chai.expect,
    server = require("@server/bin/www"),
    Utils = require("@test/utils"),
    UserDB = require("@DB").UserDriver.model,
    serverConfig = require("@config");

const USER_COUNT = serverConfig.queries.PAGINATION_LIMIT+10;

describe("/users", () => {
    before((done) => {
        //fill DB with random users
        let promises = [];
        for (let i = 0; i < USER_COUNT; i++) {
            promises.push(Utils.registerUser());
        }
        Promise.all(promises)
            .then(() => done())
            .catch(err => done(err));
    });
    after((done) => {
        //clear DB
        UserDB.remove({}, err => done(err));
    });

    describe("send empty query", () => {
        it("should return valid matadata",(done)=>{
            chai.request(server)
                .get(Utils.URL.users.GET)
                .end((err, res) => {
                    expect(res).have.status(200);
                    // console.log(res.body);
                    expect(res.body).to.have.property("items").that.be.a("array");
                    expect(res.body.items).to.have.lengthOf.most(serverConfig.queries.PAGINATION_LIMIT);
                    expect(res.body).to.have.property("total").that.be.equal(USER_COUNT);
                    expect(res.body).to.have.property("page").that.be.equal(1);
                    expect(res.body).to.have.property("limit").that.be.equal(serverConfig.queries.PAGINATION_LIMIT);
                    let pagesCount = Math.ceil(res.body.total / res.body.limit);
                    expect(res.body).to.have.property("pages").that.be.equal(pagesCount);
                    done();
                });
        });
    });
});