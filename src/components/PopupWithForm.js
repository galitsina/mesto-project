import { Popup } from './Popup';
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this.handleSubmit = handleSubmit;
    this.popupForm = this.popupElement.querySelector('.popup__input-container');
    this.inputs = this.popupForm.elements;//массив инпутов
  }

  //метод open принимает объект - значение полей по умолчанию
  open(pageData) {
    if (pageData) {
      const pageDataKeys = Object.keys(pageData);
      console.log(pageDataKeys)
      pageDataKeys.forEach((key) => {
        this.inputs[key].value = pageData[key];
      })
    }
    super.open();
  }

  _getInputValues() {
    let inputsValue = {} // объект значений инпутов
    for (let i = 0; i < this.inputs.length; i++) {
      inputsValue[this.inputs[i].name] = this.inputs[i].value;
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
