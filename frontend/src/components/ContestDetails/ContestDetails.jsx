import { useSelector, useDispatch } from "react-redux";
import { getContestDetails } from "../../store/contests";
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import FormatPrediction  from "../../../utils/utils";
import './ContestDetails.css'


const ContestDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [err, setErr] = useState("")
    const id = useParams().contestId

    useEffect(() => {
        dispatch(getContestDetails(id))
        if (!isLoaded) {
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded])

    const details = useSelector((state) => {
        return state.contests.details
    })
    const user = useSelector(state => state.session.user)

    const handleEnterSubmission = () => {
        if (!user) {
            setErr("Please Log in or Sign up before entering a submission")
            return
        }
        if (details.price > user.balance) {
            setIsHidden(false)
            return
        }


        navigate(`/submissions/${id}`)
    }

    const errorClassName = () => {
        if (isHidden) {
            return "error hidden"
        } else {
            return "error"
        }
    }

    if (isLoaded && details.predictions) {
        return (
            <>
            <div className="contest-block">
                <div className="contest-header">
                <p className="contest-header-elements">{details.description}</p>
                <p className="contest-header-elements">{details.closing_date}</p>
                </div>

                {details.predictions.map(prediction => {
                    return (
                        <FormatPrediction type={prediction.type} content={prediction.content} key={`asdnszksfannasldfn${prediction.id}`}/>
                    )
                })}
            </div>
            <p className={errorClassName()}>Insufficient funds</p>
            <div className="button-container">
            <button className="enter-submission" onClick={handleEnterSubmission}>Enter a submission</button>
            </div>
            <p className="error enter-sub">{err}</p>

            </>
        )
    } else {
        return (
            <p>Test</p>
        )
    }

}


export default ContestDetails
