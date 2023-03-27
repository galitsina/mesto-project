import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(link, name) {
    this.popupElement.querySelector('.popup__view-image').src = link;
    this.popupElement.querySelector('.popup__view-caption').textContent = name;
    this.popupElement.querySelector('.popup__view-image').alt = name;
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
