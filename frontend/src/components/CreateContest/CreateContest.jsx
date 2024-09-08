import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getPredictions } from "../../store/predictions"
import FormatPrediction from "../../../utils/utils"


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
    const [predictionId, setPredictionId] = useState("")

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
            console.log(team.split(' vs ').join(' '))
            setCTeam(team.split(' vs ').join(' '))
        }

        if (type === "team points") {
            setCTeam(e.target.value)
        }

        if (type === "season record") {
            setCTeam(e.target.value)
        }
    }



    const handlePredictionArr = () => {
        setPredictionArr([...predictionArr, {type: type, content: content}])
        setContent('')
        setType('')
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

    const handleDisabledOU = () => {
        if (type === "over/under") {
            if (disabledOU !== false) {
                setDisabledOU(false)
            }
        } else {
            if (ouPoints !== '') {
                setOUPoints('')
            }
            if (disabledOU !== true) {
                setDisabledOU(true)
            }
        }
    }

    const handleSetContent = () => {
        if (type === "win or lose") {
            setContent(cTeam + " " + week)
            console.log(content)
            return
        }
        if (type === "season record") {
            setContent(cTeam)
            return
        }

        if (type === "team points") {
            setContent(cTeam + " " + week)
        }

        if (type === "over/under") {
            setContent(cTeam + " " + ouPoints + " " + week)
        }

    }




    if (isLoaded) {
        console.log(predictionArr)
        console.log(ouPoints, "flag")
        return (
            <>
            <p>Step 1: choose the type of prediction down below</p>
            <p>Step 2: If you chose any type besides season record, choose the week your prediction takes place.</p>
            <p>Step 3: Choose the team or teams</p>
            <p>Step 4: If you chose over/under, set the line</p>
            <p>Step 5: repeat steps 1-4 for more questions!</p>
            <p>Step 6: when you are done adding questions, hit the Create Contest button</p>
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
            {predictionArr.map(prediction => {
                return <FormatPrediction type={prediction.type} content={prediction.content}/>
            })}
            </>
        )
    }
    else {
        return <h1>LOADING</h1>
    }

}

export default CreateContest
