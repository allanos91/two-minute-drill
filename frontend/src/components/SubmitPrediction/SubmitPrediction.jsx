import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { getContestDetails } from "../../store/contests"
import { useSubmissionContestArray } from "../../context/SubmissionContext"
import EnableFormatPrediction from "../../../utils/enabledUtils"
import { addSubmission } from "../../store/submissions"



const SubmitPrediction = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {contestId} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const {arr} = useSubmissionContestArray()
    const [err, setErr] = useState('')

    useEffect(() => {
        dispatch(getContestDetails(contestId))
        if (!isLoaded) {
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded])

    const details = useSelector((state) => {
        return state.contests.details
    })



    const handleSubmit = async(e) => {
        e.preventDefault()
        let length = details.predictions.length

        let contentArr = []

        for (let i = 1; i <= length; i++) {
            if (arr[i]['team1'] !== undefined) {
                contentArr.push(`${arr[i]['team1']}` + " " + `${arr[i]['team2']}`)
            }
            if (arr[i]['win'] !== undefined) {
                contentArr.push(`${arr[i]['win']}` + " " + `${arr[i]['lose']}`)
            }
            if (arr[i]['points'] !== undefined) {
                contentArr.push(`${arr[i]['points']}`)
            }
            if (arr[i]['over/under'] !== undefined) {
                contentArr.push(`${arr[i]['over/under']}`)
            }
        }
        const payload = {
            content: contentArr.join(', ')
        }
        const returnMessage = await dispatch(addSubmission(payload, contestId))
        if (returnMessage.message) {
            setErr(returnMessage.message)
            return
        }
        navigate('/contests/hosted-contests')

        return
    }



    let count = 0

    if (isLoaded && details.predictions) {
        return (
            <div className="contest-block">
                <div className="contest-header">
                <p className="contest-header-elements">{details.description}</p>
                <p className="contest-header-elements">{details.closing_date}</p>
                </div>
                <form className="submission-form" onSubmit={handleSubmit}>
                {details.predictions.map(prediction => {
                    count += 1
                    return (
                        <EnableFormatPrediction type={prediction.type} content={prediction.content} count={count} key={`bahshjxxx,a${count}`}/>
                    )
                })}
                <button className="submit-button">Submit</button>
                </form>
                <p className="error">{err}</p>
            </div>

        )
    }

    return (
        <h1>test</h1>
    )
}

export default SubmitPrediction
