import { requester } from "requester";

class GalleyControl {
    getAllMoviesByParts(moviesOnPage, skip) {
        let url = `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&limit=${moviesOnPage}&skip=${skip}`,
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    getAllMovies() {
        let url = "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies",
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    getMoviesCount() {
        let url = "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/_count",
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    getMoviesByGenre(movieGenre) {
        let filter = JSON.stringify({
                "genre": movieGenre
            }),
            url = `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`,
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    getMoviesByTitle(movieTitle) {
        let filter = JSON.stringify({
                "name": movieTitle
            }),
            url = `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`,
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    getMoviesByRate() {
        let url = "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={}&sort={\"rate\": -1}&limit=12",
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }

    getMoviesByNowPlaying() {
        let url = "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query={\"now-playing\":\"yes\"}",
            headers = {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            };

        return requester.get(url, headers);
    }
}

let galleyControl = new GalleyControl();
export { galleyControl };