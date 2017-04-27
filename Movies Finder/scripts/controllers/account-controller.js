import $ from "jquery";
import { encryptToBase64 } from "encryptor";

let accountControl = function() {
    const AUTH_TOKEN_STORAGE_KEY = "usernameKey",
        USERNAME_STORAGE_KEY = "username",
        USER_ID = "userId";

    function userLogin(loginUser) {
        let promise = new Promise(function(resolve, reject) {
            let logUser = {
                username: loginUser.username,
                password: loginUser.password
            };

            let authorization = encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");

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
                fail: function(err) {
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
                password: registerNewUser.password
            };

            let authorization = encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");

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
                fail: function(err) {
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
        currentUser
    };
}();

export { accountControl };