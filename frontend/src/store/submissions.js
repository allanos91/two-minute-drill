import { csrfFetch } from "./csrf";

const LOAD_SUBMISSIONS = "submissions/LOAD_SUBMISSIONS"

const load = (data, type, id) => ({
    type,
    data,
    id
})

const initialState = {
    mySubmissions: [],
    all: []
}

export const getMySubmissions = () => async dispatch => {
    const response = await fetch('/api/submissions')
}
