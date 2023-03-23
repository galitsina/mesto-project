export class UserInfo {
  constructor(nameSelector, aboutSelector, api) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
    this._api = api;
  }
  //публичный метод, который возвращает объект с полученными от сервера данными. Подставить в форму при открытии
  getUserInfo() {
    return this._api
      .getUserInfo()
      .then((res) => {
        const user = {};
        user.name = res.name;
        user.about = res.about;
        return user;
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
  setUserInfo(name, about) {
    this._api
      .editProfile(name, about)
      .then((res) => {
        document.querySelector(this.nameSelector).textContent = res.name;
        document.querySelector(this.aboutSelector).textContent = res.about;
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

const UserInfo = new UserInfo('.profile__name', '.profile__bio', api)
