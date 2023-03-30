import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.popupImage = this.popupElement.querySelector('.popup__view-image');
    this.popupCaption = this.popupElement.querySelector('.popup__view-caption');
  }

  open(link, name) {
    this.popupImage.src = link;
    this.popupCaption.textContent = name;
    this.popupImage.alt = name;
    super.open()
  }
}
