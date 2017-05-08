import $ from "jquery";
import { template } from "template";
import { accountData } from "account-data";
import { galleyData } from "gallery-data";
import { validator } from "validator";

class AccountController {
    constructor(accountData, galleyData, template) {
        this.accountData = accountData;
        this.template = template;
        this.galleyData = galleyData;
    }

    loginUser(context, content) {
        let _this = this,
            $content = content;

        _this.template.get("login")
            .then(function(template) {
                $content.html(template());

                $("#btn-login").on("click", function() {
                    let loginUser = {
                        username: $("#tb-username").val(),
                        password: $("#tb-password").val()
                    };

                    _this.accountData.userLogin(loginUser, context)
                        .then(function(user) {
                            $("#nav-btn-logout").removeClass("hidden");
                            $("#nav-btn-login").addClass("hidden");
                            $("#nav-btn-register").addClass("hidden");
                            $("#my-watchlist").removeClass("hidden");

                            localStorage.setItem("usernameKey", user._kmd.authtoken);
                            localStorage.setItem("username", user.username);
                            localStorage.setItem("userId", user._id);

                            context.redirect("#/home/");
                        }, function() {
                            $("#passwordsNoMatchRegister").fadeIn();
                        });
                });
            });
    }


    registerUser(context, content) {
        let _this = this,
            $content = content;

        _this.template.get("register")
            .then(function(template) {
                $content.html(template());

                $("#btn-register").on("click", function() {
                    let registerNewUser = {
                        username: $("#tb-regUsername").val(),
                        password: $("#tb-regPassword").val()
                    };

                    let validationResult = validator.validate(registerNewUser);

                    if (validationResult) {
                        context.redirect("#/register");
                    } else {
                        _this.accountData.userRegister(registerNewUser)
                            .then(function() {
                                context.redirect("#/login");
                            }, function() {
                                $("#existingUser").fadeIn();
                            });
                    }
                });
            });
    }

    logoutUser(context) {

        $("#nav-btn-logout").addClass("hidden");
        $("#nav-btn-login").removeClass("hidden");
        $("#nav-btn-register").removeClass("hidden");
        $("#my-watchlist").addClass("hidden");

        localStorage.removeItem("usernameKey");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        context.redirect("#/home/");
    }

    addMovieToUserWatchlist(title) {
        let _this = this;

        _this.galleyData.getMoviesByTitle(title)
            .then(function(movie) {
                _this.accountData.getMoviesFromUsersWatchlist()
                    .then(function(user) {
                        let movies = user.watchlist;
                        let isTheMovieAdded = false;

                        if (!movies) {
                            _this.accountData.addMovieToUserWatchlist(movie);
                        } else {
                            movies.forEach(function(movieInWatchlist) {
                                if (movieInWatchlist._id === movie[0]._id) {
                                    isTheMovieAdded = true;
                                }
                            });

                            if (!isTheMovieAdded) {
                                movies.push(movie[0]);

                                _this.accountData.addMovieToUserWatchlist(movies);
                            }
                        }
                    });
            });
    }

    removeMovieFromUserWatchlist(title, context) {
        let _this = this;

        _this.accountData.getMoviesFromUsersWatchlist()
            .then(function(user) {
                let movies = user.watchlist;

                for (var i = 0; i < movies.length; i += 1) {
                    if (movies[i].name === title) {
                        movies.splice(i, 1);
                        break;
                    }
                }

                _this.accountData.addMovieToUserWatchlist(movies);
                context.redirect("#/my-watchlist");
            });
    }

    getUserWatchlist(content) {
        let _this = this,
            $content = content;

        _this.accountData.getMoviesFromUsersWatchlist()
            .then(function(movies) {
                if (!movies.watchlist || movies.watchlist.length === 0) {
                    template.get("empty-watchlist")
                        .then(function(template) {
                            $content.html(template());
                        });
                } else {
                    template.get("watchlist")
                        .then(function(template) {
                            $content.html(template(movies.watchlist));
                        });
                }
            });
    }
}

let accountController = new AccountController(accountData, galleyData, template);
export { accountController };