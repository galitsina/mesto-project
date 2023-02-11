const popups = document.querySelectorAll('.popup');
const editingProfilePopup = document.querySelector('.popup_edit-form');
const addingCardPopup = document.querySelector('.popup_add-form');
const imagePopup = document.querySelector('.popup_open-image');
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const nameInput = editingProfilePopup.querySelector('#name'); //1 поле редактирования в попапе редактирования
const bioInput = editingProfilePopup.querySelector('#about'); //2 поле редактирования в попапе редактирования
const titleInput = addingCardPopup.querySelector('#title'); //1 поле редактирования в попапе создания
const linkInput = addingCardPopup.querySelector('#link'); //2 поле редактирования в попапе создания
const cardTemplate = document.querySelector('#element-template').content;
const openedImage = imagePopup.querySelector('.popup__view-image');
const openedCaption = imagePopup.querySelector('.popup__view-caption');
const cardsContainer = document.querySelector('.elements'); //контейнер для всех карточек

//функциональность открытия окон
function openPopup(domElement) {
  domElement.classList.add('popup_opened');
}

//функциональность закрытия окон
function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
}

//функциональность открытия окна редактирования
function openEditProfile() {
  openPopup(editingProfilePopup);
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
}
editButton.addEventListener('click', openEditProfile);

//функциональность открытия окна добавления карточки
function openAddCard() {
  openPopup(addingCardPopup);
  // titleInput.value = '';
  // linkInput.value = '';
}
addButton.addEventListener('click', openAddCard);

// Обработчик «отправки» формы редактирования профиля
function submitEditProfile(evt) {
  // Эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки.
  evt.preventDefault();
  profileName.textContent = nameInput.value; //в значение имени на странице записываем значение из первого поля
  profileAbout.textContent = bioInput.value; //в значение био на странице записываем значение из второго поля
  closePopup(editingProfilePopup); //при нажатии на кнопку "сохранить" закрываем попап
  document.forms.editprofile.reset();
}
editingProfilePopup.addEventListener('submit', submitEditProfile);

// Обработчик «отправки» формы создания карточки
function submitAddCard(evt) {
  evt.preventDefault();
  //добавляем карточку в дерево при нажатии кнопки 'Создать'
  const card = createCard(titleInput.value, linkInput.value);
  cardsContainer.prepend(card);
  closePopup(addingCardPopup); //при нажатии на кнопку "создать" закрываем попап
  document.forms.addcard.reset();
}
addingCardPopup.addEventListener('submit', submitAddCard);

//обходим каждый элемент массива кнопок closeButtons
closeButtons.forEach(function (item) {
  //на каждый элемент вешаем слушатель клика с параметром, содержащим произошедшее событие
  item.addEventListener('click', function (evt) {
    //удалаяем класс открытого окна у родителя кнопки closeButtons
    closePopup(evt.target.closest('.popup'));
  });
});

//функция создания карточки
function createCard(name, link) {
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
for (let i = 0; i < initialCards.length; i++) {
  let card = createCard(initialCards[i].name, initialCards[i].link);
  cardsContainer.prepend(card);
}

//клик на оверлей - закрытие попапа
popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.currentTarget);
    }
  });
});

//нажатие на esc - закрытие попапа
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    popups.forEach(function (popup) {
      closePopup(popup);
    });
  }
})
