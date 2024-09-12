import {useEffect, useState} from "react"
import './utils.css'
import { addPrediction } from "../src/store/predictions"
import { useDispatch } from "react-redux"
import "./enabledUtils.css"

const EnableFormatPrediction = (props) => {
    const [select1, setSelect1] = useState("win")
    const [select2, setSelect2] = useState("lose")
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()



    if (props.type === "win or lose") {
        let contentArr = props.content.split(" ")
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{contentArr[2].toUpperCase()} {contentArr[3]}</p>
            <label className="predictions-enabled">{contentArr[0].toUpperCase()}</label>
            <select value={select1} className="select-input-enabled" onChange={(e) => setSelect1(e.target.value)}>
                <option value="win"> Win </option>
                <option value="lose"> Lose </option>
            </select>
            <label className="predictions-enabled">{contentArr[1].toUpperCase()}</label>
            <select value={select2} className="select-input-enabled" onChange={(e) => setSelect2(e.target.value)}>
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
            <input type="integer" className="input-field-enabled"/>
            <label className="predictions">Season losses: </label>
            <input type="integer" className="input-field-enabled"/>
            </div>
        )
    } else if (props.type === "team points") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{contentArr[1].toUpperCase()} {contentArr[2].toUpperCase()}</p>
            <p className="predictions-enabled">{contentArr[0].toUpperCase()} Total Score</p>
            <label className="predictions-enabled">Total score</label>
            <input type="integer" className="input-field-enabled"/>
            </div>
        )
    } else if (props.type === "over/under") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box-enabled">
            <p className="predictions-enabled">{contentArr[2].toUpperCase()} {contentArr[3].toUpperCase()}</p>
            <p className="predictions-enabled">{contentArr[0].toUpperCase()} Over/Under</p>
            <label className="predictions-enabled">Line: {contentArr[1]} </label>
            <select className="select-input-enabled">
                <option>Over</option>
                <option>Under</option>
            </select>
            </div>
        )
    }
    return
}

export default EnableFormatPrediction
