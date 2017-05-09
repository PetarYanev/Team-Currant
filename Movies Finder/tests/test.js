import { accountData } from "account-data";
import { galleyData } from "gallery-data";
import { requester } from "requester";
import { encryptor } from "encryptor";

mocha.setup("bdd");

let expect = chai.expect;

describe("Data test", () => {
    const LOCAL_STORAGE_USERNAME_KEY = "username",
        LOCAL_STORAGE_AUTHKEY_KEY = "usernameKey";
    let requesterPostStub;
    let encryptorStub;
    const passHash = "SOME_PASS_HASH";

    const clearLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
    };

    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);

    beforeEach(() => {
        requesterPostStub = sinon.stub(requester, "post");
        encryptorStub = sinon.stub(encryptor, "encryptToSha1")
            .returns(passHash);
    });

    afterEach(() => {
        requesterPostStub.restore();
        encryptorStub.restore();
    });


    describe("Register test", () => {
        it("expect register to call to encryptor.encryptToSha1 once", (done) => {
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
                .then(() => {
                    expect(encryptorStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });


        it("expect register to make a POST request", (done) => {
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
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect username to be set in localStorage when register", (done) => {
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

            localStorage.setItem("username", user.username);
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(() => {
                    expect(localStorage.getItem("username")).to.equal(user.username);
                })
                .then(done, done);
            clearLocalStorage;
        });

        it("expect authKey to be set in localStorage when register", (done) => {
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

            localStorage.setItem("usernameKey", response.result.authKey);
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userRegister(user)
                .then(() => {
                    expect(localStorage.getItem("usernameKey")).to.equal(response.result.authKey);
                })
                .then(done, done);
            clearLocalStorage;
        });

        it("expect register function to return a Promise", () => {
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

        it("expect register function to return a Promise which resolves with registered username", (done) => {
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
                .then((value) => {
                    const expected = {
                        username: user.username
                    };
                    expect(value.result.username).to.deep.equal(expected.username);
                })
                .then(done, done);
        });


        it("expect register to make a POST request to kinvey.com/user/kid_HkCptq2Ae", (done) => {
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
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        });
    });

    describe("Login tests", () => {
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

            requesterPostStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(() => {
                    expect(encryptorStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect login to make a POST request", (done) => {
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

            accountData.userLogin(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect username to be set in localStorage when login", (done) => {
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

            localStorage.setItem("username", user.username);
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(() => {
                    expect(localStorage.getItem("username")).to.equal(user.username);
                })
                .then(done, done);
            clearLocalStorage;
        });

        it("expect authKey to be set in localStorage when login", (done) => {
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

            localStorage.setItem("usernameKey", response.result.authKey);
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(() => {
                    expect(localStorage.getItem("usernameKey")).to.equal(response.result.authKey);
                })
                .then(done, done);
            clearLocalStorage;
        });

        it("expect login function to return a Promise", () => {
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

            const promise = accountData.userLogin(user);
            expect(promise).to.be.an.instanceof(Promise);
        });

        it("expect login function to return a Promise which resolves with logged username", (done) => {
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

            accountData.userLogin(user)
                .then((value) => {
                    const expected = {
                        username: user.username
                    };
                    expect(value.result.username).to.deep.equal(expected.username);
                })
                .then(done, done);
        });

        it("expect login to make a POST request to kinvey.com/user/kid_HkCptq2Ae/login", (done) => {
            const user = {
                username: "someUser",
                password: "somePass234"
            };

            const url = "https://baas.kinvey.com/user/kid_HkCptq2Ae/login";

            const response = {
                result: {
                    username: user.username,
                    authKey: "SOME_AUTH_KEY"
                }
            };
            requesterPostStub.returns(Promise.resolve(response));

            accountData.userLogin(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        });
    });

    describe("Gallery test", () => {
        let requesterGetStub,
            response = [];

        beforeEach(() => {
            requesterGetStub = sinon.stub(requester, "get");
        });

        afterEach(() => {
            requesterGetStub.restore();
        });

        it("expect getAllMoviesByParts to make a GET request", (done) => {
            const moviesOnPage = 8,
                skip = 0,
                response = [];
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getAllMoviesByParts(moviesOnPage, skip)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getAllMoviesByParts to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&limit=${moviesOnPage}&skip=${skip}", (done) => {
            const moviesOnPage = 8,
                skip = 0;
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getAllMoviesByParts(moviesOnPage, skip)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith(`https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&limit=${moviesOnPage}&skip=${skip}`);
                })
                .then(done, done);
        });

        it("expect getAllMovies to make a GET request", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getAllMovies()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getAllMovies to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies", (done) => {

            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getAllMovies()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith("https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies");
                })
                .then(done, done);
        });

        it("expect getMoviesCount to make a GET request", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesCount()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getMoviesCount to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/_count", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesCount()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith("https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/_count");
                })
                .then(done, done);
        });

        it("expect getMoviesByGenre to make a GET request", (done) => {
            const movieGenre = "Action";
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByGenre(movieGenre)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getMoviesByGenre to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}", (done) => {
            const movieGenre = "Action";
            let filter = JSON.stringify({
                "genre": movieGenre
            });
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByGenre(movieGenre)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith(`https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`);
                })
                .then(done, done);
        });

        it("expect getMoviesByTitle to make a GET request", (done) => {
            const movieTitle = "Malkata bulka";
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByTitle(movieTitle)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getMoviesByTitle to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}", (done) => {
            const movieTitle = "Action";
            let filter = JSON.stringify({
                "name": movieTitle
            });
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByTitle(movieTitle)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith(`https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`);
                })
                .then(done, done);
        });

        it("expect getMoviesByRate to make a GET request", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByRate()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getMoviesByRate to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&sort={\"rate\": -1}&limit=12", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByRate()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith("https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&sort={\"rate\": -1}&limit=12");
                })
                .then(done, done);
        });

        it("expect getMoviesByNowPlaying to make a GET request", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByNowPlaying()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it("expect getMoviesByNowPlaying to make a GET request to https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={\"now-playing\":\"yes\"}", (done) => {
            requesterGetStub.returns(Promise.resolve(response));

            galleyData.getMoviesByNowPlaying()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith("https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={\"now-playing\":\"yes\"}");
                })
                .then(done, done);
        });
    });
});



mocha.run();