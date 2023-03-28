import './pages/index.css';
import {
  validationConfig,
  cardsContainer,
  avatar,
  editButton,
  addButton,
  editAvatarButton,
  formEditProfile,
  formAddCard,
  formEditAvatar
} from './utils/constants.js';
import { PopupWithImage } from './components/PopupWithImage';
import { PopupWithForm } from './components/PopupWithForm';
import { Api } from './components/Api';
import { UserInfo } from './components/UserInfo';
import { Card } from './components/Card';
import { Section } from './components/Section';
import { FormValidator } from './components/FormValidator';

let userId;

const popupWithImage = new PopupWithImage('.popup_open-image');
popupWithImage.setEventListeners();

const handleCardClick = (link, name) => {
  popupWithImage.open(link, name);
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
})

function addLike(card) {
  api.putLike(card._id)
    .then((res) => {
      card.addLike(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(card) {
  api.deleteLike(card._id)
    .then((res) => {
      card.deleteLike(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

const apiDeleteCard = (evt, id) => {
  api.deleteCard(id).then(() => {
    evt.target.closest('.element').remove();
  })
    .catch((err) => {
      console.log(err);
    })
}

const userInfo = new UserInfo('.profile__name', '.profile__bio', '.profile__avatar');

function createCard(card) {
  const newCard = new Card(card,
    '#element-template',
    deleteLike,
    addLike,
    apiDeleteCard,
    handleCardClick,
    userInfo._id
  ).generate();
  return newCard;
}

const renderer = (card) => {
  const domCard = createCard(card);
  cardsList.setItem(domCard);
}

const cardsList = new Section({
  items: [],
  //функция-колбэк. Вызывает для каждой карточки, полученной с сервера, метод класса Card,
  // генерирующий карточку, и вставляет каждую карточку методом класса Section setItem в разметку
  renderer: renderer,
},
  cardsContainer //селектор контейнера с карточками
);

export function loadInitialCards() {
  Promise.all([api.getCards(), api.getUserInformation()])
    .then((promises) => {
      const cardsArray = promises[0].reverse();
      const userInformation = promises[1];

      userId = userInformation.id;
      userInfo.setUserInfo({
        name: userInformation.name,
        about: userInformation.about,
        avatar: userInformation.avatar,
        _id: userInformation._id
      });
      cardsList.items = cardsArray;
      cardsList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
}

loadInitialCards();

const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

const popupEditProfile = new PopupWithForm('.popup_edit-form',
  (evt, inputValues) => {
    popupEditProfile.renderLoading(true);
    api.editProfile(inputValues.name, inputValues.about)
      .then((user) => {
        userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar, _id: user._id });
        popupEditProfile.close(); //при нажатии на кнопку "сохранить" закрываем попап
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      // возвращаем обратно начальный текст кнопки
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
)
editButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  const popupData = { name: user.name, about: user.about };
  popupEditProfile.open(popupData);
});

formValidators['editprofile'].enableValidation();
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add-form',
  (evt, inputValues) => {
    popupAddCard.renderLoading(true, 'Создание...')
    api.postCard(inputValues.title, inputValues.link).then((card) => {
      const newCard = createCard(card);
      cardsList.setItem(newCard);
      popupAddCard.close(); //при нажатии на кнопку "создать" закрываем попап
    })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
)
addButton.addEventListener('click', () => popupAddCard.open());
formValidators['addcard'].enableValidation();
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar',
  (evt, inputValues) => {
    popupEditAvatar.renderLoading(true);
    api.editAvatar(inputValues.avatarlink).then((user) => {
      userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar, _id: user._id });
      popupEditAvatar.close();
    })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      });
  }
)
editAvatarButton.addEventListener('click', () => popupEditAvatar.open())
formValidators['addcard'].enableValidation();
popupEditAvatar.setEventListeners();
