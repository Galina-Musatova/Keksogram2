// Этот код отвечает за отображение сообщений об успехе и ошибке на странице.

// Получаем шаблоны сообщений из HTML.  внутри template.
const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');
const body = document.querySelector('body');

// Функция для отображения сообщения об успехе.
const showSuccessMessage = () => {
  body.append(successMessage);
  body.addEventListener('keydown', onEscDown); // на нажатие клавиши
  body.addEventListener('click', onBodyClick); //Закрывает сообщение, если клик был вне области сообщения.
  successMessage
    .querySelector('.success__button')
    .addEventListener('click', hideMessage);
};

// Функция для отображения сообщения об ошибке.  Аналогична showSuccessMessage.
const showErrorMessage = () => {
  body.append(errorMessage);
  body.addEventListener('keydown', onEscDown);
  errorMessage
    .querySelector('.error__button')
    .addEventListener('click', hideMessage);
};

// Функция для скрытия сообщения.
function hideMessage() {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  body.removeEventListener('keydown', onEscDown); //  по нажатию клавиши
  body.removeEventListener('click', onBodyClick); //Закрывает сообщение, если клик был вне области сообщения.
}

// Функция-обработчик клика по body.  Закрывает сообщение, если клик был вне области сообщения.
function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

// Функция-обработчик нажатия Esc.  Закрывает сообщение.
function onEscDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

export { showSuccessMessage, showErrorMessage };
