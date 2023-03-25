export class UserInfo {
  constructor(nameSelector, aboutSelector, getInfo, setInfo) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
    this._id;
    this.avatar;
    this._getInfo = getInfo;
    this._setInfo = setInfo;
  }

  getUserInfo() {
    return this._getInfo();
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
  setUserInfo(name, about) {
    this._setInfo(name, about, this.nameSelector, this.aboutSelector);
  }
}
