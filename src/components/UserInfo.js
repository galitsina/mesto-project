export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
    this.avatarSelector = avatarSelector;
    this._id;
    this.nameElement = document.querySelector(this.nameSelector);
    this.jobElement = document.querySelector(this.aboutSelector);
    this.avatar = document.querySelector(this.avatarSelector)
  }

  //метод, который возвращает объект с полями текстовых значений имени и деятельности, подойдёт для вставки в форму
  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.jobElement.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = about;
    this.avatar.src = avatar;
    this._id = _id;
  }
}
