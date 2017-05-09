import { accountData } from "account-data";
import { requester } from "requester";
import { encryptor } from "encryptor";

mocha.setup('bdd');

let expect = chai.expect;

describe('Data test', ()=>{
    const LOCAL_STORAGE_USERNAME_KEY = 'username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'usernameKey';

    const clearLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
    };

    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);


    describe("Register test", () => {
        let requesterPostStub;
        let encryptorStub;
        const passHash = 'SOME_PASS_HASH';

        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, "post");
            encryptorStub = sinon.stub(encryptor, 'encryptToSha1')
                .returns(passHash);
        });

        afterEach(() => {
            requesterPostStub.restore();
            encryptorStub.restore();
        });

        it('expect register to make a POST request', (done)=>{
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
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(()=>{
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect username to be set in localStorage', (done)=>{
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

            localStorage.setItem('username', user.username);
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(()=>{
                    expect(localStorage.getItem('username')).to.equal(user.username);
                })
                .then(done, done);
            clearLocalStorage;
        });

        it('expect authKey to be set in localStorage', (done)=>{
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

            localStorage.setItem('usernameKey', response.result.authKey);
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(()=>{
                    expect(localStorage.getItem('usernameKey')).to.equal(response.result.authKey);
                })
                .then(done, done);
            clearLocalStorage;
        });

        it('expect register function to return a Promise', () => {
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

        requesterPostStub.returns(Promise.resolve(response));

        const promise = accountData.userRegister(user);
        expect(promise).to.be.an.instanceof(Promise);
      });

            it('expect register function to return a Promise which resolves with registered username', (done)=>{
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
                requesterPostStub.returns(Promise.resolve(response));

                accountData.userRegister(user)
                    .then((value)=>{
                        const expected = {
                            username: user.username
                        };
                        expect(value.result.username).to.deep.equal(expected.username);
                    })
                    .then(done, done);
            });

        
        it('expect register to make a POST request to kinvey.com/user/kid_HkCptq2Ae', (done)=>{
            const user = {
                username: "someUser",
                password: "somePass234"
            };

            const url = "https://baas.kinvey.com/user/kid_HkCptq2Ae";

            const response = {
                result: {
                    username: user.username,
                    authKey: "SOME_AUTH_KEY"
                }
            };
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(()=>{
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        });

        // it('expect register to make a POST request with user data (username)', (done)=>{
        //     const user = {
        //         username: "someUser",
        //         password: "somePass234"
        //     };

        //     const response = {
        //         result: {
        //             username: user.username,
        //             authKey: "SOME_AUTH_KEY"
        //         }
        //     };


        //      const expected = {
        //                     username: user.username,
        //                     password: encryptorStub(user.password)
        //             };

        //     requesterPostStub.returns(Promise.resolve(response));


        //      accountData.userRegister(user)
        //         .then(()=>{
        //             expect(requesterPostStub).to.have.been.calledWith(expected);

        //         })
        //         .then(done, done);
        // });
   

 });

    describe('Login tests', ()=>{
        let requesterPutStub;
        let encryptorStub;
        const passHash = 'SOME_PASS_HASH';

        beforeEach(() => {
            requesterPutStub = sinon.stub(requester, "post");
            encryptorStub = sinon.stub(encryptor, 'encryptToSha1')
                .returns(passHash);
        });

        afterEach(() => {
            requesterPutStub.restore();
            encryptorStub.restore();
        });

        it("expect login to call to encryptor.encryptToSha1 once", (done)=>{
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

            requesterPutStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(() => {
                    expect(encryptorStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect login to make a PUT request', (done)=>{
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
            requesterPutStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(()=>{
                    expect(requesterPutStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

    });

});



mocha.run();