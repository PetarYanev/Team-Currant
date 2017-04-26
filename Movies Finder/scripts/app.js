import Sammy from "sammy";
import $ from "jquery";
import { template } from "template";
import { userRegister } from "account-controller";

let accountRouter = Sammy("#content", function() {
    let $content = $("#content");

    this.get("#/home/", function(context) {
        // context.redirect("#/home/");
        console.log("here");
    });

    this.get("#/login", function() {
        template.get("login")
            .then(function(template) {
                $content.html(template());

                let logInUser = {
                    username: $("#tb-username").val(),
                    password: $("#tb-password").val()
                };
            });
    });

    this.get("#/register", function(context) {
        template.get("register")
            .then(function(template) {
                $content.html(template());

                $("#btn-register").on("click", function() {
                    let registerNewUser = {
                        username: $("#tb-regUsername").val(),
                        password: $("#tb-regPassword").val()
                    };
                    userRegister(registerNewUser)
                        .then(function() {
                            context.redirect("#/home/");
                        });
                });
            });
    });
});

accountRouter.run("#/home/");

export { accountRouter };


// import { accountRouter } from "./controllers/account-controller.js";

// function getAllBooks() {
//     return new Promise(function(resolve) {

//         $.ajax({
//             url: "https://baas.kinvey.com/appdata/kid_HkCptq2Ae/test1/",
//             method: "GET",
//             headers: {
//                 "Authorization": "Basic a2lkX0hrQ3B0cTJBZTo3OWY0ZmIwODE4MmU0NmMxOTBlNTkzNWYzNzEyZDQ3Mw=="
//             },
//             data: JSON.stringify(),
//             contentType: "application/json",
//             success: function(response) {
//                 resolve(response);
//             }
//         });

//     });
// }

// getAllBooks();