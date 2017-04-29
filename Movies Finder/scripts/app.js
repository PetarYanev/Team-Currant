import Sammy from "sammy";
import $ from "jquery";
import { template } from "template";
import { accountControl } from "account-controller";

let router = Sammy("#content", function() {
    let $content = $("#content");

    this.get("#/home/", function(context) {
        // context.redirect("#/home/");
        console.log("here");
    });

    this.get("#/login", function(context) {
        if (accountControl.currentUser()) {
            context.redirect("#/home/");
            return;
        }

        template.get("login")
            .then(function(template) {
                $content.html(template());

                $("#btn-login").on("click", function() {
                    let loginUser = {
                        username: $("#tb-username").val(),
                        password: $("#tb-password").val()
                    };

                    accountControl.userLogin(loginUser)
                        .then(function() {
                            context.redirect("#/home/");
                        });
                });
            });
    });

    this.get("#/register", function(context) {
        if (accountControl.currentUser()) {
            context.redirect("#/login");
            return;
        }

        template.get("register")
            .then(function(template) {
                $content.html(template());

                $("#btn-register").on("click", function() {
                    let registerNewUser = {
                        username: $("#tb-regUsername").val(),
                        password: $("#tb-regPassword").val()
                    };

                    accountControl.userRegister(registerNewUser)
                        .then(function() {
                            if (registerNewUser.username.trim() === "" || registerNewUser.password.trim() === "") {
                                // toastr.error("Invalid username or password");
                            } else {
                                context.redirect("#/login");
                            }
                        });
                });
            });
    });

    this.get("#/logout", function(context) {
        accountControl.userLogout();
        context.redirect("#/home/");
    });

    this.get("")
});

router.run("#/home/");

export { router };