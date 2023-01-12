let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-icon');
let saveButton = popup.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name'); //имя профиля на странице//
let profileAbout = document.querySelector('.profile__bio'); //био профиля на странице//
let profileInputName = popup.querySelector('#profile-name'); //1 поле редактирования в попапе редактирования//
let profileInputAbout = popup.querySelector('#profile-about'); //2 поле редактирования в попапе редактирования//

function editProfile() {
  popup.classList.add('popup_opened');
  profileInputName.value = profileName.textContent; //в первое поле записываем значение имени на странице//
  profileInputAbout.value = profileAbout.textContent; //во второе поле записываем значение био на странице//
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveData() {
  profileName.textContent = profileInputName.value; //в значение имени на странице записываем значение из первого поля//
  profileAbout.textContent = profileInputAbout.value; //в значение био на странице записываем значение из второго поля//
}
editButton.addEventListener('click', editProfile);

closeButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', saveData);
