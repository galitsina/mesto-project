import { cardsContainer } from './utils.js';
import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#element-template').content;
const imagePopup = document.querySelector('.popup_open-image');
const openedImage = imagePopup.querySelector('.popup__view-image');
const openedCaption = imagePopup.querySelector('.popup__view-caption');

const initialCards = [
  {
    name: 'Гронинген',
    link: 'https://images.unsplash.com/photo-1616321741705-e9a4073af35c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3120&q=80'
  },
  {
    name: 'Волендам',
    link: 'https://images.unsplash.com/photo-1609875103184-cba8296a5220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
  },
  {
    name: 'Амстердам',
    link: 'https://images.unsplash.com/photo-1618333302170-d7bbc76188da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Доесбург',
    link: 'https://images.unsplash.com/photo-1627496143655-285ccb0e938f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Амеланд',
    link: 'https://images.unsplash.com/photo-1621583706700-eb7904e5d286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Утрехт',
    link: 'https://images.unsplash.com/photo-1656977711959-47776bfec276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1313&q=80'
  }
];

//функция создания карточки
export function createCard(name, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = name;
  const cardImage = card.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;

  //функциональность для лайка карточек
  const likeButton = card.querySelector('.element__like-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  //функциональность удаления карточки
  const trashButton = card.querySelector('.element__trash-button');
  trashButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  //функциональность открытия попапа с картинкой
  cardImage.addEventListener('click', function (evt) {
    openedImage.src = link;
    openedCaption.textContent = name;
    openedImage.alt = openedCaption.textContent;
    openPopup(imagePopup);
  });

  return card;
}

//цикл для добавления карточек из массива
export function loadInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    let card = createCard(initialCards[i].name, initialCards[i].link);
    cardsContainer.prepend(card);
  }
}
