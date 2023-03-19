import { cardsContainer } from './utils.js';
import { openPopup, profileName, profileAbout, avatar } from './modal.js';
import { getCards, putLike, deleteLike, getUserInformation, deleteCard } from './api.js';
import { Api } from './api.js';

const cardTemplate = document.querySelector('#element-template').content;
const imagePopup = document.querySelector('.popup_open-image');
const openedImage = imagePopup.querySelector('.popup__view-image');
const openedCaption = imagePopup.querySelector('.popup__view-caption');
let userId;
export const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
})


//функция создания карточки
export function createCard(card) {
  const domCard = cardTemplate.querySelector('.element').cloneNode(true);
  domCard.querySelector('.element__title').textContent = card.name;
  const cardImage = domCard.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  //взять c сервера количество лайков
  const likedUsers = card.likes;
  const likesCount = likedUsers.length;
  const domLike = domCard.querySelector('.element__like-counter');

  domLike.textContent = likesCount;

  //функциональность для лайка карточек
  const likeButton = domCard.querySelector('.element__like-button');
  for (let i = 0; i < likesCount; i++) {
    if (likedUsers[i]._id === userId) {
      likeButton.classList.add('element__like-button_active');
      break;
    }
  }

  likeButton.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('element__like-button_active')) {
      api.deleteLike(card._id).then((res) => {
        domLike.textContent = res.likes.length;
        evt.target.classList.remove('element__like-button_active');
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.putLike(card._id).then((res) => {
        domLike.textContent = res.likes.length;
        evt.target.classList.add('element__like-button_active');
      })
        .catch((err) => {
          console.log(err);
        })
    }
  });

  //функциональность удаления карточки
  const trashButton = domCard.querySelector('.element__trash-button');
  trashButton.addEventListener('click', function (evt) {
    api.deleteCard(card._id).then((card) => {
      evt.target.closest('.element').remove();
    })
      .catch((err) => {
        console.log(err);
      })
  });
  if (card.owner._id !== userId) {
    trashButton.remove();
  }

  //функциональность открытия попапа с картинкой
  cardImage.addEventListener('click', function (evt) {
    openedImage.src = card.link;
    openedCaption.textContent = card.name;
    openedImage.alt = openedCaption.textContent;
    openPopup(imagePopup);
  });

  return domCard;
}

//функция добавления карточек
export function loadInitialCards() {
  Promise.all([api.getCards(), api.getUserInformation()])
    .then((promises) => {
      const cardsArray = promises[0];
      const userInformation = promises[1];
      userId = userInformation._id;
      profileName.textContent = userInformation.name;
      profileAbout.textContent = userInformation.about;
      avatar.src = userInformation.avatar;
      //получаем массив карточек от сервера
      for (let i = 0; i < cardsArray.length; i++) {
        let domCard = createCard(cardsArray[i]);
        cardsContainer.prepend(domCard);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

