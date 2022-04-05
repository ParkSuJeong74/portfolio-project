import { combineReducers } from "redux"
import user from "./userReducer"
import category from "./categoryReducer"
import article from "./articleReducer"
import comment from "./commentReducer"

const rootReducer = combineReducers({
  user,
  category,
  article,
  comment,
})

export default rootReducer
