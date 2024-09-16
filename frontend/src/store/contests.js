import { csrfFetch } from "./csrf";

const LOAD_CONTESTS = "contests/LOAD_CONTESTS"
const LOAD_CONTEST_DETAILS = "contests/LOAD_CONTEST_DETAILS"
const CREATE_CONTEST = "contests/CREATE_CONTEST"
const LOAD_HOSTED_CONTESTS = "contests/LOAD_HOSTED_CONTESTS"
const LOAD_PREDICTIONS_CONTESTS = "contests/LOAD_PREDICTIONS_CONTESTS"
const UPDATE_CONTEST = "contests/UPDATE_CONTESTS"
const DELETE_CONTEST = "contests/DELETE_CONTEST"

const load = (data, type, id) => ({
    type,
    data,
    id
})

const add = (data, type) => ({
    type,
    data
})

const remove = (id, type = DELETE_CONTEST) => ({
    id,
    type
})

const initialState = {
    all: {},
    details: {},
    hosted: {},
    userSubmissions: {}
}

export const getContests = () => async dispatch => {
    const response = await fetch('/api/contests')
    const data = await response.json();
    dispatch(load(data, LOAD_CONTESTS))
    return data
}

export const getHostedContests = () => async dispatch => {
    const response = await csrfFetch('/api/contests/current')
    const data = await response.json();
    dispatch(load(data, LOAD_HOSTED_CONTESTS))
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

export const getPredictionContests = () => async dispatch => {
    const response = await csrfFetch('/api/contests/user/submissions')
    const data = await response.json()
    dispatch(load(data,LOAD_PREDICTIONS_CONTESTS))
    return data
}

export const updateContest = (contestId, payload) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/contests/${contestId}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        dispatch(load(data, UPDATE_CONTEST))

    } catch (error) {
        return await error.json()
    }


    return
}

export const removeContest = (contestId) => async dispatch => {
    const response = await csrfFetch(`/api/contests/${contestId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const res = await response.json()
        dispatch(remove(contestId))
        return res
    }
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
            return {
                ...state,
                all: {...state.all, ...createdContestDetails}
            }
        }
        case LOAD_HOSTED_CONTESTS: {
            const newContests = {}
            action.data.Contests.forEach(contest => {
                newContests[contest.id] = contest
            })
            return {
                ...state,
                hosted: {...newContests}
            }
        }
        case LOAD_PREDICTIONS_CONTESTS: {
            const newContests = {}
            action.data.forEach(contest => {
                newContests[contest.id] = contest
            })
            return {
                ...state,
                userSubmissions: {...newContests}
            }
        }
        case UPDATE_CONTEST: {
            return
        }
        case DELETE_CONTEST: {
            return
        }
        default:
            return state;
    }
}

export default contestReducer
