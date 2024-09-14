import { csrfFetch } from "./csrf";

const LOAD_SUBMISSIONS = "submissions/LOAD_SUBMISSIONS"
const CREATE_SUBMISSION = "submission/ADD_SUBMISSION"

const load = (data, type, id) => ({
    type,
    data,
    id
})

const add = (data, type, id) => ({
    type,
    data,
    id
})

const initialState = {
    mySubmissions: [],
    all: []
}

export const getMySubmissions = () => async dispatch => {
    const response = await csrfFetch('/api/submissions')
    const data = await response.json();
    dispatch(load(data, LOAD_SUBMISSIONS))
    return
}

export const addSubmission = (payload, id) => async dispatch => {

    try {
    const response = await csrfFetch(`/api/submissions/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

        const data = await response.json()
        dispatch(add(data, CREATE_SUBMISSION))
        return data
    } catch (error) {
        let returnErr = await error.json()
        return returnErr
    }
}

const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SUBMISSIONS: {
            return {
                ...state,
                mySubmissions: [...action.data]
            }
        }
        case CREATE_SUBMISSION: {
            const newPrediction = action.data
            return {
                ...state,
                mySubmissions: [...state.mySubmissions, newPrediction],
                all: [...state.all, newPrediction]
            }
        }
        default:
            return state;
    }
}


export default submissionReducer
