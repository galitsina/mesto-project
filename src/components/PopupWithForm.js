import { Popup } from './Popup';
import { FormValidator } from './FormValidator';
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, validationConfig) {
    super(selector);
    this.handleSubmit = handleSubmit;
    this.popupForm = this.popupElement.querySelector('.popup__input-container');
    this.formValidator = new FormValidator(validationConfig, this.popupForm);
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
    this.formValidator.enableValidation();
    super.setEventListeners();
  }

  close() {
    this.popupForm.reset();
    super.close();
    //спрятать элемент ошибки
    const formInputs = this.popupForm.elements;
    formInputs.forEach(function (inputElement) {
      this.formValidator.hideInputError(inputElement);
    })
  }
}
