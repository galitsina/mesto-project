export class Popup {
  constructor(selector) {
    this.selector = selector;
    this.popupElement = document.querySelector(this.selector); //разметка попапа
    this._handleEscClose = this._handleEscClose.bind(this); //привязываем постоянную ссылку на стрелочную функцию
  }

  open() {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); //передаем только ссылку на функцию
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
