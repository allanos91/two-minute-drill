import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { getContestDetails } from "../../store/contests"
import EnableFormatPrediction from "../../../utils/enabledUtils"



const SubmitPrediction = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {contestId} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [values, setValues] = useState("")

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
        console.log("FLAG")
        return
    }

    const handleValues = (e) => {
        console.log(e.target.value)
    }

    if (isLoaded && details.predictions) {
        return (
            <div className="contest-block">
                <div className="contest-header">
                <p className="contest-header-elements">{details.description}</p>
                <p className="contest-header-elements">{details.closing_date}</p>
                </div>
                <form className="submission-form" onSubmit={handleSubmit}>
                {details.predictions.map(prediction => {
                    return (
                        <EnableFormatPrediction type={prediction.type} content={prediction.content} onChange={handleValues}/>
                    )
                })}
                <div>
                <button className="submit-button">Submit</button>
                </div>
                </form>
            </div>

        )
    }

    return (
        <h1>test</h1>
    )
}

export default SubmitPrediction
