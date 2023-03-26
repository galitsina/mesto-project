export const validationConfig = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__input-item-error_active'
};
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-overlay');
export const cardsContainer = document.querySelector('.elements'); //контейнер для всех карточек
export const profileName = document.querySelector('.profile__name'); //имя профиля на странице
export const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
export const avatar = document.querySelector('.profile__avatar');
export const renderLoading = (isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}


//export const editingProfilePopup = document.querySelector('.popup_edit-form');
//export const addingCardPopup = document.querySelector('.popup_add-form');
//export const editingAvatarPopup = document.querySelector('.popup_edit-avatar');

//export function hideInputError(formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// }
