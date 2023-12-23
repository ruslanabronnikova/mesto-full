class ApiCard {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getAllCards() {
    return fetch(`${this._url}/allcards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

}

const apiCards = new ApiCard({
  url: 'https://api.bronnokovarsmesto.nomoreparties.co',
  // url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default apiCards;