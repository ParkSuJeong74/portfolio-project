import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-datepicker/dist/react-datepicker.css"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import Reducer from "./redux/reducer"

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(promiseMiddleware, ReduxThunk))
    : composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(Reducer, enhancer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
