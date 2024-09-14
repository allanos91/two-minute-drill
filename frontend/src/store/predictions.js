import { csrfFetch } from "./csrf";

const LOAD_PREDICTIONS = "predictions/LOAD_PREDICTIONS"
const ADD_PREDICTION = "predictions/ADD_PREDICTIONS"

const load = (data, type, id) => ({
    type,
    data,
    id
})

const add = (data, type) => ({
    data,
    type
})

const initialState = {
    all: []
}

export const getPredictions = () => async dispatch => {
    const response = await fetch('/api/predictions')
    const data = await response.json()
    dispatch(load(data, LOAD_PREDICTIONS))
    return data
}

export const addPrediction = (predictionData) => async dispatch => {
    const response = await csrfFetch('/api/predictions', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(predictionData)
    })

    const data = await response.json();

    if (data.message) {
        return
    } else {
        dispatch(add(data, ADD_PREDICTION))
        return data
    }
}

const predictionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PREDICTIONS: {
            const predictions = [...action.data.Predictions]
            return {
                ...state,
                all: [...predictions]
            }
        }
        case ADD_PREDICTION: {
            return {
                ...state,
                all: [...state.all, action.data]
            }
        }
        default:
            return state;
    }
}

export default predictionReducer
