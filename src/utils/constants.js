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
export const cardsContainer = '.elements'; //селектор контейнера для всех карточек
export const avatar = document.querySelector('.profile__avatar');
export const formEditProfile = document.forms.editprofile;
export const formAddCard = document.forms.addcard;
export const formEditAvatar = document.forms.editavatar;
