import { csrfFetch } from "./csrf";

const LOAD_USERS = "users/LOAD_USERS"

const load = (data, type) => ({
    type,
    data
})

const initialState = {
    all: {}
}


export const getUsers = () => async dispatch => {
    const response = await fetch('/api/users')
    const data = await response.json()
    dispatch(load(data, LOAD_USERS))
    return data
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            const newUsers = {}
            action.data.Users.forEach(user => {
                newUsers[user.id] = user
            })
            return {
                ...state,
                all: {...newUsers}
            }
        }
        default:
            return state;
    }
}


export default userReducer
