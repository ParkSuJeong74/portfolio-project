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
            return [...state, { name, description}]
        case 'EDIT':
            return state.map((category) =>
                category.id === action.payload.id
                ? { name, description}
                : category
            )
        case 'DELETE':
            return state.filter((category) => category !== action.payload)
        default:
            return state
    }
}

export const articleReducer = (state, action) => {
    const {categoryName, author, title, description, hidden, authorName} = action.payload
    switch(action.type){
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, {categoryName, author, title, description, hidden, authorName}]
        case 'EDIT':
            return state.map((article) => 
                article.id === action.payload.id
                ? {categoryName, author, title, description, hidden, authorName}
                : article
            )
        case 'DELETE':
            return state.filter((article) => article !== action.payload)
        default:
            return state
    }
}

export const commentReducer = (state, action) => {
    const {writerId, writerName, comment, hidden} = action.payload
    switch(action.type){
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, { writerId, writerName, comment, hidden}]
        case 'EDIT':
            return state.map((comment) => 
                comment.id === action.payload.id
                ? { writerName, comment, hidden}
                : comment
            )
        case 'DELETE':
            return state.filter((comment) => comment !== action.payload)
        default:
            return state
    }
}
