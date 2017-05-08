import Sammy from "sammy";
import $ from "jquery";
import { accountData } from "account-data";
import { galleryController } from "galleryController";
import { accountController } from "accountController";

let router = Sammy("#content", function() {
    let $content = $("#content");

    if (accountData.currentUser()) {
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

    this.get("#/home/", function(context) {
        galleryController.home(context, $content);
    });

    this.get("#/login", function(context) {
        accountController.loginUser(context, $content);
    });

    this.get("#/register", function(context) {
        accountController.registerUser(context, $content);
    });

    this.get("#/logout", function(context) {
        accountController.logoutUser(context);
    });

    this.get("#/sorted-by/?:genre", function() {
        let genre = this.params["genre"];
        galleryController.genre(genre, $content);
    });

    this.get("#/top-rated", function() {
        galleryController.topRated($content);
    });

    this.get("#/now-playing", function() {
        galleryController.nowPlaying($content);
    });

    this.get("#/movies-info/?:name", function() {
        let title = this.params["name"];
        galleryController.moviesInfo(title, $content);
    });

    this.get("#/search/?:searchInput", function() {
        let title = this.params["searchInput"];
        galleryController.search(title, $content);
    });

    this.get("#/watchlist/?:name", function() {
        let title = this.params["name"];
        accountController.addMovieToUserWatchlist(title);
    });

    this.get("#/watchlist-remove/?:name", function(context) {
        let title = this.params["name"];
        accountController.removeMovieFromUserWatchlist(title, context);
    });

    this.get("#/contact/", function() {
        galleryController.contact($content);
    });

    this.get("#/my-watchlist", function() {
        accountController.getUserWatchlist($content);
    });
});

router.run("#/home/");

export { router };