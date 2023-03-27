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

//функциональность открытия окон
export function openPopup(domElement) {
  domElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWhenEsc);
}

//функциональность закрытия окон
export function closePopup(domElement) {
  domElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWhenEsc);
}

export function initPopupCloseListeners(closeButtonSelector, popupSelector) {
  const popups = document.querySelectorAll(popupSelector);
  const closeButtons = document.querySelectorAll(closeButtonSelector);
  //обходим каждый элемент массива кнопок closeButtons
  closeButtons.forEach(function (item) {
    //на каждый элемент вешаем слушатель клика с параметром, содержащим произошедшее событие
    item.addEventListener('click', function (evt) {
      const parentPopup = evt.target.closest(popupSelector);
      //удалаяем класс открытого окна у родителя кнопки closeButtons
      closePopup(parentPopup);
    });
  });

  //клик на оверлей - закрытие попапа
  popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
      if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
      }
    });
  });
}

//нажатие на esc - закрытие попапа
function closePopupWhenEsc(evt) {
  if (evt.key === 'Escape') {
    const anyOpenedPopup = document.querySelector('.popup_opened');
    closePopup(anyOpenedPopup);
  }
}
