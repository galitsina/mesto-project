import { Popup } from './Popup';
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this.handleSubmit = handleSubmit;
    this.popupForm = this.popupElement.querySelector('.popup__input-container');
  }

  _getInputValues() {
    const inputs = this.popupForm.elements;//массив инпутов
    let inputsValue = {} // объект значений инпутов
    for (let i = 0; i < inputs.length; i++) {
      inputsValue[inputs[i].name] = inputs[i].value;
    }
    return inputsValue;
  }

  setEventListeners() {
    this.popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmit(evt, this._getInputValues())
    })
    super.setEventListeners();
  }

  close() {
    this.popupForm.reset();
    super.close();
  }
}
