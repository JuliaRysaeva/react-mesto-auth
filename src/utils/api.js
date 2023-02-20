const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'a8376a6a-c722-450c-a41c-6e86d0a979a4'
  }
}
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _getServerResult(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }
  //отображение карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._getServerResult(res))
  }
  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._getServerResult(res))
  }
  //инфо о пользователе
  setUserInfoApi(name, about) {
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about })
    })
      .then(res => this._getServerResult(res))
  }
  //добавление карточки
  addCardApi(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link })
    })
      .then(res => this._getServerResult(res))
  }
  //удаление карточки
  deleteCardApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getServerResult(res))
  }
  //смена аватара
  changeAvatarApi(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this._getServerResult(res))
  }
  //постановка лайка 
  addLikeApi(card) {
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getServerResult(res))
  }
  //удаление лайка
  deleteLikeApi(card) {
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getServerResult(res))
  }
  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this.deleteLikeApi(card)
    } else {
      return this.addLikeApi(card)
    }
  }
}
const api = new Api(configApi)
export default api
