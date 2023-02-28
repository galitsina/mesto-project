import { cardsContainer } from './utils.js';
import { openPopup } from './modal.js';
import { getCards, putLike, deleteLike, getUserInformation, deleteCard } from './api.js';

const cardTemplate = document.querySelector('#element-template').content;
const imagePopup = document.querySelector('.popup_open-image');
const openedImage = imagePopup.querySelector('.popup__view-image');
const openedCaption = imagePopup.querySelector('.popup__view-caption');
let userId;

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
      deleteLike(card._id).then((res) => {
        domLike.textContent = res.likes.length;
        evt.target.classList.remove('element__like-button_active');
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      putLike(card._id).then((res) => {
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
    deleteCard(card._id).then((card) => {
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
  Promise.all([getCards(), getUserInformation()])
    .then((promises) => {
      const cardsArray = promises[0];
      const userInformation = promises[1];
      userId = userInformation._id;
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

//const initialCards = [
  //   {
  //     name: 'Гронинген',
  //     link: 'https://images.unsplash.com/photo-1616321741705-e9a4073af35c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3120&q=80'
  //   },
  //   {
  //     name: 'Волендам',
  //     link: 'https://images.unsplash.com/photo-1609875103184-cba8296a5220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
  //   },
  //   {
  //     name: 'Амстердам',
  //     link: 'https://images.unsplash.com/photo-1618333302170-d7bbc76188da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  //   },
  //   {
  //     name: 'Доесбург',
  //     link: 'https://images.unsplash.com/photo-1627496143655-285ccb0e938f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  //   },
  //   {
  //     name: 'Амеланд',
  //     link: 'https://images.unsplash.com/photo-1621583706700-eb7904e5d286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  //   },
  //   {
  //     name: 'Утрехт',
  //     link: 'https://images.unsplash.com/photo-1656977711959-47776bfec276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1313&q=80'
  //   }
  // ];
