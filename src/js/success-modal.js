const backdropElem = document.querySelector('.js-success-backdrop');
const closeBtnElem = document.querySelector('.js-close-modal');
const bodyElem = document.body;

// закриття на кнопку
if (closeBtnElem) {
  closeBtnElem.addEventListener('click', onCloseModal);
}
// закриття на бэкдроп
if (backdropElem) {
  backdropElem.addEventListener('click', onBackdropClick);
}
//закриття на Escape
window.addEventListener('keydown', onEscKeyPress);

export default function onOpenModal() {
  backdropElem.classList.add('is-open');
  bodyElem.classList.add('modal-open');
}
function onCloseModal() {
  backdropElem.classList.remove('is-open');
  bodyElem.classList.remove('modal-open');
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
function onEscKeyPress(event) {
  // перевірка на escape
  if (event.key === 'Escape' && backdropElem.classList.contains('is-open')) {
    onCloseModal();
  }
}
