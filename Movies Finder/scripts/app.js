import Sammy from "sammy";
import $ from "jquery";
import { template } from "template";
import { accountControl } from "account-controller";
import { galleyControl } from "gallery-controller";

let router = Sammy("#content", function() {
    let $content = $("#content");

    if (accountControl.currentUser()) {
        $("#nav-btn-register").addClass("hidden");
        $("#nav-btn-login").addClass("hidden");
        $("#my-watchlist").removeClass("hidden");
        $("#nav-btn-logout").removeClass("hidden");
    } else {
        $("#nav-btn-register").removeClass("hidden");
        $("#nav-btn-login").removeClass("hidden");
        $("#my-watchlist").addClass("hidden");
        $("#nav-btn-logout").addClass("hidden");
    }

    this.get("#/home/", function() {
        $().ready(function() {
            let skip = 0;
            let moviesInDB;

            galleyControl.getAllMovies(skip)
                .then(function(movies) {
                    template.get("home")
                        .then(function(template) {
                            $content.html(template(movies));
                        });
                });
            galleyControl.getMoviesCount()
                .then(function(moviesCount) {
                    moviesInDB = moviesCount.count | 0;
                });

            $(document).scroll(function() {
                if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    loadNewData();
                }
            });

            function loadNewData() {
                let remainingMovies = moviesInDB - 8;

                if (remainingMovies >= 0) {
                    skip += 8;
                    galleyControl.getAllMovies(skip)
                        .then(function(movies) {
                            template.get("home")
                                .then(function(template) {
                                    $content.append(template(movies));
                                });
                        });
                }
            }
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
                            $("#nav-btn-logout").removeClass("hidden");
                            $("#nav-btn-login").addClass("hidden");
                            $("#nav-btn-register").addClass("hidden");
                            $("#my-watchlist").removeClass("hidden");
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
        $("#nav-btn-logout").addClass("hidden");
        $("#nav-btn-login").removeClass("hidden");
        $("#nav-btn-register").removeClass("hidden");
        $("#my-watchlist").addClass("hidden");
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

    this.get("#/search", function() {
        $("#search-btn").on("click", function() {

            let title = $("#search").val();
            let moviesToShow = [];

            galleyControl.getAllMovies()
                .then(function(movies) {
                    for (let i = 0; i < movies.length; i += 1) {
                        if (movies[i].name.toLowerCase().indexOf(title.toLowerCase()) >= 0) {
                            moviesToShow.push(movies[i]);
                        }
                    }

                    template.get("home")
                        .then(function(template) {
                            $content.html(template(moviesToShow));
                        });
                });
        });
    });

    this.get("#/watchlist/?:name", function() {
        let title = this.params["name"];

        galleyControl.getMoviesByTitle(title)
            .then(function(movie) {
                accountControl.getMoviesFromUsersWatchlist()
                    .then(function(user) {
                        let movies = user.watchlist;
                        let isTheMovieAdded = false;

                        if (!movies) {
                            accountControl.addMovieToUserWatchlist(movie);
                        } else {
                            movies.forEach(function(movieInWatchlist) {
                                if (movieInWatchlist._id === movie[0]._id) {
                                    isTheMovieAdded = true;
                                }
                            });

                            if (!isTheMovieAdded) {
                                movies.push(movie[0]);

                                accountControl.addMovieToUserWatchlist(movies);
                            }
                        }
                    });
            });
    });

    this.get("#/watchlist-remove/?:name", function(context) {
        let title = this.params["name"];

        accountControl.getMoviesFromUsersWatchlist()
            .then(function(user) {
                let movies = user.watchlist;

                for (var i = 0; i < movies.length; i += 1) {
                    if (movies[i].name === title) {
                        movies.splice(i, 1);
                        break;
                    }
                }

                accountControl.addMovieToUserWatchlist(movies);
                context.redirect("#/my-watchlist");
            });

    });


    this.get("#/contact/", function() {
        template.get("contacts")
            .then(function(template) {
                $content.html(template());
            });
    });

    this.get("#/my-watchlist", function() {
        accountControl.getMoviesFromUsersWatchlist()
            .then(function(movies) {
                template.get("watchlist")
                    .then(function(template) {
                        $content.html(template(movies.watchlist));
                    });
            });
    });
});

router.run("#/home/");

export { router };