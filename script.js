const moviesDiv = document.querySelector('.movies')

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function(response) {
    const promiseBody = response.json()

    promiseBody.then(function(body) {
        console.log(body)
        body.results.forEach(function(movie) {
            const movieDiv = document.createElement('div')
            movieDiv.classList.add('movie', 'flex-column','justify-end')
            movieDiv.style.backgroundImage = `url('${movie.poster_path}')`

            const movieInfoDiv = document.createElement('div')
            movieInfoDiv.classList.add('movie__info', 'flex-row', 'justify-center')

            const movieTitleSpan = document.createElement('span')
            movieTitleSpan.classList.add('movie__title', 'truncate')
            movieTitleSpan.textContent = movie.title

            const movieRatingSpan = document.createElement('span')
            movieRatingSpan.classList.add('movie__rating')
            movieRatingSpan.textContent = movie.vote_average

            const img = document.createElement('img')
            img.src = "./assets/estrela.svg"
            img.alt = "Estrela"
            
            moviesDiv.append(movieDiv)
            movieDiv.append(movieInfoDiv)
            movieInfoDiv.append(movieTitleSpan, movieRatingSpan)
            movieRatingSpan.append(img)
        })
    })
})

