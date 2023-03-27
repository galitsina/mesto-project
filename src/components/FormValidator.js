export class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMesage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMesage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputs, buttonElement) {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation() {
    const inputs = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this.formElement.addEventListener('reset', () => {
      inputs.forEach((inputElement) => { this._hideInputError(inputElement) })
    })

    this._toggleButtonState(inputs, buttonElement);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, buttonElement);
      });
    });
  }
}
