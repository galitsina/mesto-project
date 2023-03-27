export class Card {
  constructor(data, selector, apiDeleteLike, apiPutLike, apiDeleteCard, handleCardClick, userId) {
    this.image = data.link; //данные с сервера о ссылке на изображение
    this.name = data.name; //данные с сервера об имени карточки
    this._selector = selector; //селектор контейнера куда вставлять карточки
    this._likes = data.likes; //данные с сервера о лайках на карточках
    this._id = data._id; //данные с сервера об id карточки
    this.userId = userId;
    this._ownerId = data.owner._id; ////данные с сервера об id владельца карточки
    this.apiDeleteLike = apiDeleteLike; // функция deleteLike с сервера,принимает 1 параметр, возвращает промис
    this.apiPutLike = apiPutLike; //функция putLike с сервера
    this.apiDeleteCard = apiDeleteCard; //функция deleteCard с сервера
    this._handleCardClick = handleCardClick; //функция, которая вызывается при клике на карточку
  }

  _getElement() {
    const domCard = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return domCard;
  }

  generate() {
    // Запишем разметку в приватное поле _element
    // Так у других элементов появится доступ к ней
    this._element = this._getElement();
    this._setEventListenersLike(); // добавим обработчики
    this._setEventListenersDelete();
    this._setEventListenersPopupImage();

    // Добавим данные - картинка, название, количество лайков
    this._element.querySelector('.element__image').src = this.image;
    this._element.querySelector('.element__image').alt = this.name;
    this._element.querySelector('.element__title').textContent = this.name;
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;


    if (this._likes.some(obj => obj._id == this.userId)) {
      this._element.querySelector('.element__like-button').classList.add("element__like-button_active");
    }
    //если карточку создал не пользователь, на ней нет иконки удаления
    if (this._ownerId !== this.userId) {
      this._element.querySelector('.element__trash-button').remove();
    }

    // Вернём элемент в качестве результата работы метода
    return this._element;
  }

  _handleClickLike(evt) {
    const domLike = this._element.querySelector('.element__like-counter');
    if (evt.target.classList.contains('element__like-button_active')) {
      this.apiDeleteLike(evt, this._id, domLike);
    } else {
      this.apiPutLike(evt, this._id, domLike);
    }
  }
  _setEventListenersLike() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleClickLike(evt);
    });
  }

  _handleClickDelete(evt) {
    this.apiDeleteCard(evt, this._id)
  }
  _setEventListenersDelete() {
    this._element.querySelector('.element__trash-button').addEventListener('click', (evt) => {
      this._handleClickDelete(evt);
    });
  }

  _setEventListenersPopupImage() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this.image, this.name);
    });
  }

}
