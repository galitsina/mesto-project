import './pages/index.css';
import { enableValidation } from './components/FormValidator.js';
import { openAddCard, submitEditProfile, submitAddCard, openEditProfile, initPopupCloseListeners, editingProfilePopup, addingCardPopup, openEditAvatar, submitEditAvatar, editingAvatarPopup, profileName, profileAbout, avatar } from './components/modal.js';
import { validationConfig } from './components/utils.js';
import { PopupWithImage } from './components/PopupWithImage';
import { Api } from './components/Api';
import { UserInfo } from './components/UserInfo';
import { Card } from './components/Card';
import { Section } from './components/Section';

// const editButton = document.querySelector('.profile__edit-button');
// const addButton = document.querySelector('.profile__add-button');
// const editAvatarButton = document.querySelector('.profile__avatar-overlay');
// const popupSelector = '.popup';
// const closeButtonSelector = '.popup__close-icon';
let userId;
// editButton.addEventListener('click', openEditProfile);

// addButton.addEventListener('click', openAddCard);

// editAvatarButton.addEventListener('click', openEditAvatar);

// editingProfilePopup.addEventListener('submit', submitEditProfile);

// addingCardPopup.addEventListener('submit', submitAddCard);

// editingAvatarPopup.addEventListener('submit', submitEditAvatar);

// loadInitialCards();

// initPopupCloseListeners(closeButtonSelector, popupSelector);

// enableValidation(validationConfig);
//правильная версия handleCardClick
const popupWithImage = new PopupWithImage('.popup_open-image');

const handleCardClick = (link, name) => {
  openedImage.src = link;
  openedCaption.textContent = name;
  openedImage.alt = name;
  popupWithImage.open(link, name);
}


export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo('.profile__name', '.profile__bio', () => {
  return api.getUserInformation()
    .then((res) => {
      const user = {};
      user.name = res.name;
      user.about = res.about;
      user.id = res._id;
      user.avatar = res.avatar;
      return user;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
}, (name, about, nameSelector, aboutSelector) => {
  api.editProfile(name, about)
    .then((res) => {
      document.querySelector(nameSelector).textContent = res["name"];
      document.querySelector(aboutSelector).textContent = res["about"];
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
})




// userInfo.getUserInfo().then((res) => console.log(res));

export function loadInitialCards() {
  Promise.all([api.getCards(), userInfo.getUserInfo()])
    .then((promises) => {
      const cardsArray = promises[0];
      const userInformation = promises[1];
      userId = userInformation.id;

      profileName.textContent = userInformation.name;
      profileAbout.textContent = userInformation.about;
      avatar.src = userInformation.avatar;
      //создаём экземпляр класса Section
      const cardsList = new Section({
        items: cardsArray,
        //функция-колбэк. Вызывает для каждой карточки, полученной с сервера, метод класса Card,
        // генерирующий карточку, и вставляет каждую карточку методом класса Section setItem в разметку
        renderer: (card) => {
          const newCard = new Card({ link: card.link, name: card.name, likes: card.likes, id: card._id, owner: card.owner }, '#element-template',
            //передаём как колбэк функцию, убирающую лайк
            (evt, userId, domLike) => {
              api.deleteLike(userId)
                .then((res) => {
                  domLike.textContent = res.likes.length;
                  evt.target.classList.remove('element__like-button_active');
                })
                .catch((err) => {
                  console.log(err);
                })
            },
            //передаём как колбэк функцию, добавляющую лайк
            (evt, id, domLike) => {
              api.putLike(id).then((res) => {
                domLike.textContent = res.likes.length;
                evt.target.classList.add('element__like-button_active');
              })
                .catch((err) => {
                  console.log(err);
                })
            },
            //передаём как колбэк функцию, удаляющую карточку
            (evt, id) => {
              api.deleteCard(id).then(() => {
                evt.target.closest('.element').remove();
              })
                .catch((err) => {
                  console.log(err);
                })
            },
            userId, handleCardClick);
          const domCard = newCard.generate();
          console.log(domCard);
          cardsList.setItem(domCard);
        },
      },
        '.elements' //селектор контейнера с карточками
      );
      console.log(cardsList)
      cardsList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
}

loadInitialCards();
