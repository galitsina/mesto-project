export class Popup {
  constructor(selector) {
    this.selector = selector;
    this.popupElement = document.querySelector(this.selector); //разметка попапа
  }

  open() {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if ((evt.key === 'Escape')) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this.popupElement.querySelector('.popup__close-icon');
    // const thisPopup = this; //объявляем константу для передачи в addEventListener, т.к this внутри теряет контекст
    closeButton.addEventListener('click', () => this.close());

    //клик на оверлей - закрытие попапа
    this.popupElement.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}
