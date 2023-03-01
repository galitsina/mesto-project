import { checkResponse } from './utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'ec7ecd53-86da-44fb-8b34-fdbecdd673ff',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export function getUserInformation() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

export function getCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

export function editProfile(profileName, profileAbout) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout //обновлённые данные пользователя
    })
  })
}

export function postCard(cardName, cardLink) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
}

export function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export function putLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
}

export function deleteLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export function editAvatar(avatarLink) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink //ссылка на новый аватар
    })
  })
}
