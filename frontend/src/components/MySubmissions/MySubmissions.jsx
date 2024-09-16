import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMySubmissions } from "../../store/submissions"
import {useNavigate} from "react-router-dom";
import "./MySubmissions.css"
import { getContests, getContestDetails } from "../../store/contests";
import { getPredictionContests } from "../../store/contests";
import OpenModalButton from "../OpenModalButton"
import DeleteSubmissionModal from "../DeleteSubmissionModal/DeleteSubmissionModal";





const MySubmissions =() => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [visibleArr, setVisibleArr] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getMySubmissions())
        dispatch(getPredictionContests())
        dispatch(getContests())
        if (!isLoaded) {
            setIsLoaded(true)
        }

    }, [isLoaded, dispatch, visibleArr])

    const submissions = useSelector((state) => {
        return state.submissions.mySubmissions
    })
    const contests = useSelector((state) => {
        return Object.values(state.contests.all)
    })

    const subsArr = Object.values(submissions)
    let index = 0
    let count = 0

    if (visibleArr) {
        if (!visibleArr.length && subsArr.length) {
            let newArr = []
            for (let i = 0; i < subsArr.length; i++) {
                newArr.push("hidden")
            }
            setVisibleArr(newArr)
        }
    }

    const handleEdit = async (submissionId, contestId) => {
        await dispatch(getContestDetails(contestId)).then(() => {
            navigate(`/submission/${submissionId}/contest/${contestId}`)
        })
    }
    const assignClassName = () => {
        if (count % 2 === 0) {
            count += 1
            return "contest-display even"
        } else {
            count += 1
            return "contest-display odd"
        }
    }

    const assignSubClassName = (visibleArr, subsArrIndex) => {
        return `submissions ${visibleArr[subsArrIndex]}`
    }

    const handleVisibleIndex = (copyIndex)=> {
        let arr = []

        if (visibleArr[copyIndex] === "not-hidden") {
            visibleArr[copyIndex] = "hidden"
            setVisibleArr(visibleArr)
            return
        }

        for (let i = 0; i < subsArr.length; i++) {
            if (i === copyIndex) {
                arr.push("not-hidden")
            } else {
                arr.push("hidden")
            }
        }
        setVisibleArr(arr)
    }



    if (isLoaded && submissions[0]) {
        let predictionObj = {}
        let submissionObj = {}
        let returnArr = []

        submissions.forEach(submission => {
            let id = submission.id

            //find contest submission belongs to
            let contest = contests.filter(contest => {
                return contest.id === submission.contest_id
            })
            //add contest predictions to object
            if (contest[0]) {
                contest[0].predictions.forEach(prediction => {
                    if (!predictionObj[id]) {
                        predictionObj[id] = [prediction]
                    } else {
                        predictionObj[id] = [...predictionObj[id], prediction]
                    }
                })
                submissionObj[id] = submission.content
            }
        })
        for (let key in predictionObj) {
            let answers = submissionObj[key].split(', ')
            let questions = predictionObj[key]
            let answersArr = []
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].type === 'win or lose') {
                    let contentArr = questions[i].content.split(" ")
                    let answerArr = answers[i].split(" ")
                    let answer = contentArr[0] + " vs " + contentArr[1] + " " + contentArr[2] + " " + contentArr[3] + ".  Your prediction: " + contentArr[0] + ": " + answerArr[0] + " " + contentArr[1] + ": " + answerArr[1]
                    answersArr.push(answer)
                } else if (questions[i].type === 'season record') {
                    let answerArr = answers[i].split(" ")
                    let answer = `${questions[i].content} season record.  Your prediction: ${answerArr[0]} wins to ${answerArr[1]} losses`
                    answersArr.push(answer)
                } else if (questions[i].type === 'team points') {
                    let answer = `${questions[i].content} points.  Your prediction: ${answers[i]} points`
                    answersArr.push(answer)
                } else if (questions[i].type === 'over/under') {
                    let contentArr = questions[i].content.split(" ")
                    let answer = `${contentArr[0]} ${contentArr[2]} ${contentArr[3]}.  Your prediction: ${answers[i]} ${contentArr[1]}`
                    answersArr.push(answer)
                }
            }
            returnArr.push(answersArr)
        }
        return (
            <>
            {returnArr.map(arr => {
                let filteredContests = contests.filter(contest => {
                    return contest.id === subsArr[index].contest_id
                })
                let subId = subsArr[index].id
                let dateTime = filteredContests[0].closing_date.split(", ")
                let copyIndex = index
                index += 1
                let qCount = 0

                return (
                    <>
                    <div className={assignClassName(count)} key={filteredContests[0].id} onClick={() => handleVisibleIndex(copyIndex)}>
                        <div className="closing-date">
                            <p className="contest-preview-info">Last day to submit entry: </p>
                            <p className='cd-color contest-preview-info'>{dateTime[0]} at {dateTime[1]}</p>
                        </div>
                        <div className="description-div">
                            <p className="contest-preview-info">Name: </p>
                            <p className='description contest-preview-info'>{filteredContests[0].description}</p>
                        </div>
                        <div className='price-div'>
                            <p className='contest-preview-info'>Entry fee: </p>
                            <p className='price contest-preview-info'>${filteredContests[0].price}.00</p>
                        </div>
                        <div>
                        <button id="edit" onClick={() => handleEdit(subId, filteredContests[0].id)}>Edit</button>
                        <OpenModalButton
                            id="delete"
                            buttonText="Delete"
                            modalComponent={<DeleteSubmissionModal  submissionId={subId}/>}
                        />
                        </div>
                    </div>
                    <section className={assignSubClassName(visibleArr, index-1)}>
                    <p className="sub-predictions sub-label">Your submission for this contest:</p>
                    {arr.map(answer => {
                        qCount += 1
                    return (
                        <div className="sub-question-answer-container" key={`naxzz${qCount}`}>
                    <p className="sub-predictions-question">Question {qCount}: {answer.split('Your prediction')[0]}</p>
                    <p className="sub-predictions-answer">Your prediction{answer.split("Your prediction")[1]}</p>
                    </div>
                    )
                })}
                </section>
                </>)
            })}
            </>
        )

    }

    return (
        <h1 className="filler">Contests you have entered will appear below</h1>
    )
}


export default MySubmissions
