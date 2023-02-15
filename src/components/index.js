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
const validationConfig = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__input-item-error_active'
};

//функциональность открытия окон
function openPopup(domElement) {
  domElement.classList.add('popup_opened');
}

//функциональность закрытия окон
function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
  const popupForm = domElement.querySelector(validationConfig.formSelector);
  if (popupForm !== null) {
    popupForm.reset();
    const formInputs = popupForm.querySelectorAll(validationConfig.inputSelector);
    formInputs.forEach(function (inputElement) {
      hideInputError(popupForm, inputElement, validationConfig);
    });
  }
}

//функциональность открытия окна редактирования
function openEditProfile() {
  openPopup(editingProfilePopup);
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
  const formInputs = Array.from(editingProfilePopup.querySelectorAll(validationConfig.inputSelector));
  const formButton = editingProfilePopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(formInputs, formButton, validationConfig);
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
}
editingProfilePopup.addEventListener('submit', submitEditProfile);

// Обработчик «отправки» формы создания карточки
function submitAddCard(evt) {
  evt.preventDefault();
  //добавляем карточку в дерево при нажатии кнопки 'Создать'
  const card = createCard(titleInput.value, linkInput.value);
  cardsContainer.prepend(card);
  closePopup(addingCardPopup); //при нажатии на кнопку "создать" закрываем попап
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

//валидация
function showInputError(formElement, inputElement, errorMesage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMesage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputs, buttonElement, config) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListener(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, buttonElement, config);
  inputs.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,config);
      toggleButtonState(inputs, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(function (formElement) {
    setEventListener(formElement, config);
  });
}

enableValidation(validationConfig);
