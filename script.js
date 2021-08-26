const moviesDiv = document.querySelector('.movies')

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function(response) {
    const promiseBody = response.json()

    promiseBody.then(function(body) {
        //console.log(body)
        body.results.forEach(function(movie) {
            const movieDiv = document.createElement('div')
            movieDiv.classList.add('movie', 'flex-column','justify-end')
            movieDiv.style.backgroundImage = `url('${movie.poster_path}')`

            const movieInfoDiv = document.createElement('div')
            movieInfoDiv.classList.add('movie__info', 'flex-row', 'align-center')

            const movieTitleSpan = document.createElement('span')
            movieTitleSpan.classList.add('movie__title', 'truncate')
            movieTitleSpan.textContent = movie.title

            const movieRatingDiv = document.createElement('div')

            const img = document.createElement('img')
            img.classList.add('movie__rating__img')
            img.src = "./assets/estrela.svg"
            img.alt = "Estrela"

            const movieRatingSpan = document.createElement('span')
            movieRatingSpan.classList.add('movie__rating')
            movieRatingSpan.textContent = movie.vote_average
            
            moviesDiv.append(movieDiv)
            movieDiv.append(movieInfoDiv)
            movieInfoDiv.append(movieTitleSpan, movieRatingDiv)
            movieRatingDiv.append(img, movieRatingSpan)
        })
    })
})

const highlightVideo = document.querySelector('.highlight__video')
const highlightVideoLink = document.querySelector('.highlight__video-link')
const highlightTitle = document.querySelector('.highlight__title')
const highlightRating = document.querySelector('.highlight__rating')
const highlightGenres = document.querySelector('.highlight__genres')
const highlightLaunch = document.querySelector('.highlight__launch')
const highlightDescription = document.querySelector('.highlight__description')




fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function(response) {
    const promiseBody = response.json()

    promiseBody.then(function(body){
        console.log(body)
        highlightVideo.style.backgroundImage = `url('${body.poster_path}')`
        highlightTitle.textContent = body.title
        highlightRating.textContent = Number(body.vote_average).toFixed(1)
        highlightLaunch.textContent = body.release_date
        
        highlightGenres.textContent = body.genres.map(genre => " " + genre.name)

        highlightDescription.textContent = body.overview
        
    })
})

