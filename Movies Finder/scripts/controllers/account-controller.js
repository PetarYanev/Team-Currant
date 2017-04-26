import $ from "jquery";

var userRegister = function(registerNewUser) {
    var promise = new Promise(function(resolve, reject) {
        var user = {
            username: registerNewUser.username,
            password: registerNewUser.password
        };

        $.ajax({
            url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/test1/",
            method: "POST",
            headers: {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
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
};

export { userRegister };