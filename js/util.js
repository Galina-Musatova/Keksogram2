const ALERT_SHOW_TIME = 5000;

// Функция для генерации случайного целого числа в заданном диапазоне.
// Принимает два числа (a и b) и возвращает случайное целое число между ними (включительно).
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки максимальной длины строки.
// Принимает строку и максимальную длину и возвращает true, если строка не превышает заданную длину, иначе false.
const checkStringLength = (string, length) => string.length <= length;

// Функция для получения случайного элемента из массива.
// Принимает массив и возвращает случайный элемент из этого массива.
const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

// Функция для отображения сообщения об ошибке на странице.
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {  // Через заданное время (ALERT_SHOW_TIME).
    alert.remove();  // Удаляем элемент с сообщением.
  }, ALERT_SHOW_TIME);
};

export {
  getRandomPositiveInteger,
  checkStringLength,
  getRandomArrayElement,
  showAlert,
};
