import $ from "jquery";

class Requester {

    get(url, headers) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url,
                method: "GET",
                headers,
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    post(url, headers, data) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url,
                method: "POST",
                headers,
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(err);
                },
            });
        });

        return promise;
    }

    put(url, headers, data) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url,
                method: "PUT",
                headers,
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(err);
                },
            });
        });

        return promise;
    }
}

let requester = new Requester();
export { requester };