import { showBigPicture } from './big-picture.js';

// Получаем шаблон картинки из HTML
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

  // Получаем контейнер, куда будем вставлять картинки
  const container = document.querySelector('.pictures');



// Функция для создания одной картинки на основе данных
const createPicture = (data) => {
  // Деструктурируем данные
  const { comments, description, likes, url } = data;
  // Клонируем шаблон
  const picture = pictureTemplate.cloneNode(true);

    // Заполняем элементы картинки данными
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  // Добавляем обработчик клика, чтобы показать большую картинку
  picture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return picture;
};



// Функция для отрисовки всех картинок
const renderPictures = (pictures) => {
  // Создаем фрагмент для оптимизации добавления в DOM
  const fragment = document.createDocumentFragment();
  // Для каждой картинки...
  pictures.forEach((picture) => {
    // Создаем элемент картинки
    const pictureElement = createPicture(picture);
     // Добавляем его во фрагмент
    fragment.append(pictureElement);
  });
  // Добавляем фрагмент с картинками в контейнер
  container.append(fragment);
};

export { renderPictures };
