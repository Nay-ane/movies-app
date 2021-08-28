const linkApi =
    "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";
const moviesDiv = document.querySelector(".movies");

const filmesVisiveis = 5;
let inicioCarrossel = 0;

function init() {
    const arrowLeft = document.querySelector(".btn-prev");
    const arrowRight = document.querySelector(".btn-next");

    requestApi(linkApi);
    arrowRight.addEventListener("click", nextPage);
    arrowLeft.addEventListener("click", prevPage);
}

async function requestApi(link) {
    const promise = await fetch(link);
    const body = await promise.json();
    const movieList = body.results;
    fillMovieList(movieList);
    loadCarossel();
}

function fillMovieList(movieList) {
    movieList.forEach((movie) => {
        const movieRatingDiv = document.createElement("div");
        const movieDiv = createMovieDiv(movie);
        const movieInfoDiv = createMovieInfoDiv(movie);
        const movieTitleSpan = createMovieTitle(movie);

        configureMovieClick(movieDiv, movie)
        
        moviesDiv.append(movieDiv);
        movieDiv.append(movieInfoDiv);
        movieInfoDiv.append(movieTitleSpan, movieRatingDiv);
        movieRatingDiv.append(createStarIcon(), createMovieRating(movie));
    });
}

function loadCarossel() {
    const moviesChildren = moviesDiv.children;

    for (let i = 0; i < moviesChildren.length; i++) {
        if (i >= inicioCarrossel && i <= inicioCarrossel + filmesVisiveis - 1) {
            moviesChildren[i].classList.remove("hidden");
        } else {
            moviesChildren[i].classList.add("hidden");
        }
    }
}

function nextPage() {
    const moviesChildren = moviesDiv.children;
    inicioCarrossel = inicioCarrossel + filmesVisiveis;

    if (inicioCarrossel > moviesChildren.length - 4) {
        inicioCarrossel = 0;
    }

    loadCarossel();
}

function prevPage() {
    const moviesChildren = moviesDiv.children;
    inicioCarrossel = inicioCarrossel - filmesVisiveis;

    if (inicioCarrossel < 0) {
        inicioCarrossel = moviesChildren.length - filmesVisiveis;
    }

    loadCarossel();
}

function configureMovieClick(movieDiv, movie) {
    movieDiv.addEventListener('click', event => abrirModal(movie))
}

function createMovieRating(movie) {
    const movieRatingSpan = document.createElement("span");
    movieRatingSpan.classList.add("movie__rating");
    movieRatingSpan.textContent = movie.vote_average;
    return movieRatingSpan;
}

function createStarIcon() {
    const img = document.createElement("img");
    img.classList.add("movie__rating__img");
    img.src = "./assets/estrela.svg";
    img.alt = "Estrela";
    return img;
}

function createMovieTitle(movie) {
    const movieTitleSpan = document.createElement("span");
    movieTitleSpan.classList.add("movie__title", "truncate");
    movieTitleSpan.textContent = movie.title;
    return movieTitleSpan;
}

function createMovieInfoDiv(movie) {
    const movieInfoDiv = document.createElement("div");
    movieInfoDiv.classList.add("movie__info", "flex-row", "align-center");
    return movieInfoDiv;
}

function createMovieDiv(movie) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie", "flex-column", "justify-end");
    movieDiv.style.backgroundImage = `url('${movie.poster_path}')`;
    return movieDiv;
}

init();
