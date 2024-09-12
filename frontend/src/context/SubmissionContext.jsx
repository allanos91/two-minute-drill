import { createContext, useState, useContext} from 'react'

const SubmissionContestArray = createContext();

export function SubmissionContestArrayProvider({children}) {
    const [arr, setArr] = useState([])

    const contextValue = {
        arr,
        setArr
    }

    return (
        <SubmissionContestArray.Provider value = {contextValue}>
            {children}
        </SubmissionContestArray.Provider>
    )
}

export const useSubmissionContestArray = () => useContext(SubmissionContestArray)
