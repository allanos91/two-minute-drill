import {useEffect, useState} from "react"
import './utils.css'
import { addPrediction } from "../src/store/predictions"
import { useDispatch } from "react-redux"
import { useSubmissionContestArray } from "../src/context/SubmissionContext"
import "./enabledUtils.css"

const EnableFormatPrediction = (props) => {
    const [select1, setSelect1] = useState("win")
    const [select2, setSelect2] = useState("lose")
    const [sR1, setSR1] = useState(0)
    const [sR2, setSR2] = useState(0)
    const [teamPoints, setTeamPoints] = useState(0)
    const [overUnder, setOverUnder] = useState("Over")
    const [isLoaded, setIsLoaded] = useState(false)
    const {arr, setArr} = useSubmissionContestArray()
    const dispatch = useDispatch()


    const handleOnChangeSelect1 = (e) => {
        setSelect1(e.target.value)
        setIsLoaded(false)
    }
    const handleOnChangeSelect2 = (e) => {
        setSelect2(e.target.value)
        setIsLoaded(false)
    }

    const handleOnChangeSelectSR1 = (e) => {
        setIsLoaded(false)
        setSR1(e.target.value)

    }

    const handleOnChangeSelectSR2 = (e) => {
        setIsLoaded(false)
        setSR2(e.target.value)
    }

    const handleOnChangeTeamPoints = (e) => {
        setIsLoaded(false)
        setTeamPoints(e.target.value)
    }

    const handleOnChangeOverUnder = (e) => {
        setIsLoaded(false)
        setOverUnder(e.target.value)
    }

    useEffect(() => {
        if (!isLoaded) {
            if (props.type === "win or lose") {
                arr[props.count] = {}
                arr[props.count]['team1'] = select1
                arr[props.count]['team2'] = select2
                setArr(arr)
            } else if (props.type === "season record") {
                arr[props.count] = {}
                arr[props.count]['win'] = parseInt(sR1)
                arr[props.count]['lose'] = parseInt(sR2)
                setArr(arr)
            } else if (props.type === "team points") {
                arr[props.count] = {}
                arr[props.count]['points'] = parseInt(teamPoints)
                setArr(arr)
            } else if (props.type === "over/under") {
                arr[props.count] = {}
                arr[props.count]['over/under'] = overUnder
                setArr(arr)
            }
            setIsLoaded(true)
        }
    },[select1, select2, sR1, sR2, teamPoints, overUnder])



    if (props.type === "win or lose") {
        let contentArr = props.content.split(" ")
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{contentArr[2].toUpperCase()} {contentArr[3]}</p>
            <label className="predictions-enabled">{contentArr[0].toUpperCase()}</label>
            <select value={select1} className="select-input-enabled" onChange={handleOnChangeSelect1}>
                <option value="win"> Win </option>
                <option value="lose"> Lose </option>
            </select>
            <label className="predictions-enabled">{contentArr[1].toUpperCase()}</label>
            <select value={select2} className="select-input-enabled" onChange={handleOnChangeSelect2}>
                <option value="win"> Win </option>
                <option value="lose"> Lose </option>
            </select>
            </div>
        )
    } else if (props.type === "season record") {
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{props.content.toUpperCase()} Season Record</p>
            <label className="predictions-enabled">Season wins: </label>
            <input type="integer" className="input-field-enabled" value={sR1} onChange={handleOnChangeSelectSR1}/>
            <label className="predictions">Season losses: </label>
            <input type="integer" className="input-field-enabled" value={sR2} onChange={handleOnChangeSelectSR2}/>
            </div>
        )
    } else if (props.type === "team points") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{contentArr[1].toUpperCase()} {contentArr[2].toUpperCase()}</p>
            <p className="predictions-enabled">{contentArr[0].toUpperCase()} Total Score</p>
            <label className="predictions-enabled">Total score</label>
            <input type="integer" className="input-field-enabled" value={teamPoints} onChange={handleOnChangeTeamPoints}/>
            </div>
        )
    } else if (props.type === "over/under") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{contentArr[2].toUpperCase()} {contentArr[3].toUpperCase()}</p>
            <p className="predictions-enabled">{contentArr[0].toUpperCase()} Over/Under</p>
            <label className="predictions-enabled">Line: {contentArr[1]} </label>
            <select className="select-input-enabled" value={overUnder} onChange={handleOnChangeOverUnder}>
                <option>Over</option>
                <option>Under</option>
            </select>
            </div>
        )
    }
    return
}

export default EnableFormatPrediction
