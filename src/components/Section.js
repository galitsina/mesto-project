// import { handleCardClick } from './modal.js';
// import { api } from './cards.js';

export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(selector);
  }

  //перебирает массив данных _items. Вызывает для каждого элемента массива функцию-колбэк _renderer
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }
  // принимает параметр element и добавляет его в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}



// //функция добавления карточек
// export function loadInitialCards() {
//   Promise.all([api.getCards(), api.getUserInformation()])
//     .then((promises) => {
//       const cardsArray = promises[0];
//       const userInformation = promises[1];
//       userId = userInformation._id;
//       profileName.textContent = userInformation.name;
//       profileAbout.textContent = userInformation.about;
//       avatar.src = userInformation.avatar;
//       //создаём экземпляр класса Section

//       const cardsList = new Section({
//         data: cardsArray,
//         //функция-колбэк. Вызывает для каждой карточки, полученной с сервера, метод класса Card,
//         // генерирующий карточку, и вставляет каждую карточку методом класса Section setItem в разметку
//         renderer: (card) => {
//           const newCard = new Card({link: card.link, name: card.name, likes: card.likes, _id: card._id, owner: card.owner }, '#element-template', api.deleteLike, api.putLike, api.deleteCard, card.userId, handleCardClick);
//           const domCard = newCard.generate();
//           cardsList.setItem(domCard);
//         },
//       },
//         elements //селектор контейнера с карточками
//       );

//     //   for (let i = 0; i < cardsArray.length; i++) {
//     //     let domCard = createCard(cardsArray[i]);
//     //     cardsContainer.prepend(domCard);
//     //   }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
