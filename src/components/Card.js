export class Card {
  constructor(data, selector, deleteLike, addLike, apiDeleteCard, handleCardClick, userId) {
    this.image = data.link; //данные с сервера о ссылке на изображение
    this.name = data.name; //данные с сервера об имени карточки
    this._selector = selector; //селектор контейнера куда вставлять карточки
    this._likes = data.likes; //данные с сервера о лайках на карточках
    this._id = data._id; //данные с сервера об id карточки
    this.userId = userId;
    this._ownerId = data.owner._id; ////данные с сервера об id владельца карточки
    this.apiDeleteLike = deleteLike; // функция deleteLike с сервера,принимает 1 параметр, возвращает промис
    this.apiPutLike = addLike; //функция putLike с сервера
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
    this._cardImage = this._element.querySelector('.element__image');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._trashButton = this._element.querySelector('.element__trash-button');
    this._setEventListeners();

    // Добавим данные - картинка, название, количество лайков
    this._cardImage.src = this.image;
    this._cardImage.alt = this.name;
    this._element.querySelector('.element__title').textContent = this.name;
    this._likeCounter.textContent = this._likes.length;

    if (this._likes.some(obj => obj._id == this.userId)) {
      this._likeButton.classList.add('element__like-button_active');
    }
    //если карточку создал не пользователь, на ней нет иконки удаления
    if (this._ownerId !== this.userId) {
      this._trashButton.remove();
    }

    // Вернём элемент в качестве результата работы метода
    return this._element;
  }

  addLike(res) {
    this._likeCounter.textContent = res.likes.length;
    this._likeButton.classList.add('element__like-button_active');
  }

  deleteLike(res) {
    this._likeCounter.textContent = res.likes.length;
    this._likeButton.classList.remove('element__like-button_active');
  }

  _handleClickLike() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this.apiDeleteLike(this);
    } else {
      this.apiPutLike(this);
    }
  }

  _handleClickDelete(evt) {
    this.apiDeleteCard(evt, this._id)
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleClickLike(this);
    });
    this._trashButton.addEventListener('click', (evt) => {
      this._handleClickDelete(evt);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.image, this.name);
    });
  }
}
