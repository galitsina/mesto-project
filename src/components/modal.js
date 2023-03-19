import { cardsContainer, hideInputError, validationConfig } from './utils.js';
import { createCard } from './cards.js';
import { toggleButtonState } from './validate.js';
import { editAvatar, postCard, editProfile } from './api.js';
import { Api } from './api.js';

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
const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
})

//функциональность открытия окон
export function openPopup(domElement) {
  domElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWhenEsc);
}

//функциональность закрытия окон
export function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWhenEsc);
}

//функциональность открытия окна редактирования
export function openEditProfile() {
  openPopup(editingProfilePopup);
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
  toggleButtonState(editingFormInputs, editingFormButton, validationConfig);
}

//функциональность открытия окна добавления карточки
export function openAddCard() {
  toggleButtonState(addingFormInputs, addingFormButton, validationConfig); //кнопка становится неактивной при пустых полях
  openPopup(addingCardPopup);
}

//функциональность открытия окна редактирования аватара
export function openEditAvatar() {
  toggleButtonState(editingAvatarInput, editingAvatarButton, validationConfig); //кнопка становится неактивной при пустых полях
  openPopup(editingAvatarPopup);
}

//функция управления текстом кнопки
function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

//функция, которая принимает функцию запроса, объект события и текст во время загрузки
function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  // Отменяем стандартную отправку формы, предотвращаем перезагрузку формы при сабмите
  evt.preventDefault();
  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // очищаем форму после успешного ответа от сервера
      // а так же `reset` может запустить деактивацию кнопки сабмита
      evt.target.reset();
      const formInputs = evt.target.querySelectorAll(validationConfig.inputSelector);
      formInputs.forEach(function (inputElement) {
        hideInputError(evt.target, inputElement, validationConfig);
      })
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    // возвращаем обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

// Обработчик «отправки» формы редактирования профиля
export function submitEditProfile(evt) {
  function makeRequest() {
    return api.editProfile(nameInput.value, bioInput.value).then((user) => {
      profileName.textContent = user.name; //в значение имени на странице записываем значение из первого поля
      profileAbout.textContent = user.about; //в значение био на странице записываем значение из второго поля
      closePopup(editingProfilePopup); //при нажатии на кнопку "сохранить" закрываем попап
    })
  }
  handleSubmit(makeRequest, evt, 'Сохранение...')
}

// Обработчик «отправки» формы создания карточки
export function submitAddCard(evt) {
  function makeRequest() {
    return api.postCard(titleInput.value, linkInput.value).then((card) => {
      //добавляем карточку в дерево при нажатии кнопки 'Создать'
      const domCard = createCard(card);
      cardsContainer.prepend(domCard);
      closePopup(addingCardPopup); //при нажатии на кнопку "создать" закрываем попап
    })
  }
  handleSubmit(makeRequest, evt, 'Создание...')
}

//Обработчик «отправки» формы редактирования аватара
export function submitEditAvatar(evt) {

  function makeRequest() {
    return api.editAvatar(avatarLinkInput.value).then((profile) => {
      avatar.src = profile.avatar;
      closePopup(editingAvatarPopup); //при нажатии на кнопку закрываем попап
    })
  }
  handleSubmit(makeRequest, evt, 'Сохранение...')
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
