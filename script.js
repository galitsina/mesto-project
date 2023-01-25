const editPopup = document.querySelector('.popup_edit-form');
const addPopup = document.querySelector('.popup_add-form');
const imagePopup = document.querySelector('.popup_open-image');
const formElement = document.querySelector('.popup__container'); // Находим форму в DOM
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-icon');
const saveButton = formElement.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');
const popupHeading = formElement.querySelector('.popup__heading');
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const nameInput = formElement.querySelector('#name'); //1 поле редактирования в попапе
const bioInput = formElement.querySelector('#about'); //2 поле редактирования в попапе

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

function openPopup(domElement) {
  domElement.classList.add('popup_opened');
}

//функциональность открытия окна редактирования
function editProfile() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
  nameInput.placeholder = 'Введите свое имя';
  bioInput.placeholder = 'О себе';
  popupHeading.textContent = 'Редактировать профиль';
  saveButton.textContent = 'Сохранить';
}
editButton.addEventListener('click', editProfile);

//функциональность открытия окна добавления карточки
function addCard() {
  openPopup(addPopup);
  popupHeading.textContent = 'Новое место';
  nameInput.placeholder = 'Название';
  bioInput.placeholder = 'Ссылка на картинку';
  saveButton.textContent = 'Создать';
  nameInput.value = '';
  bioInput.value = '';
}
addButton.addEventListener('click', addCard);

//функциональность закрытия окон
function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, функциональность кнопок "Сохранить" и "Создать"
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  evt.preventDefault();
  //условие для логики кнопки 'Cохранить', иначе для кнопки 'Создать'
  if (saveButton.textContent === 'Сохранить') {
    profileName.textContent = nameInput.value; //в значение имени на странице записываем значение из первого поля
    profileAbout.textContent = bioInput.value; //в значение био на странице записываем значение из второго поля
    closePopup(editPopup); //при нажатии на кнопку "сохранить" закрываем попап
  } else {
    //добавляем карточку в дерево при нажатии кнопки 'Создать'
    const card = createCard(nameInput.value, bioInput.value);
    cards.prepend(card);
    closePopup(addPopup); //при нажатии на кнопку "создать" закрываем попап
  }
}

// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//обходим каждый элемент массива кнопок closeButton
closeButton.forEach(function (item) {
  //на каждый элемент вешаем слушатель клика с параметром, содержащим произошедшее событие
  item.addEventListener('click', function (evt) {
    //удалаяем класс открытого окна у родителя кнопки closeButton
    evt.target.closest('.popup').classList.remove('popup_opened');

  });
});

//функция создания карточки
function createCard(name, link) {
  const cardTemplate = document.querySelector('#element-template').content;
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
    const openedImage = imagePopup.querySelector('.popup__view-image');
    openedImage.src = evt.target.src;
    const openedCaption = imagePopup.querySelector('.popup__view-caption');
    openedCaption.textContent = evt.target.alt;
    openedImage.alt = openedCaption.textContent;
    openPopup(imagePopup);
  });

  return card;
}

const cards = document.querySelector('.elements'); //контейнер для всех карточек

//цикл для добавления карточек из массива
for (let i = 0; i < initialCards.length; i++) {
  let card = createCard(initialCards[i].name, initialCards[i].link);
  cards.prepend(card);
}


