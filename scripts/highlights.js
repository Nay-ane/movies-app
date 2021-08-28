function init() {
    fetchMovieHighlight();
}

async function fetchMovieHighlight() {
    const highlightResponse = await fetch(
        "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
    );
    const movie = await highlightResponse.json();
    
    setPoster(movie)
    setTitle(movie)
    setRating(movie)
    setReleaseDate(movie)
    setGenres(movie)
    setOverview(movie)
    addOnClickListener(movie)
}

function addOnClickListener(movie) {
    const highlightVideoLink = document.querySelector(".highlight__video-link");
    highlightVideoLink.removeAttribute("href");
    highlightVideoLink.href = `https://www.youtube.com/watch?v=${movie.key}`;
}

function setGenres(movie) {
    const highlightGenres = document.querySelector(".highlight__genres");
    highlightGenres.textContent = movie.genres.map((genre) => " " + genre.name);
}

function setOverview(movie) {
    const highlightDescription = document.querySelector(".highlight__description");
    highlightDescription.textContent = movie.overview;
}

function setReleaseDate(movie) {
    const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"]
    const highlightLaunch = document.querySelector(".highlight__launch");
    const data = new Date(movie.release_date);
    console.log(data)
    let formatedDate = ((data.getDate() + "-" + month[(data.getMonth())] + "-" + data.getFullYear()))
    console.log(formatedDate)
    highlightLaunch.textContent = formatedDate
}

function setRating(movie) {
    const highlightRating = document.querySelector(".highlight__rating");
    highlightRating.textContent = Number(movie.vote_average).toFixed(1);
}
function setPoster(movie) {
    const highlightVideo = document.querySelector(".highlight__video");
    highlightVideo.style.backgroundImage = `url('${movie.poster_path}')`;
}

function setTitle(movie) {
    const highlightTitle = document.querySelector(".highlight__title");
    highlightTitle.textContent = movie.title;
}

init();
