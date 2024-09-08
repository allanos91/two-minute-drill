import { csrfFetch } from "./csrf";

const LOAD_PREDICTIONS = "predictions/LOAD_PREDICTIONS"

const load = (data, type, id) => ({
    type,
    data,
    id
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

const predictionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PREDICTIONS: {
            const predictions = [...action.data.Predictions]
            return {
                ...state,
                all: [...predictions]
            }
        }
        default:
            return state;
    }
}

export default predictionReducer
