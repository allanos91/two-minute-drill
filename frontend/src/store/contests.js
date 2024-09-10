import { csrfFetch } from "./csrf";

const LOAD_CONTESTS = "contests/LOAD_CONTESTS"
const LOAD_CONTEST_DETAILS = "contests/LOAD_CONTEST_DETAILS"
const CREATE_CONTEST = "contests/CREATE_CONTEST"

const load = (data, type, id) => ({
    type,
    data,
    id
})

const add = (data, type) => ({
    type,
    data
})

const initialState = {
    all: {},
    details: {}
}

export const getContests = () => async dispatch => {
    const response = await fetch('/api/contests')
    const data = await response.json();
    dispatch(load(data, LOAD_CONTESTS))
    return data
}

export const getContestDetails = (id) => async dispatch => {
    const response = await fetch(`/api/contests/${id}`)
    const data = await response.json()
    dispatch(load(data, LOAD_CONTEST_DETAILS, id))
    return data
}

export const addContest = (payload) => async dispatch => {
    const response = await csrfFetch('/api/contests', {
        method: "POST",
        headers: {
            'Content-Type':"application/json"
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json();

    dispatch(add(data, CREATE_CONTEST))
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
                all: {...newContests}
            }
        }
        case LOAD_CONTEST_DETAILS: {
            const newContestDetails = {...action.data.contest}
            return {
                ...state,
                details: newContestDetails
            }
        }
        case CREATE_CONTEST: {
            const createdContestDetails = {...action.data.contest}
            console.log(action.data)
            return {
                ...state,
                all: {...state.all, ...createdContestDetails}
            }
        }
        default:
            return state;
    }
}

export default contestReducer
