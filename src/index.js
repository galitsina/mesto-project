import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { loadInitialCards } from './components/cards.js';
import { openAddCard, submitEditProfile, submitAddCard, openEditProfile, initPopupCloseListeners, editingProfilePopup, addingCardPopup, openEditAvatar, submitEditAvatar, editingAvatarPopup, profileName, profileAbout, avatar } from './components/modal.js';
import { validationConfig } from './components/utils.js';
import { getUserInformation, getCards, deleteCard, putLike, deleteLike, editAvatar, editProfile, postCard } from './components/api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-overlay');
const popupSelector = '.popup';
const closeButtonSelector = '.popup__close-icon';

getUserInformation()
  .then ((res) => {
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
    avatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

editButton.addEventListener('click', openEditProfile);

addButton.addEventListener('click', openAddCard);

editAvatarButton.addEventListener('click', openEditAvatar);

editingProfilePopup.addEventListener('submit', submitEditProfile);

addingCardPopup.addEventListener('submit', submitAddCard);

editingAvatarPopup.addEventListener('submit', submitEditAvatar);

loadInitialCards();

initPopupCloseListeners(closeButtonSelector, popupSelector);

enableValidation(validationConfig);

function test() {
  fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    headers: {
      authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

getUserInformation()
  .then(res => {
    console.log(res)
  });
  console.log("Can be befor JSON")

  // editProfile('Dani','Galitsyna')
  // .then(res => {
  //   console.log(res)
  // });

  // postCard('Mermaid', 'https://i2-prod.manchestereveningnews.co.uk/incoming/article16913849.ece/ALTERNATES/s1200b/0_MEN-TRAVEL-COPENHAGEN-mermaid-hoangnt.jpg')
  // .then(res => {
  //   console.log(res)
  // });

  getCards()
  .then(res => {
    console.log(res)
  });

  // deleteCard('63fcad36a606c60d299bf520')
  // .then(res => {
  //   console.log(res)
  // });

  putLike('63fcae4f3093310d1d28ee54')
  .then(res => {
    console.log(res)
  });

  deleteLike('63fcae4f3093310d1d28ee54')
  .then(res => {
    console.log(res)
  });

  putLike('63fcae4f3093310d1d28ee54')
  .then(res => {
    console.log(res)
  });

  putLike('63fcae4f3093310d1d28ee54')
  .then(res => {
    console.log(res)
  });

  // editAvatar('https://i2-prod.manchestereveningnews.co.uk/incoming/article16913849.ece/ALTERNATES/s1200b/0_MEN-TRAVEL-COPENHAGEN-mermaid-hoangnt.jpg')
  // .then(res => {
  //   console.log(res)
  // });
