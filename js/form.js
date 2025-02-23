import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

// Инициализация библиотеки Pristine для валидации формы.
// Связывает Pristine с формой и задает классы из библиотеки для отображения ошибок валидации.
const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

// Функция показа модального окна.
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

// Функция скрытия модального окна.
const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};




// Функция проверки, находится ли фокус в текстовом поле (поле хэштегов или комментариев).
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

  // Функция-обработчик нажатия клавиши Esc.
function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

// Функция-обработчик клика по кнопке отмены.
const onCancelButtonClick = () => {
  hideModal();
};

// Функция-обработчик изменения значения поля загрузки файла.
const onFileInputChange = () => {
  showModal();
};


// Функции для валидации хэштегов 

const startsWithHash = (string) => string[0] === '#'; //первый знак #

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH; // длина строки > min и < max

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1)); // символы только разрешенные

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag); // совпадают все условия хэштегов

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase()); //создает новый массив и преобразует символы строки в нижний регистр  
  return lowerCaseTags.length === new Set(lowerCaseTags).size; //конструктор Set для преобразования массива в набор и возвращ количество значений
};



const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};


// Функция блокировки кнопки отправки.
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// Функция разблокировки кнопки отправки.
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Добавление валидатора для поля хэштегов.
pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);




// Функция установки обработчика отправки формы.
const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton(); // Блокирует кнопку отправки.
      await cb(new FormData(form)); // Вызывает переданную функцию обратного вызова с данными формы.
      unblockSubmitButton();// Разблокирует кнопку отправки.
    }
  });
};

// Добавление обработчиков событий для поля загрузки файла и кнопки отмены.
fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, hideModal };
