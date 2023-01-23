const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container'); // Находим форму в DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = formElement.querySelector('.popup__close-icon');
let saveButton = formElement.querySelector('.popup__save-button');
let addButton = document.querySelector('.profile__add-button');
let popupHeading = formElement.querySelector('.popup__heading');


const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const nameInput = formElement.querySelector('#name'); //1 поле редактирования в попапе
const bioInput = formElement.querySelector('#about'); //2 поле редактирования в попапе

function editProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
}

function addCard() {
  popup.classList.add('popup_opened');
  popupHeading.textContent = 'Новое место';
  nameInput.placeholder = 'Название';
  bioInput.placeholder = 'Ссылка на картинку';
  saveButton.textContent = 'Создать';
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  profileName.textContent = nameInput.value; //в значение имени на странице записываем значение из первого поля
  profileAbout.textContent = bioInput.value; //в значение био на странице записываем значение из второго поля
  closePopup() //при нажатии на кнопку "сохранить" закрываем попап
}

editButton.addEventListener('click', editProfile);

addButton.addEventListener('click', addCard);

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»

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
function createCard (name, link) {
  const cardTemplate = document.querySelector('#element-template').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = name;
  card.querySelector('.element__image').src = link;
  return card;
}

const cards = document.querySelector('.elements'); //контейнер для всех карточек

//цикл для добавления карточек из массива
for (let i = 0; i < initialCards.length; i++) {
  let card = createCard(initialCards[i].name, initialCards[i].link);
  cards.prepend(card);
  //функциональность для лайка карточек
  document.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
}




// if saveButton.textContent='Сохранить'
