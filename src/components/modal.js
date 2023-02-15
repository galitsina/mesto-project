import { cardsContainer, hideInputError, validationConfig } from './utils.js';
import { createCard } from './cards.js';
import { toggleButtonState } from './validate.js';

export const editingProfilePopup = document.querySelector('.popup_edit-form');
export const addingCardPopup = document.querySelector('.popup_add-form');
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const nameInput = editingProfilePopup.querySelector('#name'); //1 поле редактирования в попапе редактирования
const bioInput = editingProfilePopup.querySelector('#about'); //2 поле редактирования в попапе редактирования
const titleInput = addingCardPopup.querySelector('#title'); //1 поле редактирования в попапе создания
const linkInput = addingCardPopup.querySelector('#link'); //2 поле редактирования в попапе создания

//функциональность открытия окон
export function openPopup(domElement) {
  domElement.classList.add('popup_opened');
}

//функциональность закрытия окон
export function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
  const popupForm = domElement.querySelector(validationConfig.formSelector);
  if (popupForm !== null) {
    popupForm.reset();
    const formInputs = popupForm.querySelectorAll(validationConfig.inputSelector);
    formInputs.forEach(function (inputElement) {
      hideInputError(popupForm, inputElement, validationConfig);
    });
  }
}

//функциональность открытия окна редактирования
export function openEditProfile() {
  openPopup(editingProfilePopup);
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
  const formInputs = Array.from(editingProfilePopup.querySelectorAll(validationConfig.inputSelector));
  const formButton = editingProfilePopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(formInputs, formButton, validationConfig);
}

//функциональность открытия окна добавления карточки
export function openAddCard() {
  openPopup(addingCardPopup);
}

// Обработчик «отправки» формы редактирования профиля
export function submitEditProfile(evt) {
  // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  evt.preventDefault();
  profileName.textContent = nameInput.value; //в значение имени на странице записываем значение из первого поля
  profileAbout.textContent = bioInput.value; //в значение био на странице записываем значение из второго поля
  closePopup(editingProfilePopup); //при нажатии на кнопку "сохранить" закрываем попап
}

// Обработчик «отправки» формы создания карточки
export function submitAddCard(evt) {
  evt.preventDefault();
  //добавляем карточку в дерево при нажатии кнопки 'Создать'
  const card = createCard(titleInput.value, linkInput.value);
  cardsContainer.prepend(card);
  closePopup(addingCardPopup); //при нажатии на кнопку "создать" закрываем попап
}

export function initPopupCloseListeners(closeButtonSelector, popupSelector) {
  const popups = document.querySelectorAll(popupSelector);
  const closeButtons = document.querySelectorAll(closeButtonSelector);
  //обходим каждый элемент массива кнопок closeButtons
  closeButtons.forEach(function (item) {
    //на каждый элемент вешаем слушатель клика с параметром, содержащим произошедшее событие
    item.addEventListener('click', function (evt) {
      //удалаяем класс открытого окна у родителя кнопки closeButtons
      closePopup(evt.target.closest(popupSelector));
    });
  });

  //клик на оверлей - закрытие попапа
  popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
      if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
      }
    });
  });

  //нажатие на esc - закрытие попапа
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      popups.forEach(function (popup) {
        closePopup(popup);
      });
    }
  })
}