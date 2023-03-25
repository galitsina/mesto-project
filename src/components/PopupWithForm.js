import { Popup } from './Popup.js';
import { userInfo } from './UserInfo.js'; //использовать в месте сборки

//перенести это в константы и сделать импорт
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileAbout = document.querySelector('.profile__bio'); //био профиля на странице
const avatar = document.querySelector('.profile__avatar');
const renderLoading = (isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}
const validationConfig = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__input-item-error_active'
}
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
})


export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, validationConfig) {
    super(selector);
    this.handleSubmit = handleSubmit;
    this.popupForm = this.popupElement.querySelector('.popup__input-container');
    this.formValidator = new FormValidator(validationConfig, this.popupForm);
  }

  _getInputValues() {
    const inputs = this.popupForm.elements;//массив инпутов
    let inputsValue = {} // объект значений инпутов
    for (let i = 0; i < inputs.length; i++) {
      inputsValue[inputs[i].name] = inputs[i].value;
    }
    return inputsValue;
  }

  setEventListeners() {
    this.popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmit(evt, this._getInputValues())
    })
    this.formValidator.enableValidation();
    super.setEventListeners();
  }

  close() {
    this.popupForm.reset();
    super.close();
    //спрятать элемент ошибки
    const formInputs = this.popupForm.elements;
    formInputs.forEach(function (inputElement) {
      this.formValidator.hideInputError(inputElement);
    })
  }

}


const popupEditProfile = new PopupWithForm('.popup_edit-form',
  (evt, inputValues) => {
    // универсально получаем кнопку сабмита из `evt`
    const submitButton = evt.submitter;
    // записываем начальный текст кнопки до вызова запроса
    const initialText = submitButton.textContent;
    // изменяем текст кнопки до вызова запроса
    renderLoading(true, submitButton, initialText, loadingText);

    userInfo.getUserInfo().then((user) => {
      profileName.textContent = user.name; //в значение имени на странице записываем значение из первого поля
      profileAbout.textContent = user.about; //в значение био на странице записываем значение из второго поля
      popupEditProfile.close(); //при нажатии на кнопку "сохранить" закрываем попап
    })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      // возвращаем обратно начальный текст кнопки
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  },
  validationConfig
)
//popupEditProfile.setEventListeners()


const popupAddCard = new PopupWithForm('.popup_add-form',
  (evt, inputValues) => {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, 'Создание');
    api.postCard(inputValues.title, inputValues.link).then((card) => {
      //добавляем карточку в дерево при нажатии кнопки 'Создать', здесь нужен объект Section
      // const domCard = createCard(card);
      // cardsContainer.prepend(domCard);
      popupAddCard.close(); //при нажатии на кнопку "создать" закрываем попап
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
  },
  validationConfig
  )

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar',
  (evt, inputValues) => {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);
    api.editAvatar(inputValues.avatarlink).then((profile) => {
      avatar.src = profile.avatar;
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
  },
  validationConfig
  )


  //обрати внимание, что здесь нет строк:
  // openedImage.src = link;
  // openedCaption.textContent = name;
  // openedImage.alt = name;
  //потому что эти присвоения уже есть в методе open()

  //и эту функцию передаем handleCardClick как параметр при создании объекта card, примерно так:
  const card = new Card(
    {},
    '#element-template',
    api.deleteLike,
    api.putLike,
    api.deleteCard,
    `userInformation._id`, //может этот id можно достать из объекта userInfo? если нет, то берем из api
    handleCardClick)
