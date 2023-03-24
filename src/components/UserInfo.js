import { api } from "./cards";

export class UserInfo {
  constructor(nameSelector, aboutSelector, getInfo, setInfo) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
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

const userInfo = new UserInfo('.profile__name', '.profile__bio', () => {
  return api.getUserInformation()
    .then((res) => {
      const user = {};
      user.name = res["name"];
      user.about = res["name"];
      return user;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
}, (name, about, nameSelector, aboutSelector) => {
  api.editProfile(name, about)
    .then((res) => {
      document.querySelector(nameSelector).textContent = res["name"];
      document.querySelector(aboutSelector).textContent = res["about"];
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
})

userInfo.getUserInfo().then((res) => console.log(res));
