// Этот код отвечает за отображение большой картинки с комментариями при клике на миниатюру.

// Получаем элементы DOM, с которыми будем работать.

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;// Количество комментариев, загружаемых за раз.
let commentsShown = 0; // Сколько комментариев уже показано.
let comments = []; // Массив комментариев для текущей картинки.

// Функция для создания HTML-элемента комментария.
const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// Функция для отрисовки комментариев на странице.
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

// Функция для скрытия большой картинки.
const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsShown = 0;
};

// Функция-обработчик нажатия клавиши Esc.
function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

// Функция-обработчик клика на кнопку закрытия.
const onCancelButtonClick = () => {
  hideBigPicture();
};

// Функция-обработчик клика на кнопку "Загрузить еще".
const onCommentsLoaderClick = () => renderComments();

// Функция для отрисовки деталей картинки (URL, лайки, описание).
const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

// Функция для отображения большой картинки.
const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureDetails(data); //отрисовка деталей картинки (URL, лайки, описание)
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();  //отрисовка комментариев на странице
  }
};

// Назначаем обработчики событий кнопкам.
cancelButton.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
