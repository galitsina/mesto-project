import { cardsContainer, hideInputError, validationConfig } from './utils.js';
import { createCard } from './cards.js';
import { toggleButtonState } from './validate.js';
import { editAvatar } from './api.js';

export const editingProfilePopup = document.querySelector('.popup_edit-form');
export const addingCardPopup = document.querySelector('.popup_add-form');
export const editingAvatarPopup = document.querySelector('.popup_edit-avatar');
export const avatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name'); //имя профиля на странице
export const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const nameInput = editingProfilePopup.querySelector('#name'); //1 поле редактирования в попапе редактирования
const bioInput = editingProfilePopup.querySelector('#about'); //2 поле редактирования в попапе редактирования
const titleInput = addingCardPopup.querySelector('#title'); //1 поле редактирования в попапе создания
const linkInput = addingCardPopup.querySelector('#link'); //2 поле редактирования в попапе создания
const avatarLinkInput = editingAvatarPopup.querySelector('#avatarlink'); //поле с ссылкой для изменения аватара
const editingFormInputs = Array.from(editingProfilePopup.querySelectorAll(validationConfig.inputSelector));
const editingFormButton = editingProfilePopup.querySelector(validationConfig.submitButtonSelector);
const addingFormInputs = Array.from(addingCardPopup.querySelectorAll(validationConfig.inputSelector));
const addingFormButton = addingCardPopup.querySelector(validationConfig.submitButtonSelector);
const editingAvatarInput = Array.from(editingAvatarPopup.querySelectorAll(validationConfig.inputSelector));
const editingAvatarButton = editingAvatarPopup.querySelector(validationConfig.submitButtonSelector);

//функциональность открытия окон
export function openPopup(domElement) {
  domElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWhenEsc);
}

//функциональность cброса инпутов
function resetFormInPopup(domElement) {
  const popupForm = domElement.querySelector(validationConfig.formSelector);
  if (popupForm !== null) {
    popupForm.reset();
    const formInputs = popupForm.querySelectorAll(validationConfig.inputSelector);
    formInputs.forEach(function (inputElement) {
      hideInputError(popupForm, inputElement, validationConfig);
    });
  }
}

//функциональность закрытия окон
export function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWhenEsc);
}

//функциональность открытия окна редактирования
export function openEditProfile() {
  resetFormInPopup(editingProfilePopup);
  openPopup(editingProfilePopup);
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
  toggleButtonState(editingFormInputs, editingFormButton, validationConfig);
}

//функциональность открытия окна добавления карточки
export function openAddCard() {
  resetFormInPopup(addingCardPopup);
  toggleButtonState(addingFormInputs, addingFormButton, validationConfig); //кнопка становится неактивной при пустых полях
  openPopup(addingCardPopup);
}

//функциональность открытия окна редактирования аватара
export function openEditAvatar() {
  resetFormInPopup(editingAvatarPopup);
  toggleButtonState(editingAvatarInput, editingAvatarButton, validationConfig); //кнопка становится неактивной при пустых полях
  openPopup(editingAvatarPopup);
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

//Изменение текста на кнопки при отправке данных на сервер, принимает 2 параметра,т.к нужны 2 разных текста (сохранение, создание)
function changeButtonText(button, buttonText) {
  button.textContent = buttonText;
}

//Обработчик «отправки» формы редактирования аватара
export function submitEditAvatar(evt) {
  evt.preventDefault();
  changeButtonText(editingAvatarButton, 'Сохранение...');
  editAvatar(avatarLinkInput.value).then((profile) => {
    avatar.src = profile.avatar;
  })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      changeButtonText(editingAvatarButton, 'Сохранить');
    })
  closePopup(editingAvatarPopup); //при нажатии на кнопку закрываем попап
}

export function initPopupCloseListeners(closeButtonSelector, popupSelector) {
  const popups = document.querySelectorAll(popupSelector);
  const closeButtons = document.querySelectorAll(closeButtonSelector);
  //обходим каждый элемент массива кнопок closeButtons
  closeButtons.forEach(function (item) {
    //на каждый элемент вешаем слушатель клика с параметром, содержащим произошедшее событие
    item.addEventListener('click', function (evt) {
      const parentPopup = evt.target.closest(popupSelector);
      //удалаяем класс открытого окна у родителя кнопки closeButtons
      closePopup(parentPopup);
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
}

//нажатие на esc - закрытие попапа
function closePopupWhenEsc(evt) {
  if (evt.key === 'Escape') {
    const anyOpenedPopup = document.querySelector('.popup_opened');
    closePopup(anyOpenedPopup);
  }
}
