export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "ADD":
      return [...state, action.payload]
    case "EDIT":
      return state.map((category) =>
        category.id === action.payload.id ? action.payload : category,
      )
    case "DELETE":
      return state.filter((category) => category !== action.payload)
    default:
      return state
  }
}

export const articleReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "ADD":
      return [...state, action.payload]
    case "EDIT":
      return state.map((article) =>
        article.id === action.payload.id ? action.payload : article,
      )
    case "DELETE":
      return state.filter((article) => article !== action.payload)
    default:
      return state
  }
}

export const commentReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "ADD":
      return [...state, action.payload]
    case "EDIT":
      return state.map((comment) =>
        comment.id === action.payload.id ? action.payload : comment,
      )
    case "DELETE":
      return state.filter((comment) => comment !== action.payload)
    default:
      return state
  }
}
