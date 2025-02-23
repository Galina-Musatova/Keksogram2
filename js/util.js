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
  const alert = document.createElement('div'); //создаем див
  alert.style.position = 'absolute'; // задаем стили
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message; // выводим сообщение об ошибке
  document.body.append(alert);

  setTimeout(() => {  // Через заданное время (ALERT_SHOW_TIME).
    alert.remove();  // Удаляем элемент с сообщением.
  }, ALERT_SHOW_TIME);
};




// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}



// Функция взята из интернета и доработана Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось 
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах, чтобы можно было в дальнейшем вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки, вызываем наш колбэк и перезаписываем lastTime временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {
  getRandomPositiveInteger,
  checkStringLength,
  getRandomArrayElement,
  showAlert,
  debounce,
  throttle,
};