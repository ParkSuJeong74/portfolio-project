import React from "react"
import Style from "../App.module.css"

function Loading() {
  return (
    <div class={Style.loading}>
      <img src="loading_logo.png" alt="loading_logo" />
      <div class={Style.loadingText}>
        <img src="loading_text.png" alt="loading_text" />
      </div>
    </div>
  )
}

export default Loading
