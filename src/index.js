import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { loadInitialCards } from './components/cards.js';
import { openAddCard, submitEditProfile, submitAddCard, openEditProfile, initPopupCloseListeners, editingProfilePopup, addingCardPopup } from './components/modal.js';
import { validationConfig } from './components/utils.js';

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
