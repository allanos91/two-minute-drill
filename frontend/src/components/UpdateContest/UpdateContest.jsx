import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getPredictions, addPrediction } from "../../store/predictions"
import FormatPrediction from "../../../utils/utils"
import { updateContest, getContestDetails } from "../../store/contests"
import "./UpdateContest.css"



const UpdateContest = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [ouPoints, setOUPoints] = useState('')
    const [cTeam, setCTeam] = useState('')
    const [predictionArr, setPredictionArr] = useState([])
    const [week, setWeek] = useState('')
    const [weekArr] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])
    const [disabledWeek, setDisabledWeek] = useState(false)
    const [disabledOU, setDisabledOU] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [errors, setErrors] = useState({})
    const [hidden, setIsHidden] = useState(true)
    const [on, setOn] = useState("on")
    const contestId = useParams().contestId
    const [errMessage, setErrMessage] = useState("")




    const contestDetails = useSelector((state) => {
        return state.contests.details
    })

    const setValues = () => {
        if (contestPredictions) {
            {
                setPredictionArr(contestPredictions)
                setDescription(contestDetails.description)
                let dateArr = contestDetails.closing_date.split(', ')[0].split("/")
                let newDate = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
                let timeArr = contestDetails.closing_date.split(', ')[1].split(":")
                let newTime = `${timeArr[0]}:${timeArr[1]}`
                setDate(newDate)
                setTime(newTime)
            }
        }
    }

    useEffect(() => {
        dispatch(getPredictions())
        dispatch(getContestDetails(contestId))
        if (!isLoaded) {
            setIsLoaded(true)
            setPredictionArr([])
        }
        handleDisabled()
        handleDisabledOU()
        if (content && type) {
            handlePredictionArr()
            setWeek('')
        }

        if (!contestPredictions) {
            dispatch(getPredictions())
        }

        if (!contestDetails) {
            dispatch(getContestDetails(contestId))
        }
        let valError = {}

        if (!description || description.length < 30) {
            valError.description = "Description is required and must be 30 characters or more."
        }

        if (!predictionArr.length) {
            valError.predictions = "Must add at least 1 question to your contest."
        }

        if (!date || !time) {
            valError.date = "Please select a closing date and time for your contest."
        }

        if (date && time) {
            if (new Date(date + " " + time) < new Date()) {
                valError.date = "Selected date must be in the future."
            }
        }

        if (valError) {
            setErrors(valError)
        }
        if (contestDetails && on === "on") {
            setOn("off")
            setValues()
        }
    }, [dispatch, isLoaded, type, content, week, ouPoints, description, predictionArr, date, time])

    const questions = useSelector((state) => {
        return state.predictions.all
    })

    const filteredQuestions = questions.filter(q =>
        q.type.includes(type)
    )

    const contestPredictions = useSelector((state) => {
        return state.contests.details.predictions
    })

    const filteredWeeks = filteredQuestions.filter(q => {
        let qweek = q.content.split(' ')
        return qweek[qweek.length-2] + ' ' + qweek[qweek.length-1] === week
    })

    const extractTeamName = (content) => {
        const parts = content.split(' ');
        return parts[0]; // Assuming the team name is the first word
      };
      const filteredData = filteredWeeks.filter((item, index, self) => {
        const teamName = extractTeamName(item.content);
        return index === self.findIndex(t => extractTeamName(t.content) === teamName);
      });

    const handleSetTeam = (e) => {
        if (type === "win or lose") {
            let team = e.target.value
            setCTeam(team)
            return
        }

        if (type === "team points") {
            setCTeam(e.target.value)
        }

        if (type === "season record") {
            setCTeam(e.target.value)
        }

        if (type === "over/under") {
            setCTeam(e.target.value)
        }
    }



    const handlePredictionArr = async () => {
        setPredictionArr([...predictionArr, {type: type, content: content}])
        setContent('')
        setType('')
        setCTeam('')
        setWeek('')
    }



    const handleRemovePrediction = () => {
        predictionArr.pop()
        setPredictionArr([...predictionArr])
    }

    const handleDisabled = () => {
        if (type === "season record") {
            if (week !== '') {
                setWeek('')
            }
            if (ouPoints !== '') {
                setOUPoints('')
            }
            if (disabledWeek !== true) {
                setDisabledWeek(true)
            }
        } else {
            if (disabledWeek !== false) {
                setDisabledWeek(false)
                setCTeam('')
            }
        }
    }

    const handleDisabledOU = () => {
        if (type === "over/under") {
            if (disabledOU !== false) {
                setDisabledOU(false)
                setWeek('')
                setCTeam('')
            }
        } else {
            if (ouPoints !== '') {
                setOUPoints('')
            }
            if (disabledOU !== true) {
                setDisabledOU(true)
                setWeek('')
                setCTeam('')
            }
        }
    }

    const handleSetContent = async () => {

        if (!type) {
            setError("You must select an option for each step before adding a question.")
            return
        }

        if (type === "win or lose") {
            if (!cTeam || !week) {
                setError("You must select an option for each step before adding a question.")
                return
            }

            let team = cTeam.split(' vs ').join(' ')
            setContent(team + " " + week)
            setError('')
            return
        }
        if (type === "season record") {
            setContent(cTeam)
            return
        }

        if (type === "team points") {
            if (!cTeam || !week) {
                setError("You must select an option for each step before adding a question.")
                return
            }
            setError("")
            setContent(cTeam + " " + week)
        }

        if (type === "over/under") {
            if (!cTeam || !week || !ouPoints) {
                setError("You must select an option for each step before adding a question.")
                return
            }
            setError('')
            setContent(cTeam + " " + ouPoints + " " + week)
            dispatch(addPrediction({type: type, content: cTeam + " " + ouPoints + " " + week}))
        }

    }

    const handleErrorClass = () => {
        if (error) {
            return "error"
        } else {
            return "hidden error"
        }
    }

    const valErrors = () => {
        if (hidden) {
            return "error hidden"
        } else {
            return "error"
        }
    }



    const handleCreateContest = async () => {
        let arr = []

        if (Object.keys(errors).length) {
            setIsHidden(false)
            return
        }

        predictionArr.forEach(el => {
            let prediction = questions.filter(q => {
                return el.content === q.content
            })

            if (prediction[0]) {
                arr.push(prediction[0].id)
            }
        })

        const payload = {
            description: description,
            predictions: arr,
            closing_date: date + " " + time + ":00",
            price: price
        }


        let err = await dispatch(updateContest(contestId, payload))

        if (err) {
            setErrMessage(err.message)
            return
        }
        navigate('/contests/hosted-contests')
        return
    }


    if (isLoaded && contestDetails) {
        return (
            <>
            <div className="container">
            <section>
            <div className="instructions">
            <p>Step 1: Choose the type of prediction down below</p>
            <div className="form-group">
            <label> 1. Choose a question type: </label>
            <select onChange={(e) => setType(e.target.value)} value={type}>
                <option>Types</option>
                <option>win or lose</option>
                <option>season record</option>
                <option>team points</option>
                <option>over/under</option>
            </select>
            </div>
            <p>Step 2: If you chose any type besides season record, choose the week your prediction takes place.</p>
            <div className="form-group">
            <label>2. Select week if applicable: </label>
            <select onChange={(e) => setWeek(e.target.value)} disabled={disabledWeek} value={week}>edfkljygjh
                <option>N/A</option>
                {weekArr.map(week => {
                    return (
                        <option key={`tpapsnaeid${week}`}>week {week}</option>
                    )
                })}
            </select>
            </div>
            <p>Step 3: Choose the team or teams</p>
            <div className="form-group">
            <label>3. Select team or teams</label>
            <select onChange={handleSetTeam} value={cTeam}>
                <option>N/A</option>
                {filteredData.map(question => {
                    let arr = question.content.split(' ')
                    if (question.type === 'win or lose') {
                        return (
                            <option key={`bahhsdaad${question.id}`}>{arr[0]} vs {arr[1]}</option>
                        )
                    } else {
                        return (
                            <option key={`bahhcaaad${question.id}`}>{arr[0]}</option>
                        )
                    }

                })}
                {filteredQuestions.map(question => {
                    let arr = question.content.split(' ')
                    if (question.type === 'season record') {
                        return (
                            <option key={`nasjhcbadf${question.id}`}>{arr[0]}</option>
                        )
                    }
                })}
            </select>
            </div>
            <p>Step 4: If you chose over/under, set the line. Then hit &apos;Add Question&apos;</p>
            <div className="form-group">
            <label>4. Over/Under Line</label>
            <input type="integer" disabled={disabledOU} onChange={(e) => setOUPoints(e.target.value)} value={ouPoints} className="over-under-points"/>
            </div>
            <div className={handleErrorClass()}>{error}</div>
            <p>Step 5: Click Add Question</p>
            <div className="form-group">
            <button onClick={handleSetContent}>Add question</button>
            </div>
            <p>Step 6: Repeat steps 1-5 for more questions!</p>
            <p>Step 7: When you are done adding questions, set an entry fee and closing date of the contest.</p>
            <div className="form-group">
                <label>Description: </label>
                <textarea id= "textarea"value={description} onChange={(e) => setDescription(e.target.value)}/>
                <div className={valErrors()}>{errors.description}</div>
            </div>
            <div className="form-group">
                <label>Entry fee:</label>
                <select onChange={(e) => setPrice(e.target.value)} value={price}>
                    <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>100</option>
            </select>
            </div>
            <div className="form-group">
                <label>Closing date: </label>
                <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
                <input type="time" onChange={(e) => setTime(e.target.value)} value={time}/>
                <div className={valErrors()}>{errors.date}</div>
            </div>
            <p>Step 7: Create Contest!</p>
                    <button onClick={handleCreateContest}>Save Changes</button>
                    <div className="error">{errMessage}</div>
            </div>
            </section>

            <section className="predictions">
            {predictionArr.map(prediction => {
                return <FormatPrediction type={prediction.type} content={prediction.content} key={`nabchshda%${prediction.id}`}/>
            })}
            <button onClick={handleRemovePrediction}>Remove question</button>
            </section>
            </div>
            </>
        )
    }
    else {
        return <h1>LOADING</h1>
    }
}


export default UpdateContest
