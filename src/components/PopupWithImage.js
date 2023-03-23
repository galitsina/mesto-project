import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(link, name) {
    this.popupElement.src = link;
    this.popupElement.textContent = name;
    this.popupElement.alt = name;
    super.open();
  }
}
