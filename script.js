const popup = document.querySelector('.popup')
const formElement = popup.querySelector('.popup__container'); // Находим форму в DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = formElement.querySelector('.popup__close-icon');
let saveButton = formElement.querySelector('.popup__save-button');

const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const nameInput = formElement.querySelector('#profile-name'); //1 поле редактирования в попапе редактирования
const bioInput = formElement.querySelector('#profile-about'); //2 поле редактирования в попапе редактирования

function editProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent; //в первое поле записываем значение имени на странице
  bioInput.value = profileAbout.textContent; //во второе поле записываем значение био на странице
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

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
