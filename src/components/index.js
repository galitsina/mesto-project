import { enableValidation } from './validate.js';
import { loadInitialCards } from './cards.js';
import { openAddCard, submitEditProfile, submitAddCard, openEditProfile, initPopupCloseListeners, editingProfilePopup, addingCardPopup } from './modal.js';
import { validationConfig } from './utils.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupSelector = '.popup';
const closeButtonSelector = '.popup__close-icon';

editButton.addEventListener('click', openEditProfile);

addButton.addEventListener('click', openAddCard);

editingProfilePopup.addEventListener('submit', submitEditProfile);

addingCardPopup.addEventListener('submit', submitAddCard);

loadInitialCards();

initPopupCloseListeners(closeButtonSelector, popupSelector);

enableValidation(validationConfig);
