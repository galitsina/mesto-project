import './pages/index.css';
import { validationConfig, cardsContainer, profileName, profileAbout, avatar, renderLoading, editButton, addButton, editAvatarButton, formEditProfile, formAddCard, formEditAvatar } from './utils/constants.js';
import { PopupWithImage } from './components/PopupWithImage';
import { PopupWithForm } from './components/PopupWithForm';
import { Api } from './components/Api';
import { UserInfo } from './components/UserInfo';
import { Card } from './components/Card';
import { Section } from './components/Section';
import { FormValidator } from './components/FormValidator';
import { newPlaceAddButton, avatarEditButton } from './utils/constants.js';

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

const apiDeleteLike = (evt, userId, domLike) => {
  api.deleteLike(userId)
    .then((res) => {
      domLike.textContent = res.likes.length;
      evt.target.classList.remove('element__like-button_active');
    })
    .catch((err) => {
      console.log(err);
    })
}

const apiPutLike = (evt, id, domLike) => {
  api.putLike(id).then((res) => {
    domLike.textContent = res.likes.length;
    evt.target.classList.add('element__like-button_active');
  })
    .catch((err) => {
      console.log(err);
    })
}

const apiDeleteCard = (evt, id) => {
  api.deleteCard(id).then(() => {
    evt.target.closest('.element').remove();
  })
    .catch((err) => {
      console.log(err);
    })
}

const userInfo = new UserInfo('.profile__name', '.profile__bio', () => {
  return api.getUserInformation()
    .then((res) => {
      const user = {};
      user.name = res.name;
      user.about = res.about;
      user.id = res._id;
      user.avatar = res.avatar;
      return user;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
}, (name, about, nameSelector, aboutSelector) => {
  return api.editProfile(name, about)
    .then((res) => {
      document.querySelector(nameSelector).textContent = res.name;
      document.querySelector(aboutSelector).textContent = res.about;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
})

function createCard(card) {
  const newCard = new Card(card,
    '#element-template',
    apiDeleteLike,
    apiPutLike,
    apiDeleteCard,
    handleCardClick,
    userId
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
  '.elements' //селектор контейнера с карточками
);

export function loadInitialCards() {
  Promise.all([api.getCards(), userInfo.getUserInfo()])
    .then((promises) => {
      const cardsArray = promises[0].reverse();
      const userInformation = promises[1];
      userId = userInformation.id;

      profileName.textContent = userInformation.name;
      profileAbout.textContent = userInformation.about;
      avatar.src = userInformation.avatar;
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
editButton.addEventListener('click', () => popupEditProfile.open());
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
formValidatorAddCard.enableValidation();
popupEditProfile.setEventListeners()




// addButton.addEventListener('click', openAddCard);


const popupAddCard = new PopupWithForm('.popup_add-form',
  (evt, inputValues) => {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, 'Создание');
    api.postCard(inputValues.title, inputValues.link).then((card) => {
      const newCard = createCard(card);
      cardsList.setItem(newCard);
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
  }
)

newPlaceAddButton.addEventListener('click', () => popupAddCard.open());

const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
formValidatorEditProfile.enableValidation();
popupAddCard.setEventListeners();

// editAvatarButton.addEventListener('click', openEditAvatar);
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

avatarEditButton.addEventListener('click', () => popupEditAvatar.open())
const formValidatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);
formValidatorEditAvatar.enableValidation();
popupEditAvatar.setEventListeners();


