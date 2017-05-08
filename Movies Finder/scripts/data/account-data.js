import { encryptor } from "encryptor";
import { requester } from "requester";

class AccountData {

    userLogin(loginUser) {
        let authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a"),
            url = "https://baas.kinvey.com/user/kid_HkCptq2Ae/login",
            headers = {
                "Authorization": `Basic ${authorization}`
            },
            logUser = {
                username: loginUser.username,
                password: encryptor.encryptToSha1(loginUser.password)
            };

        return requester.post(url, headers, logUser);
    }

    userRegister(registerNewUser) {
        let authorization = encryptor.encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a"),
            url = "https://baas.kinvey.com/user/kid_HkCptq2Ae",
            headers = {
                "Authorization": `Basic ${authorization}`
            },
            user = {
                username: registerNewUser.username,
                password: encryptor.encryptToSha1(registerNewUser.password)
            };

        return requester.post(url, headers, user);
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

let accountData = new AccountData();
export { accountData };