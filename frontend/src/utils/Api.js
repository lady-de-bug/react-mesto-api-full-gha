class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  // getUserInfo(token) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: {
  //       ...this._headers,
  //       authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => this._checkResponse(res));
  // }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  editUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  changeAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.epkondrateva.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;
