import $ from "jquery";

let galleyControl = function() {
    function getAllMoviesByParts(moviesOnPage, skip) {
        let promise = new Promise(function(resolve) {

            $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&limit=${moviesOnPage}&skip=${skip}`,
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

    function getAllMovies() {
        let promise = new Promise(function(resolve) {

            $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies",
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

    function getMoviesCount() {
        let promise = new Promise(function(resolve) {

            $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/_count",
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
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&sort={\"rate\": -1}&limit=12",
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
        getAllMoviesByParts,
        getAllMovies,
        getMoviesCount,
        getMoviesByGenre,
        getMoviesByRate,
        getMoviesByNowPlaying,
        getMoviesByTitle
    };
}();

export { galleyControl };