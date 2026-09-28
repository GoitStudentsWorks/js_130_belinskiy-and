const backdropElem = document.querySelector('.js-success-backdrop');
const closeBtnElem = document.querySelector('.js-close-modal');
const bodyElem = document.body;

// --- слухачі подій ---
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
  // блокування свайпів
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
}
function onCloseModal() {
  backdropElem.classList.remove('is-open');
  bodyElem.classList.remove('modal-open');
  // повернення свайпів
  window.removeEventListener('wheel', preventScroll);
  window.removeEventListener('touchmove', preventScroll);
}
// відміна дій скролла
function preventScroll(event) {
  event.preventDefault();
}
function onBackdropClick(event) {
  // перевірка на бекдроп
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
