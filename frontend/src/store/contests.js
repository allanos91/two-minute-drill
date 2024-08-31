import { csrfFetch } from "./csrf";

const LOAD_CONTESTS = "contests/LOAD_CONTESTS"

const load = (data, type, id) => ({
    type,
    data,
    id
})

const initialState = {}

export const getContests = () => async dispatch => {
    const response = await fetch('/api/contests')
    const data = await response.json();
    dispatch(load(data, LOAD_CONTESTS))
    return data
}

const contestReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CONTESTS: {
            const newContests = {}
            action.data.Contests.forEach(contest => {
                newContests[contest.id] = contest
            })
            return {
                ...state,
                ...newContests
            }
        }
        default:
            return state;
    }
}

export default contestReducer
