import {useEffect, useState} from "react"
import './utils.css'
import { addPrediction } from "../src/store/predictions"
import { useDispatch } from "react-redux"


const FormatMySubmissions = (props) => {
    const [select1, setSelect1] = useState("win")
    const [select2, setSelect2] = useState("lose")
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    if (props.type === "win or lose") {
        let contentArr = props.content.split(" ")
        return (
            <div className="predictions-box">
            <p className="predictions">{contentArr[2].toUpperCase()} {contentArr[3]}</p>
            <label className="predictions">{contentArr[0].toUpperCase()}</label>
            <select disabled={true} value={select1} className="select-input">
                <option value="win"> Win </option>
                <option value="lose"> Lose </option>
            </select>
            <label className="predictions">{contentArr[1].toUpperCase()}</label>
            <select disabled={true} value={select2} className="select-input">
                <option value="win"> Win </option>
                <option value="lose"> Lose </option>
            </select>
            </div>
        )
    } else if (props.type === "season record") {
        return (
            <div className="predictions-box">
            <p className="predictions">{props.content.toUpperCase()} Season Record</p>
            <label className="predictions">Season wins: </label>
            <input type="integer" disabled={true} className="input-field"/>
            <label className="predictions">Season losses: </label>
            <input type="integer" disabled={true} className="input-field"/>
            </div>
        )
    } else if (props.type === "team points") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box">
            <p className="predictions">{contentArr[1].toUpperCase()} {contentArr[2].toUpperCase()}</p>
            <p className="predictions">{contentArr[0].toUpperCase()} Total Score</p>
            <label className="predictions">Total score</label>
            <input type="integer" disabled={true} className="input-field"/>
            </div>
        )
    } else if (props.type === "over/under") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box">
            <p className="predictions">{contentArr[2].toUpperCase()} {contentArr[3].toUpperCase()}</p>
            <p className="predictions">{contentArr[0].toUpperCase()} Over/Under</p>
            <label className="predictions">Line: {contentArr[1]} </label>
            <select disabled={true} className="select-input">
                <option>Over</option>
                <option>Under</option>
            </select>
            </div>
        )
    }
    return
}

export default FormatMySubmissions
