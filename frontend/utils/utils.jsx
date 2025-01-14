import {useState} from "react"
import './utils.css'



const FormatPrediction = (props) => {
    const [select1] = useState("win")
    const [select2] = useState("lose")

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
            <div className="predictions-box total-score">
            <p id="week-unique"className="predictions">{contentArr[1].toUpperCase()} {contentArr[2].toUpperCase()}</p>
            <p id="team-unique"className="predictions">{contentArr[0].toUpperCase()}</p>
            <label id="score-unique" className="predictions">Total score:</label>
            <input type="integer" disabled={true} className="input-unique"/>
            </div>
        )
    } else if (props.type === "over/under") {
        let contentArr = props.content.split(' ')
        return (
            <div className="predictions-box over-under">
            <p id="over-under-week"className="predictions">{contentArr[2].toUpperCase()} {contentArr[3].toUpperCase()}</p>
            <p id="over-under-text" className="predictions">{contentArr[0].toUpperCase()} Over/Under</p>
            <label id="over-under-line"className="predictions">Line: {contentArr[1]} </label>
            <select disabled={true} id="over-under-select" className="select-input">
                <option>Over</option>
                <option>Under</option>
            </select>
            </div>
        )
    }
    return
}

export default FormatPrediction
