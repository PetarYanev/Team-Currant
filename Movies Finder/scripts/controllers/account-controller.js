import $ from "jquery";
import { encryptor } from "encryptor";

let accountControl = function() {
    const AUTH_TOKEN_STORAGE_KEY = "usernameKey",
        USERNAME_STORAGE_KEY = "username",
        USER_ID = "userId";

    function userLogin(loginUser) {
        let promise = new Promise(function(resolve, reject) {
            let logUser = {
                username: loginUser.username,
                password: encryptor.encryptToSha1(loginUser.password)
            };

            let authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");

            $.ajax({
                url: "https://baas.kinvey.com/user/kid_HkCptq2Ae/login",
                method: "POST",
                headers: {
                    "Authorization": `Basic ${authorization}`
                },
                data: JSON.stringify(logUser),
                contentType: "application/json",
                success: function(user) {
                    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, user._kmd.authtoken);
                    localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
                    localStorage.setItem(USER_ID, user._id);

                    resolve(user);
                },
                error: function(err) {
                    $("#passwordsNoMatchRegister").fadeIn();
                    reject(err);
                }
            });
        });

        return promise;
    }

    function userRegister(registerNewUser) {
        let promise = new Promise(function(resolve, reject) {
            let user = {
                username: registerNewUser.username,
                password: encryptor.encryptToSha1(registerNewUser.password)
            };

            let authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");

            $.ajax({
                url: "https://baas.kinvey.com/user/kid_HkCptq2Ae/",
                method: "POST",
                headers: {
                    "Authorization": `Basic ${authorization}`
                },
                data: JSON.stringify(user),
                contentType: "application/json",
                success: function(user) {
                    resolve(user);
                },
                error: function(err) {
                    $("#existingUser").fadeIn();
                    reject(err);
                }
            });
        });

        return promise;
    }

    function userLogout() {
        let promise = new Promise(function(resolve) {
            localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
            localStorage.removeItem(USERNAME_STORAGE_KEY);
            localStorage.removeItem(USER_ID);

            resolve();
        });

        return promise;
    }

    function addMovieToUserWatchlist(movie) {
        let promise = new Promise(function(resolve) {
            let userId = localStorage.getItem(USER_ID);
            let addedMovie = {
                watchlist: movie
            };

            $.ajax({
                url: `https://baas.kinvey.com/user/kid_HkCptq2Ae/${userId}`,
                method: "PUT",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                data: JSON.stringify(addedMovie),
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    function getMoviesFromUsersWatchlist() {
        let promise = new Promise(function(resolve) {
            let userId = localStorage.getItem(USER_ID);

            $.ajax({
                url: `https://baas.kinvey.com/user/kid_HkCptq2Ae/${userId}`,
                method: "GET",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    function currentUser() {
        let username = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
        let userToken = localStorage.getItem(USERNAME_STORAGE_KEY);
        let userId = localStorage.getItem(USER_ID);

        if (!username) {
            return null;
        } else {
            return {
                username,
                userToken,
                userId
            };
        }
    }

    return {
        userLogin,
        userRegister,
        userLogout,
        currentUser,
        addMovieToUserWatchlist,
        getMoviesFromUsersWatchlist
    };
}();

export { accountControl };