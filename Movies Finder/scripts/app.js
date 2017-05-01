import Sammy from "sammy";
import $ from "jquery";
import { template } from "template";
import { accountControl } from "account-controller";
import { galleyControl } from "gallery-controller";

let router = Sammy("#content", function() {
    let $content = $("#content");

    this.get("#/home/", function() {
        galleyControl.getAllMovies()
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });

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

    this.get("#/sorted-by/?:genre", function() {
        let genre = this.params["genre"];

        galleyControl.getMoviesByGenre(genre)
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
    });

    this.get("#/top-rated", function() {
        galleyControl.getMoviesByRate()
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
    });

    this.get("#/now-playing", function() {
        galleyControl.getMoviesByNowPlaying()
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
    });

    this.get("#/movies-info/?:name", function() {
        let title = this.params["name"];

        galleyControl.getMoviesByTitle(title)
            .then(function(movie) {
                template.get("movies-info")
                    .then(function(template) {
                        $content.html(template(movie));
                    });
            });
    });

    this.get("#/contact/", function(context) {
        template.get("contacts")
            .then(function(template) {
                $content.html(template());
            });
    });
});

router.run("#/home/");

export { router };