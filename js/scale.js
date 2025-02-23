const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

// Функция для изменения масштаба изображения.
const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`; // Устанавливаем transform: scale() для изменения размера.
  scaleInput.value = `${value}%`;// Обновляем значение поля ввода.
};

// Обработчик клика на кнопку уменьшения масштаба.
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);// Получаем текущий масштаб из поля 
  let newValue = currentValue - SCALE_STEP;// Вычисляем новое значение масштаба.
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);  // Применяем новый масштаб.
};

// Обработчик клика на кнопку увеличения масштаба.
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10); // преобраз строку в целое число в десятич системе
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

// Функция для сброса масштаба к значению по умолчанию.
const resetScale = () => {
  scaleImage();
};

// Назначаем обработчики событий на кнопки.
smallerButton.addEventListener('click', onSmallerButtonClick); // на кнопку уменьш масштаба
biggerButton.addEventListener('click', onBiggerButtonClick);  // увелич масштаба

export { resetScale };
