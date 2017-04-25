//var el = $("#aaa");
var el = document.getElementById("aaa");

function getAllBooks() {
    return new Promise(function(resolve, reject) {

        $.ajax({
            url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/test1/",
            method: "GET",
            headers: {
                "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
            },
            data: JSON.stringify(),
            contentType: 'application/json',
            success: function(response) {
                resolve(response);
            }
        });

    });
}

getAllBooks();