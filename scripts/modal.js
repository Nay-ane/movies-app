const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");

function init() {
    closeModal.addEventListener("click", (event) => fecharModal());
}

function abrirModal(movie) {
    console.log(movie)
    fillModalInfo(movie);
    modal.classList.remove("hidden");
}

function fecharModal() {
    console.log("Fechadno");
    modal.classList.add("hidden");
}

function fillModalInfo(movie) {
    setModalTitle(movie);
    setModalPoster(movie);
    setModalOverview(movie);
    setModalAvarage(movie);
}

function setModalAvarage(movie) {
    const modalAvarage = document.querySelector(".modal__average");
    modalAvarage.textContent = Number(movie.vote_average).toFixed(1);
}

function setModalOverview(movie) {
    const modalDescription = document.querySelector(".modal__description");
    modalDescription.textContent = movie.overview;
}

function setModalPoster(movie) {
    const modalImg = document.querySelector(".modal__img");
    modalImg.src = movie.backdrop_path;
}

function setModalTitle(movie) {
    const modalTitle = document.querySelector(".modal__title");
    modalTitle.textContent = movie.title;
}

init();
