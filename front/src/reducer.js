export function userReducer(userState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("%c로그인!", "color: #d93d1a;");
            return {
                ...userState,
                user: action.payload,
            };
        case "LOGOUT":
            console.log("%c로그아웃!", "color: #d93d1a;");
            return {
                ...userState,
                user: null,
            };
        default:
            return userState;
    }
}

export const categoryReducer = (state, action) => {
    const {userId, name, description} = action.payload
    switch(action.type){
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, { userId, name, description}]
        case 'EDIT':
            return state.map((category) =>
                category.id === action.payload.id
                ? {userId, name}
                : category
            )
        case 'DELETE':
            return state.filter((category) => category !== action.payload)
        default:
            return state
    }
}

export const articleReducer = (state, action) => {
    const {categoryName, author, title, description, hidden} = action.payload
    switch(action.type){
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, {categoryName, author, title, description, hidden}]
        case 'EDIT':
            return state.map((article) => 
                article.id === action.payload.id
                ? {categoryName, author, title, description, hidden}
                : article
            )
        case 'DELETE':
            return state.filter((article) => article !== action.payload)
        default:
            return state
    }
}

export const commentReducer = (state, action) => {
    const {writer, content, hidden} = action.payload
    switch(action.type){
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, { writer, content, hidden}]
        case 'EDIT':
            return state.map((comment) => 
                comment.id === action.payload.id
                ? { writer, content, hidden}
                : comment
            )
        case 'DELETE':
            return state.filter((comment) => comment !== action.payload)
        default:
            return state
    }
}
