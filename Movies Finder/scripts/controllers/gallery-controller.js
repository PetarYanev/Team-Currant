import $ from "jquery";
import { encryptToBase64 } from "encryptor";

let galleyControl = function() {
    function getAllBooks() {
        let promise = new Promise(function(resolve) {

            let authorization = encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");

            $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/",
                method: "GET",
                headers: {
                    "Authorization": `Basic ${authorization}`
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

    function getBooksByGenre(movieGenre) {
        let promise = new Promise(function(resolve) {

            let authorization = encryptToBase64("kid_HkCptq2Ae:f78eee25f64842e28ddda28312edac4a");

            var filter = JSON.stringify({
                "genre": movieGenre
            });
            $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_HkCptq2Ae/movies/?query=${filter}`,
                method: "GET",
                headers: {
                    "Authorization": `Basic ${authorization}`
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
        getAllBooks,
        getBooksByGenre
    };
}();

export { galleyControl };