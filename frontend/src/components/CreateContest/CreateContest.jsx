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
    const [weekArr, setWeekArr] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])
    const [disabledWeek, setDisabledWeek] = useState(false)
    const [disabledOU, setDisabledOU] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [toggleTeamPoints, setToggleTeamPoints] = useState(false)
    const [toggleWinLose, setToggleWinLose] = useState(false)

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

        if (type === "win or lose") {

        }
    }, [dispatch, isLoaded, type, content, week, ouPoints])

    const questions = useSelector((state) => {
        return state.predictions.all
    })

    const filteredQuestions = questions.filter(q =>
        q.type.includes(type)
    )



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
            setCTeam(team.split(' vs ').join(' '))
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
            }
        }
    }

    // const handleTeamPoints = () => {
    //     if (type === "team points") {
    //         if (toggleteampoints !== true) {

    //         }
    //     }
    // }

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
        if (type === "win or lose") {
            if (!cTeam || !week) {
                setError("You must select an option for each step before adding a question.")
                return
            }

            setContent(cTeam + " " + week)
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

    const handleCreateContest = async () => {
        let arr = []

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
            <p>Step 1: choose the type of prediction down below</p>
            <p>Step 2: If you chose any type besides season record, choose the week your prediction takes place.</p>
            <p>Step 3: Choose the team or teams</p>
            <p>Step 4: If you chose over/under, set the line</p>
            <p>Step 5: repeat steps 1-4 for more questions!</p>
            <p>Step 6: When you are done adding questions, set an entry fee and closing date of the contest.</p>
            <p>Step 7: Click Create Contest!</p>
            <label> 1. Choose a question type: </label>
            <select onChange={(e) => setType(e.target.value)} value={type}>
                <option>Types</option>
                <option>win or lose</option>
                <option>season record</option>
                <option>team points</option>
                <option>over/under</option>
            </select>

            <label>2. Select week if applicable: </label>
            <select onChange={(e) => setWeek(e.target.value)} disabled={disabledWeek} value={week}>edfkljygjh
                <option>N/A</option>
                {weekArr.map(week => {
                    return (
                        <option>week {week}</option>
                    )
                })}
            </select>
            <label>Select team or teams</label>
            <select onChange={handleSetTeam}>
                <option>N/A</option>
                {filteredData.map(question => {
                    let arr = question.content.split(' ')
                    if (question.type === 'win or lose') {
                        return (
                            <option>{arr[0]} vs {arr[1]}</option>
                        )
                    } else {
                        return (
                            <option>{arr[0]}</option>
                        )
                    }

                })}
                {filteredQuestions.map(question => {
                    let arr = question.content.split(' ')
                    if (question.type === 'season record') {
                        return (
                            <option>{arr[0]}</option>
                        )
                    }
                })}
            </select>
            <input type="integer" disabled={disabledOU} onChange={(e) => setOUPoints(e.target.value)} value={ouPoints}/>
            <button onClick={handleSetContent}>Add question</button>
            <div>
                <label>Description: </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
            <label>Entry fee:</label>
            <select onChange={(e) => setPrice(e.target.value)} value={price}>
                <option>0</option>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>100</option>
            </select>
            </div>
            <div>
            <label>Closing date: </label>
            <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
            <input type="time" onChange={(e) => setTime(e.target.value)} value={time}/>
            </div>
            <p className={handleErrorClass()}>{error}</p>
            {predictionArr.map(prediction => {
                return <FormatPrediction type={prediction.type} content={prediction.content}/>
            })}
            <div>
            <button onClick={handleCreateContest}>Create Contest</button>
            </div>
            </>
        )
    }
    else {
        return <h1>LOADING</h1>
    }

}

export default CreateContest
