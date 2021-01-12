export default class CustomerInfoModel {
  constructor() {
    this.userData = {
      name: '',
      phone: '',
      email: '',
    };
    this.patterns = {
      name: /[a-zA-Z ]{2,}/,
      phone: /[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/,
      email: /@[a-z]{3,5}\.[a-z]{2,3}/,
    };
  }

  getPatterns() {
    return this.patterns;
  }

  getUserData() {
    return this.userData;
  }

  setUserData(type, value) {
    this.userData[type] = value;
  }

  validateUserData() {
    const patterns = this.getPatterns();
    const userData = this.getUserData();
    const res = Object.entries(userData).map(([type, value]) => [type, patterns[type].test(value)]);
    return res;
  }
}