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

  hideInputError(inputElement) {
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
      this.hideInputError(inputElement)
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
    const formValidatorThis = this; //объявляем константу для передачи в forEach, т.к this внутри теряет контекст и становится разметкой инпута

    this._toggleButtonState(inputs, buttonElement);
    inputs.forEach(function (inputElement) {
      inputElement.addEventListener('input', function () {
        formValidatorThis._checkInputValidity(inputElement);
        formValidatorThis._toggleButtonState(inputs, buttonElement);
      });
    });
  }
}

function showInputError(formElement, inputElement, errorMesage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMesage;
  errorElement.classList.add(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputs, buttonElement, config) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListener(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, buttonElement, config);
  inputs.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputs, buttonElement, config);
    });
  });
}

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(function (formElement) {
    setEventListener(formElement, config);
  });
}

