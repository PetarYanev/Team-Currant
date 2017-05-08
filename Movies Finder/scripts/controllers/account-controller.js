import $ from "jquery";
import { encryptor } from "encryptor";
import { requester } from "requester";

class AccountControl {

    userLogin(loginUser, context) {
        let authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a"),
            url = "https://baas.kinvey.com/user/kid_HkCptq2Ae/login",
            headers = {
                "Authorization": `Basic ${authorization}`
            },
            logUser = {
                username: loginUser.username,
                password: encryptor.encryptToSha1(loginUser.password)
            };

        requester.post(url, headers, logUser)
            .then(function(user) {
                $("#nav-btn-logout").removeClass("hidden");
                $("#nav-btn-login").addClass("hidden");
                $("#nav-btn-register").addClass("hidden");
                $("#my-watchlist").removeClass("hidden");

                localStorage.setItem("usernameKey", user._kmd.authtoken);
                localStorage.setItem("username", user.username);
                localStorage.setItem("userId", user._id);

                context.redirect("#/home/");
            }, function() {
                $("#passwordsNoMatchRegister").fadeIn();
            });
    }

    userRegister(registerNewUser, context) {
        let authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a"),
            url = "https://baas.kinvey.com/user/kid_HkCptq2Ae",
            headers = {
                "Authorization": `Basic ${authorization}`
            },
            user = {
                username: registerNewUser.username,
                password: encryptor.encryptToSha1(registerNewUser.password)
            };

        requester.post(url, headers, user)
            .then(function() {
                context.redirect("#/login");
            }, function() {
                $("#existingUser").fadeIn();
            });
    }

    userLogout(context) {

        $("#nav-btn-logout").addClass("hidden");
        $("#nav-btn-login").removeClass("hidden");
        $("#nav-btn-register").removeClass("hidden");
        $("#my-watchlist").addClass("hidden");

        localStorage.removeItem("usernameKey");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        context.redirect("#/home/");
    }

    addMovieToUserWatchlist(movie) {
        let userId = localStorage.getItem("userId"),
            addedMovie = { watchlist: movie },
            url = `https://baas.kinvey.com/user/kid_HkCptq2Ae/${userId}`,
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        requester.put(url, headers, addedMovie);
    }

    getMoviesFromUsersWatchlist() {
        let userId = localStorage.getItem("userId"),
            url = `https://baas.kinvey.com/user/kid_HkCptq2Ae/${userId}`,
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    currentUser() {
        let username = localStorage.getItem("usernameKey");
        let userToken = localStorage.getItem("username");
        let userId = localStorage.getItem("userId");

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
}

let accountControl = new AccountControl();
export { accountControl };