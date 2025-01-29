import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getPredictions, addPrediction } from "../../store/predictions"
import FormatPrediction from "../../../utils/utils"
import { addContest } from "../../store/contests"
import "./CreateContest.css"


const CreateContest = () => {
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
    const [placeholder, setPlaceholder] = useState(['empty slot','empty slot','empty slot','empty slot','empty slot','empty slot','empty slot','empty slot','empty slot','empty slot'])
    const [isTen, setIsTen] = useState(false)
    //create array for each 'Type' of question
    const [winOrLoseData, setWinOrLoseData] = useState([])
    const [seasonRecordData, setSeasonRecordData] = useState([])
    const [teamPointsData, setTeamPointsData] = useState([])
    const [oUData, setOUData] = useState([])

    useEffect(() => {
        dispatch(getPredictions())
        if (!isLoaded) {
            setIsLoaded(true)
        }
        handleDisabled()
        handleDisabledOU()
        if (content && type) {
            handlePredictionArr()
            setWeek('')
        }
        let valError = {}

        if (!description || description.length < 4) {
            valError.description = "Contest name is required and must be 4 characters or more."
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
        if (predictionArr.length === 10 && !isTen) {
            setIsTen(true)
        }
    }, [dispatch, isLoaded, type, content, week, ouPoints, description, predictionArr, date, time])

    const questions = useSelector((state) => {
        return state.predictions.all
    })

    const handleReset = () => {
            setOUData([])
            setSeasonRecordData([])
            setTeamPointsData([])
            setWinOrLoseData([])
            setWeek('')
    }



    // const filteredQuestions = questions.filter(q =>
    //     q.type.includes(type)
    // )


    //first we will set the type. if type is season record

    const handleSetType = (e) => {
        handleReset()
        setType(e.target.value)
        const tType = e.target.value
        let filteredQuestions = questions.filter(q =>
            q.type.includes(tType)
        )
        if (tType === 'season record') {
            setSeasonRecordData(filteredQuestions)
        } else if (tType === 'win or lose') {
            setWinOrLoseData(filteredQuestions)
        } else if (tType === 'team points') {
            setTeamPointsData(filteredQuestions)
        } else if (tType === 'over/under') {
            filteredQuestions = questions.filter(q =>
                q.type.includes('season record')
            )
            setOUData(filteredQuestions)
        }
    }

    let key = 0

    const handleFilteredWeeks = (e) => {
        const filteredQuestions = questions.filter(q =>
            q.type.includes(type)
        )
        setWeek(e.target.value)
        const fWeek = e.target.value

        if (type === 'win or lose') {
            let data = filteredQuestions.filter(q => {
                let queek = q.content.split(' ')
                return queek[queek.length-2] + ' ' + queek[queek.length-1] === fWeek
            })
            console.log(data)
            setWinOrLoseData(data)
        } else if (type === "team points") {
            let data = filteredQuestions.filter(q => {
                let queek = q.content.split(' ')
                return queek[queek.length-2] + ' ' + queek[queek.length-1] === fWeek
            })
            setTeamPointsData(data)

        }  else if (type === "over/under") {
            //might need to add stuff here.
        }
    }

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
        placeholder.shift()
        setPlaceholder(placeholder)
        setContent('')
        setType('')
        setCTeam('')
        setWeek('')
    }

    const handleTenPredictions = () => {
        if (isTen) {
            return "hidden"
        } else {
            return ""
        }
    }

    const handleTenNotice = () => {
        if (isTen) {
            return "error"
        } else {
            return "hidden"
        }
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


        await dispatch(addContest(payload))
        navigate('/contests')
        return
    }



    if (isLoaded) {
        return (
            <>
            <div className="container">
            <section>
            <div className="instructions">
            <p>Step 1: Choose the type of prediction down below</p>
            <div className="form-group">
            <label> 1. Choose a question type: </label>
            <select onChange={(e) => handleSetType(e)} value={type}>
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
            <select onChange={handleFilteredWeeks} disabled={disabledWeek} value={week}>
                <option>N/A</option>
                {weekArr.map(week => {
                    return (
                        <option key={`akj123143xxzzzx,${key}`}>week {week}</option>
                    )
                })}
            </select>
            </div>
            <p>Step 3: Choose the team or teams</p>
            <div className="form-group">
            <label>3. Select team or teams</label>
            <select onChange={handleSetTeam} value={cTeam}>
                <option>N/A</option>
                {seasonRecordData.map(question => {
                    return <option>{question.content}</option>
                })
                }
                {
                    winOrLoseData.map(question => {
                        let contentArr = question.content.split(" ")
                        return <option>{contentArr[0]} vs {contentArr[1]}</option>
                    })
                }
                {
                    teamPointsData.map(question => {
                        let contentArr = question.content.split(" ")
                        return <option>{contentArr[0]}</option>
                    })
                }
                {
                    oUData.map(question => {
                        let contentArr = question.content.split(" ")
                        return <option>{contentArr[0]}</option>
                    })
                }
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
            <button onClick={handleSetContent} className={handleTenPredictions()}>Add question</button>
            </div>
            <div className={handleTenNotice()}>You have reached the 10 question limit</div>
            <p>Step 6: Repeat steps 1-5 for more questions!</p>
            <p>Step 7: When you are done adding questions, set an entry fee and closing date of the contest.</p>
            <div className="form-group">
                <label>Contest Name: </label>
                <input id= "textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
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
                    <button onClick={handleCreateContest}>Create Contest</button>

            </div>
            </section>

            <section className="predictions predictions-margin">
            {predictionArr.map(prediction => {
                key += 1
                return <FormatPrediction type={prediction.type} content={prediction.content} key={`abjhxchjsdfk${key}`}/>
            })}
            {placeholder.map(el => {
                    return (
                        <div className="placeholder-box"> {el} </div>
                    )
                })}
            </section>
            </div>

            </>
        )
    }
    else {
        return <h1>LOADING</h1>
    }

}

export default CreateContest
