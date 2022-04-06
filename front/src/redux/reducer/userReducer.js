import { LOGIN_SUCCESS, LOGOUT } from "../action/types"

const initState = {
  user: null,
}
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("%c로그인!", "color: #d93d1a;")
      return {
        ...state,
        user: action.payload,
      }
    case LOGOUT:
      console.log("%c로그아웃!", "color: #d93d1a;")
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}
