export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this.nameSelector = nameSelector
    this.aboutSelector = aboutSelector
  }
  //публичный метод, который возвращает объект с полученными от сервера данными. Подставить в форму при открытии
  getUserInfo() {
    return api.getUserInformation()
      .then((res) => {
        const user = {};
        user.name = res.name;
        user.info = res.about;
        return user;
      })
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
  setUserInfo(name, about) {
    api.editProfile(name, about)
      .then((res) => {
        this.nameSelector.textContent = res.name;
        this.aboutSelector.textContent = res.about;
      });
  }
}
