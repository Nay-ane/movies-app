const linkApi = "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";
const moviesDiv = document.querySelector(".movies");
const arrowRight = document.querySelector(".btn-next");
const arrowLeft = document.querySelector(".btn-prev")

const filmesVisiveis = 5
let inicioCarrossel = 0;
let fimCarrossel = filmesVisiveis - 1;

function init() {
    requestApi(linkApi);
    arrowRight.addEventListener("click", nextPage);
    arrowLeft.addEventListener("click", prevPage)
}

async function requestApi(link) {
  const promise = await fetch(link);
  const body = await promise.json();
  const movieList = body.results;
  fillMovieLists(movieList);
  loadCarossel();
}

function fillMovieLists(movieList) {
  movieList.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie", "flex-column", "justify-end");
    movieDiv.style.backgroundImage = `url('${movie.poster_path}')`;

    const movieInfoDiv = document.createElement("div");
    movieInfoDiv.classList.add("movie__info", "flex-row", "align-center");

    const movieTitleSpan = document.createElement("span");
    movieTitleSpan.classList.add("movie__title", "truncate");
    movieTitleSpan.textContent = movie.title;

    const movieRatingDiv = document.createElement("div");

    const img = document.createElement("img");
    img.classList.add("movie__rating__img");
    img.src = "./assets/estrela.svg";
    img.alt = "Estrela";

    const movieRatingSpan = document.createElement("span");
    movieRatingSpan.classList.add("movie__rating");
    movieRatingSpan.textContent = movie.vote_average;

    moviesDiv.append(movieDiv);
    movieDiv.append(movieInfoDiv);
    movieInfoDiv.append(movieTitleSpan, movieRatingDiv);
    movieRatingDiv.append(img, movieRatingSpan);
  });
}

function loadCarossel() {
  const moviesChildren = moviesDiv.children;
  for (let i = 0; i < moviesChildren.length; i++) {
    if (i >= inicioCarrossel && i <= fimCarrossel) {
      moviesChildren[i].classList.remove("hidden");
    } else {
      moviesChildren[i].classList.add("hidden");
    }
  }
}

function nextPage() {
    inicioCarrossel = inicioCarrossel + filmesVisiveis
    fimCarrossel = fimCarrossel + filmesVisiveis
  
    if (fimCarrossel > moviesChildren.length - 1) {
        fimCarrossel = moviesChildren.length - 1
    }
    if (inicioCarrossel > fimCarrossel - 4) {
        inicioCarrossel = fimCarrossel - 4
    }

  loadCarossel()
}

function prevPage() {
    inicioCarrossel = inicioCarrossel - filmesVisiveis
    fimCarrossel = fimCarrossel - filmesVisiveis

    if (fimCarrossel < filmesVisiveis - 1) fimCarrossel = filmesVisiveis - 1
    if (inicioCarrossel < 0) inicioCarrossel = 0

    loadCarossel()
}










const highlightVideo = document.querySelector(".highlight__video");
const highlightVideoLink = document.querySelector(".highlight__video-link");
const highlightTitle = document.querySelector(".highlight__title");
const highlightRating = document.querySelector(".highlight__rating");
const highlightGenres = document.querySelector(".highlight__genres");
const highlightLaunch = document.querySelector(".highlight__launch");
const highlightDescription = document.querySelector(".highlight__description");

fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
).then(function (response) {
  const promiseBody = response.json();

  promiseBody.then(function (body) {
    //console.log(body)
    highlightVideo.style.backgroundImage = `url('${body.poster_path}')`;
    highlightTitle.textContent = body.title;
    highlightRating.textContent = Number(body.vote_average).toFixed(1);
    highlightLaunch.textContent = body.release_date;

    highlightGenres.textContent = body.genres.map((genre) => " " + genre.name);

    highlightDescription.textContent = body.overview;
  });
});

const highlightVideoButton = document.querySelector(".highlight__video-button");

highlightVideoLink.removeAttribute("href");

highlightVideoButton.addEventListener("click", function () {
  const promiseResponse = fetch(
    "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
  );

  promiseResponse.then(function (response) {
    const promiseBody = response.json();

    promiseBody.then(function (body) {
      let key = body.results[0].key;
      highlightVideoLink.href = `https://www.youtube.com/watch?v=${key}`;
    });
  });
});

init()