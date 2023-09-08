const TOKEN = 'user_token';

export function setToken(value: string) {
  localStorage.setItem(TOKEN, value);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}
