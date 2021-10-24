const initialState = {
    data: "",
    loading: false
}

const userState = (state= initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_LOADING_USER':
                return {
                    ...state,
                    loading: action.payload
                }
        default:
           return state
    }
    
}

export default userState
