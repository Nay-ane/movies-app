const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");

function init() {
    closeModal.addEventListener('click', event => fecharModal())
}

function abrirModal(movie) {
    console.log(movie)
    modal.classList.remove('hidden')
}

function fecharModal() {
    console.log("Fechadno")
    modal.classList.add('hidden')
}


function fillModalList(movie) {

}


init()