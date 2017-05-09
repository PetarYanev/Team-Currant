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
        let requesterStub;
        let encryptorStub;
        const passHash = 'SOME_PASS_HASH';

        beforeEach(() => {
            requesterStub = sinon.stub(requester, "post");
            encryptorStub = sinon.stub(encryptor, 'encryptToSha1')
                .returns(passHash);
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
            requesterStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(()=>{
                    expect(requesterStub).to.have.been.calledOnce;
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
            requesterStub.returns(Promise.resolve(response));

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
            requesterStub.returns(Promise.resolve(response));

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

        requesterStub.returns(Promise.resolve(response));

        const promise = accountData.userRegister(user);
        expect(promise).to.be.an.instanceof(Promise);
      });

        // it('expect register function to return a Promise which resolves with registered username', (done)=>{
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
        //     requesterStub.returns(Promise.resolve(response));

        //     accountData.userRegister(user)
        //         .then((value)=>{
        //             const expected = {
        //                 username: user.username
        //             };
        //             expect(value).to.deep.equal(expected);
        //         })
        //         .then(done, done);
        // });

        // it('expect register to make a POST request to (url, headers, user)', (done)=>{
        //     const user = {
        //         username: "someUser",
        //         password: "somePass234"
        //     };
        //     const authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");
        //     const url = "https://baas.kinvey.com/user/kid_HkCptq2Ae";
        //     const headers = {
        //             "Authorization": `Basic ${authorization}`
        //         }

        //     const response = {
        //         result: {
        //             username: user.username,
        //             authKey: "SOME_AUTH_KEY"
        //         }
        //     };
        //     requesterStub.returns(Promise.resolve(response));

        //     accountData.userRegister(user)
        //         .then(()=>{
        //             expect(requesterStub).to.have.been.calledWith(url, headers, user);
        //         })
        //         .then(done, done);
        // });

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
        //     requesterStub.returns(Promise.resolve(response));

        //     accountData.userRegister(user)
        //         .then(()=>{
        //             const expected = {
        //                 data : {
        //                     username: user.username
        //                     }
        //             };
        //             expect(requesterStub.args[0][1].data.username).to.equal(user.username);
        //         })
        //         .then(done, done);
        // });
   

 });
    describe('Login tests', ()=>{
        let requesterStub;
        let encryptorStub;
        const passHash = 'SOME_PASS_HASH';

        beforeEach(() => {
            requesterStub = sinon.stub(requester, "post");
            encryptorStub = sinon.stub(encryptor, 'encryptToSha1')
                .returns(passHash);
        });

        afterEach(() => {
            requesterStub.restore();
            encryptorStub.restore();
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
            requesterStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(()=>{
                    expect(requesterStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });
        
        it('expect login to make a PUT request to ', ()=>{
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
                .then(()=>{
                    expect(requesterStub).to.have.been.calledOnce;
                });
        });

    });

});



mocha.run();