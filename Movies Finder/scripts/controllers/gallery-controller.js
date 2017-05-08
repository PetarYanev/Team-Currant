import $ from "jquery";
import { template } from "template";
import { galleyData } from "gallery-data";

class GalleryController {
    constructor(galleyData, templates) {
        this.galleyData = galleyData;
        this.temlpates = templates;
    }

    home(context, content) {

        let skip = 0,
            moviesOnPage = 8,
            _this = this,
            $content = content,
            moviesInDB;

        _this.galleyData.getAllMoviesByParts(moviesOnPage, skip)
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
        _this.galleyData.getMoviesCount()
            .then(function(moviesCount) {
                moviesInDB = moviesCount.count | 0;
            });

        $(document).scroll(function() {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                if (window.location.hash === "#/home/") {
                    loadNewData();
                } else {
                    $(document).off("scroll");
                }
            }
        });

        function loadNewData() {
            let remainingMovies = moviesInDB - 8;

            if (remainingMovies >= 0) {
                skip += 8;
                galleyData.getAllMoviesByParts(moviesOnPage, skip)
                    .then(function(movies) {
                        template.get("home")
                            .then(function(template) {
                                $content.append(template(movies));
                            });
                    });
            }
        }

        $("#search-btn").on("click", function() {
            var searchInput = $("#search").val();
            $("#search").val("");

            context.redirect(`#/search/${searchInput}`);
        });
    }

    genre(genre, content) {
        let _this = this,
            $content = content;

        _this.galleyData.getMoviesByGenre(genre)
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
    }

    topRated(content) {
        let _this = this,
            $content = content;

        _this.galleyData.getMoviesByRate()
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
    }

    nowPlaying(content) {
        let _this = this,
            $content = content;

        _this.galleyData.getMoviesByNowPlaying()
            .then(function(movies) {
                template.get("home")
                    .then(function(template) {
                        $content.html(template(movies));
                    });
            });
    }

    moviesInfo(title, content) {
        let _this = this,
            $content = content;

        _this.galleyData.getMoviesByTitle(title)
            .then(function(movie) {
                template.get("movies-info")
                    .then(function(template) {
                        $content.html(template(movie));
                    });
            });
    }

    search(title, content) {
        let _this = this,
            $content = content,
            moviesToShow = [];

        _this.galleyData.getAllMovies()
            .then(function(movies) {
                for (let i = 0; i < movies.length; i += 1) {
                    if (movies[i].name.toLowerCase().indexOf(title.toLowerCase()) >= 0) {
                        moviesToShow.push(movies[i]);
                    }
                }
                return template.get("home");
            })
            .then(function(template) {
                $content.html(template(moviesToShow));
            });
    }

    contact(content) {
        let $content = content;
        template.get("contacts")
            .then(function(template) {
                $content.html(template());
            });
    }
}

let galleryController = new GalleryController(galleyData, template);
export { galleryController };