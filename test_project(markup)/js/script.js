/**
 * NodeList.prototype.forEach() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/* Фильтер на мобильных устройствах */
const sidebarToggleBtn = document.querySelector(".menu");
const menuTop = document.querySelector(".menu-top");
const menuMiddle = document.querySelector(".menu-middle");
const menuBottom = document.querySelector(".menu-bottom");
const sidebar = document.querySelector(".sidebar");

// Клик по кнопке для скрытия показа фильтра и изменения иконки
sidebarToggleBtn.onclick = function (event) {
  console.log(event);
  menuTop.classList.toggle("menu-top-click");
  menuMiddle.classList.toggle("menu-middle-click");
  menuBottom.classList.toggle("menu-bottom-click");
  sidebar.classList.toggle("sidebar--mobile-active");
};

/* Показать еще 3 карточки */
const btnShowMoreCards = document.querySelector(".btn-more");
const hiddenCards = document.querySelectorAll(".card-link--hidden");

// Клик по кнопке ипоказ трех скрытых карточек
btnShowMoreCards.addEventListener("click", () => {
  hiddenCards.forEach((card) => card.classList.remove("card-link--hidden"));
});

/* Показать/скрыть контент внутри виджетов */
const widgets = document.querySelectorAll(".widget");

// Находим все виджеты на странице
widgets.forEach((widget) => {
  // Слушаем клик внутри виджета
  widget.addEventListener("click", (event) => {
    // Если кликаем по заголовку - тогда скрываем/показываем телов виджета
    if (event.target.classList.contains("widget__title")) {
      event.target.classList.toggle("widget__title--active");
      event.target.nextElementSibling.classList.toggle("widget__body--hidden");
    }
  });
});

/* Location - кнопка Любая */
const checkBoxAny = document.querySelector("#location-05");
const topLocationCheckBoxes = document.querySelectorAll(
  "[data-location-param]"
);

/* Выбор кнопки "Любая" и отключение других чекбоксов */
checkBoxAny.addEventListener("change", () => {
  if (checkBoxAny.checked) {
    topLocationCheckBoxes.forEach((item) => {
      item.checked = false;
    });
  }
});

/* Отключаем кнопку "Любая", при выборе других параметров */
topLocationCheckBoxes.forEach((item) => {
  item.addEventListener("change", () => {
    if (checkBoxAny.checked) {
      checkBoxAny.checked = false;
    }
  });
});

/* Показать еще 3 доп опции с чекбоксами в фильтре */
const showMoreOptions = document.querySelector(".widget__btn-show-hidden");
const hiddenCheckBoxes = document.querySelectorAll(".checkbox--hidden");

/* При клике на "Показать еще" - отображаются скрытые дополнительные чекбоксы в фильтре
При повторном нажатии дополнительные чекбоксы скрываются */
showMoreOptions.onclick = (e) => {
  e.preventDefault();
  hiddenCheckBoxes.forEach((item) => {
    if (item.classList.contains("checkbox--hidden")) {
      item.classList.remove("checkbox--hidden");
      showMoreOptions.innerHTML = "Скрыть";
    } else {
      item.classList.toggle("checkbox--hidden");
      item.children[0].checked = false;
      showMoreOptions.innerText = "Показать еще";
    }
  });
};
