import { LOGIN_SUCCESS, LOGOUT } from "./types"

export function login(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export function logout(user) {
  return {
    type: LOGOUT,
  }
}
