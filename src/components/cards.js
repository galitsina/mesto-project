import { cardsContainer } from './utils.js';
import { openPopup, profileName, profileAbout, avatar } from './modal.js';
import { getCards, putLike, deleteLike, getUserInformation, deleteCard } from './api.js';
import { Api } from './api.js';

// const cardTemplate = document.querySelector('#element-template').content;
const imagePopup = document.querySelector('.popup_open-image');
const openedImage = imagePopup.querySelector('.popup__view-image');
const openedCaption = imagePopup.querySelector('.popup__view-caption');
let userId;
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
})

export class Card {
  constructor({ link, name, likes, _id, owner }, selector, apiDeleteLike, apiPutLike, apiDeleteCard, userId, handleCardClick) {
    this._image = link;
    this._name = name;
    this._selector = selector;
    this._likes = likes;
    this._id = _id;
    this._owner = owner._id; //для проверки создателя карточки
    this.userId = userId; // id пользователя
    this.apiDeleteLike = apiDeleteLike;
    this.apiPutLike = apiPutLike;
    this.apiDeleteCard = apiDeleteCard;
  }

_getElement() {
  const domCard = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  // вернём DOM-элемент карточки
  return domCard;
}

generate() {
  // Запишем разметку в приватное поле _element
  // Так у других элементов появится доступ к ней
  this._element = this._getElement();

  this._setEventListenersLike(); // добавим обработчики
  this._setEventListenersDelete();

  // Добавим данные
  this._element.querySelector('.element__image').src = this._image;
  this._element.querySelector('.element__title').textContent = this._name;

  //если пользователь лайкал карточку, сердце закрашено
  for(let i = 0; i <this._likes.length; i++) {
    if (this._likes[i]._id === this.userId) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
      break;
    }
  }

  //если карточку создал не пользователь, на ней нет иконки удаления
  if (this.owner._id !== this.userId) {
    this._element.querySelector('.element__trash-button').remove();
  }

  // Вернём элемент в качестве результата работы метода
  return this._element;
}

_handleClickLike(evt) {
  this._element = this._getElement();
  const domLike = this._element.querySelector('.element__like-counter');
  if (evt.target.classList.contains('element__like-button_active')) {
    this.apiDeleteLike(this._id).then((res) => {
      domLike.textContent = res.likes.length;
      evt.target.classList.remove('element__like-button_active');
    })
      .catch((err) => {
        console.log(err);
      })
  } else {
    this.apiPutLike(this._id).then((res) => {
      domLike.textContent = res.likes.length;
      evt.target.classList.add('element__like-button_active');
    })
      .catch((err) => {
        console.log(err);
      })
  }
}
_setEventListenersLike() {
  this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
    this._handleClickLike(evt);
  });
}

_handleClickDelete() {
  this.apiDeleteCard(this._id).then(() => {
    evt.target.closest('.element').remove();
  })
    .catch((err) => {
      console.log(err);
    })
}
_setEventListenersDelete() {
  this._element.querySelector('.element__trash-button').addEventListener('click', () => {
    this._handleClickDelete();
  });
}

}


// //функция создания карточки
// export function createCard(card) {
//   const domCard = cardTemplate.querySelector('.element').cloneNode(true);
//   domCard.querySelector('.element__title').textContent = card.name;
//   const cardImage = domCard.querySelector('.element__image');
//   cardImage.src = card.link;
//   cardImage.alt = card.name;

//   //взять c сервера количество лайков
//   const likedUsers = card.likes;
//   const likesCount = likedUsers.length;
//   const domLike = domCard.querySelector('.element__like-counter');

//   domLike.textContent = likesCount;

//   //функциональность для лайка карточек
//   const likeButton = domCard.querySelector('.element__like-button');
//   for (let i = 0; i < likesCount; i++) {
//     if (likedUsers[i]._id === userId) {
//       likeButton.classList.add('element__like-button_active');
//       break;
//     }
//   }

//   likeButton.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains('element__like-button_active')) {
//       api.deleteLike(card._id).then((res) => {
//         domLike.textContent = res.likes.length;
//         evt.target.classList.remove('element__like-button_active');
//       })
//         .catch((err) => {
//           console.log(err);
//         })
//     } else {
//       api.putLike(card._id).then((res) => {
//         domLike.textContent = res.likes.length;
//         evt.target.classList.add('element__like-button_active');
//       })
//         .catch((err) => {
//           console.log(err);
//         })
//     }
//   });

//   //функциональность удаления карточки
//   const trashButton = domCard.querySelector('.element__trash-button');
//   trashButton.addEventListener('click', function (evt) {
//     api.deleteCard(card._id).then((card) => {
//       evt.target.closest('.element').remove();
//     })
//       .catch((err) => {
//         console.log(err);
//       })
//   });
//   if (card.owner._id !== userId) {
//     trashButton.remove();
//   }

//   //функциональность открытия попапа с картинкой
//   cardImage.addEventListener('click', function (evt) {
//     openedImage.src = card.link;
//     openedCaption.textContent = card.name;
//     openedImage.alt = openedCaption.textContent;
//     openPopup(imagePopup);
//   });

//   return domCard;
// }

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

