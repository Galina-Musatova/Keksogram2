
// Этот модуль отвечает за фильтрацию изображений на странице.

import { debounce } from './util.js';


const PICTURES_COUNT = 10; // Количество случайных изображений для фильтрации.
const Filter = { // Объект с идентификаторами фильтров.
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters'); // Находим элемент фильтров в DOM.

let currentFilter = ''; // Текущий выбранный фильтр.
let pictures = []; // Массив изображений.

// Возвращает случайное число от -0.5 до 0.5, что позволяет случайным образом менять порядок элементов.
const randomSort = () => Math.random() - 0.5; 

// Функция для сортировки картинок по убыванию количества комментариев.
// Возвращает разницу между количеством комментариев pictureB и pictureA.
// Таким образом, картинки с большим количеством комментариев будут идти раньше.
const discussedSort = (pictureA, pictureB) => // Функция для сортировки по количеству комментариев.
  pictureB.comments.length - pictureA.comments.length;


  // Функция для фильтрации и сортировки массива картинок в зависимости от выбранного фильтра.
const filterPictures = () => { 
  switch (currentFilter) {
    case Filter.RANDOM:
      // Создаем копию массива pictures, сортируем её случайным образом и берем первые PICTURES_COUNT элементов.
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      // Создаем копию массива pictures и сортируем её по убыванию количества комментариев.
      return [...pictures].sort(discussedSort);
    default:
      // Если фильтр не выбран, возвращаем копию исходного массива.
      return [...pictures];
  }
};

const turnFilterOn = (loadedPictures) => { // Функция, активирующая фильтры.
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};

/**
 * Функция `setOnFilterClick` добавляет обработчик кликов на элемент фильтров.
 * @param {function} cb - Callback-функция, вызываемая после выбора фильтра.
 */
const setOnFilterClick = (cb) => {
  // Используем debounce, чтобы уменьшить частоту вызовов cb при быстрых кликах.
  const debouncedCallback = debounce(cb);

  // Добавляем обработчик события 'click' на элемент фильтров.
  filtersElement.addEventListener('click', (evt) => {
    // Проверяем, был ли клик по кнопке фильтра.
    if (!evt.target.classList.contains('img-filters__button')) {
      return; // Если нет, выходим из функции.
    }

    const clickedButton = evt.target;
    // Проверяем, не был ли выбран текущий фильтр.
    if (clickedButton.id === currentFilter) {
      return; // Если да, выходим из функции.
    }

    // Убираем активный класс с предыдущей кнопки фильтра.
    filtersElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    // Добавляем активный класс к текущей кнопке фильтра.
    clickedButton.classList.add('img-filters__button--active');
    // Обновляем текущий выбранный фильтр.
    currentFilter = clickedButton.id;
    // Вызываем callback-функцию с отфильтрованными изображениями.
    debouncedCallback(filterPictures());
  });
};

export { setOnFilterClick, turnFilterOn, filterPictures }; // Экспортируем функции для использования в других модулях.
