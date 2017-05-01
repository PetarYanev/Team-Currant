import $ from "jquery";
import { encryptToBase64 } from "encryptor";

let galleyControl = function() {
    function getAllMovies() {
        let promise = new Promise(function(resolve) {

            $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&sort={\"name\": 1}",
                method: "GET",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                data: JSON.stringify(),
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    function getMoviesByGenre(movieGenre) {
        let promise = new Promise(function(resolve) {

            var filter = JSON.stringify({
                "genre": movieGenre
            });

            $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`,
                method: "GET",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                data: JSON.stringify(),
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    function getMoviesByTitle(movieTitle) {
        let promise = new Promise(function(resolve) {

            var filter = JSON.stringify({
                "name": movieTitle
            });

            $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`,
                method: "GET",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                data: JSON.stringify(),
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    function getMoviesByRate() {
        let promise = new Promise(function(resolve) {

            $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&sort={\"rate\": 1}",
                method: "GET",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                data: JSON.stringify(),
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    function getMoviesByNowPlaying() {
        let promise = new Promise(function(resolve) {

            $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={\"now-playing\":\"yes\"}",
                method: "GET",
                headers: {
                    "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
                },
                data: JSON.stringify(),
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    return {
        getAllMovies,
        getMoviesByGenre,
        getMoviesByRate,
        getMoviesByNowPlaying,
        getMoviesByTitle
    };
}();

export { galleyControl };