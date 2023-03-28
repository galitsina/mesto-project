import './pages/index.css';
import {
  validationConfig,
  cardsContainer,
  profileName,
  profileAbout,
  avatar,
  renderLoading,
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

// const apiDeleteLike = (evt, userId, domLike) => {
//   api.deleteLike(userId)
//     .then((res) => {
//       domLike.textContent = res.likes.length;
//       evt.target.classList.remove('element__like-button_active');
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

// const apiPutLike = (card) => {
//   api.putLike(id).then((res) => {
//     domLike.textContent = res.likes.length;
//     evt.target.classList.add('element__like-button_active');
//   })
//     .catch((err) => {
//       console.log(err);
//     })
// }
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

const popupEditProfile = new PopupWithForm('.popup_edit-form',
  (evt, inputValues) => {
    // универсально получаем кнопку сабмита из `evt`
    const submitButton = evt.submitter;
    // записываем начальный текст кнопки до вызова запроса
    const initialText = submitButton.textContent;
    // изменяем текст кнопки до вызова запроса
    renderLoading(true, submitButton, initialText, 'Сохранение...');

    userInfo.setUserInfo(inputValues.name, inputValues.about).then((user) => {
      popupEditProfile.close(); //при нажатии на кнопку "сохранить" закрываем попап
    })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      // возвращаем обратно начальный текст кнопки
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  }
)
editButton.addEventListener('click', () =>

  userInfo.getUserInfo().then((user) => {
    const popupData = { name: user.name, about: user.about }
    popupEditProfile.open(popupData);
  })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
);

const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
formValidatorAddCard.enableValidation();
popupEditProfile.setEventListeners();



const popupAddCard = new PopupWithForm('.popup_add-form',
  (evt, inputValues) => {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, 'Создание...');
    api.postCard(inputValues.title, inputValues.link).then((card) => {
      const newCard = createCard(card);
      cardsList.setItem(newCard);
      popupAddCard.close(); //при нажатии на кнопку "создать" закрываем попап
    })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  }
)
addButton.addEventListener('click', () => popupAddCard.open());
const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
formValidatorEditProfile.enableValidation();
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar',
  (evt, inputValues) => {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, 'Сохранение...');
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
  }
)
editAvatarButton.addEventListener('click', () => popupEditAvatar.open())
const formValidatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);
formValidatorEditAvatar.enableValidation();
popupEditAvatar.setEventListeners();
