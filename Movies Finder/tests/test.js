import { accountData } from "account-data";
import { requester } from "requester";
import { encryptor } from "encryptor";

mocha.setup('bdd');

let expect = chai.expect;

describe("Login tests", () => {
    let requesterStub;
    let encryptorStub;

    beforeEach(() => {
        requesterStub = sinon.stub(requester, "post");
        encryptorStub = sinon.stub(encryptor, 'encryptToSha1')
            .returns('SOME_PASS_HASH');
    });

    afterEach(() => {
        requesterStub.restore();
        encryptorStub.restore();
    });

    it("expect login to call to encryptor.encryptToSha1 once", (done) => {
        const user = {
            username: "someUser",
            password: "somePass234"
        };

        const response = {
            result: {
                username: user.username,
                authKey: "SOME_AUTH_KEY"
            }
        };

        requesterStub.returns(Promise.resolve(response));

        accountData.userLogin(user)
            .then(() => {
                expect(encryptorStub).to.have.been.calledOnce;
            })
            .then(done, done);
    });
});



mocha.run();