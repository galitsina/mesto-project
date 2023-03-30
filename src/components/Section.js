export class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(selector);
  }

  //перебирает массив данных _items. Вызывает для каждого элемента массива функцию-колбэк _renderer
  renderItems() {
    this.items.forEach(item => this._renderer(item));
  }
  // принимает параметр element и добавляет его в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}
