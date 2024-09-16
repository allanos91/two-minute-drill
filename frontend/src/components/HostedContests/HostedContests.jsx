import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContestDetails, getHostedContests } from "../../store/contests";
import { getUsers } from "../../store/users"
import MySubmissions from "../MySubmissions";
import OpenModalButton from "../OpenModalButton";
import DeleteContestModal from "../DeleteContestModal/DeleteContestModal";
import './HostedContests.css'
import { useIsDeletedObj } from "../../context/IsDeleted";



const HostedContests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState('myContests');
    const [predictionArr, setPredictionArr] = useState([])
    const [userArr, setUserArr] = useState([])
    const [contestVisibleArr, setContestVisibleArr] = useState([])
    const [submissionVisibleArr, setSubmissionVisibleArr] = useState([])
    const {isDeleted, setIsDeleted} = useIsDeletedObj()

    useEffect(() => {
        dispatch(getHostedContests())
        dispatch(getUsers())
        if (!isLoaded) {
            setIsLoaded(true)
        }

        if (isDeleted) {
            console.log("FLAG FLAG FLAG")
            setIsDeleted(false)
            setContestVisibleArr([])
            navigate('/contests/hosted-contests')
        }
    }, [dispatch, isLoaded, activeTab, contestVisibleArr, isDeleted])

    let count = 0

    const assignClassName = () => {
        if (count % 2 === 0) {
            count += 1
            return "contest-display even"
        } else {
            count += 1
            return "contest-display odd"
        }
    }




    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };

    const contests = useSelector((state) => {
        return Object.values(state.contests.hosted)
    })

    if (contestVisibleArr) {
        if (!contestVisibleArr.length && contests.length) {
            let newArr = []
            for (let i = 0; i < contests.length; i++) {
                newArr.push("hidden")
            }
            setContestVisibleArr(newArr)
        }
    }

    const assignContestClassName = (contestVisibleArr, copyIndex) => {
        return `${contestVisibleArr[copyIndex]}`
    }

    const handleContestVisibleIndex = (copyIndex) => {
        let arr = []
        if (contestVisibleArr[copyIndex] === "not-hidden") {
            contestVisibleArr[copyIndex] = "hidden"
            setContestVisibleArr(contestVisibleArr)
            return
        }

        for (let i = 0; i < contests.length; i++) {
            if (i === copyIndex) {
                arr.push("not-hidden")
            } else {
                arr.push("hidden")
            }
        }
        setContestVisibleArr(arr)
    }

    const handleSubmissionVisibleIndex = (copySubIndex, submissionsArr) => {
        let arr = []
        for (let i = 0; i < submissionsArr.length; i++) {
            if (i === copySubIndex) {
                arr.push("not-hidden")
            } else {
                arr.push("hidden")
            }
        }
        setSubmissionVisibleArr(arr)
    }



    const assignSubClassName = (copySubIndex, submissionVisibleArr) => {
        return `${submissionVisibleArr[copySubIndex]}`
    }

    const contestsObj = useSelector((state) => {
        return state.contests.hosted
    })

    const users = useSelector((state) => {
        return state.users.all
    })

    let index = 0
    let subIndex = 0
    const handleEdit = async (id) => {
        await dispatch(getContestDetails(id)).then(() => {
            navigate(`/update/${id}`)
        })
    }
    if (isLoaded) {
        const onCLick = (id, copyIndex) => {
            let submissions = contestsObj[id].submissions
            let predictions = contestsObj[id].predictions
            let predictionObj = {}
            let submissionObj = {}
            let returnArr = []
            let uArr = []
            handleContestVisibleIndex(copyIndex)
            let arr = []
            for (let i = 0; i < submissions.length; i++) {
                arr.push("hidden")
            }
            setSubmissionVisibleArr(arr)

            submissions.forEach(submission => {
                let id = submission.id
                uArr.push(submission.user_id)

                predictions.forEach(prediction => {
                    if (!predictionObj[id]) {
                        predictionObj[id] = [prediction]
                    } else {
                        predictionObj[id] = [...predictionObj[id], prediction]
                    }
                })
                submissionObj[id] = submission.content
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
            setPredictionArr(returnArr)
            setUserArr(uArr)
        }
        return (
            <div>
                <nav className="navbar">
        <button
          className={`nav-button ${activeTab === 'myContests' ? 'active' : ''}`}
          onClick={() => handleTabChange('myContests')}
        >
          My Contests
        </button>
        <button
          className={`nav-button ${activeTab === 'hostedContests' ? 'active' : ''}`}
          onClick={() => handleTabChange('hostedContests')}
        >
          Hosted Contests
        </button>
      </nav>

      <main>
        {activeTab === 'hostedContests' && <section className="hosted-contests">
            {contests.map(contest => {
                let userIndex = 0
                let dateTime = contest.closing_date.split(", ")
                let copyIndex = index
                let id = contest.id
                index += 1

                return (
                    <>
                <div className={assignClassName(count)} key={contest.id} onClick={() => onCLick(contest.id, copyIndex)}>
                    <div className='closing-date'>
                    <p className='contest-preview-info'>Last day to submit entry: </p>
                    <p className='cd-color contest-preview-info'>{dateTime[0]} at {dateTime[1]}</p>
                    </div>
                    <div className='description-div'>
                        <p className='contest-preview-info'>About: </p>
                        <p className='description contest-preview-info'>{contest.description}</p>
                    </div>
                    <div className='price-div'>
                    <p className='contest-preview-info'>Entry fee: </p>
                    <p className='price contest-preview-info'>${contest.price}.00</p>
                    </div>
                    <div className="edit-delete-container">
                    <div className="edit-delete-div">
                        <button id="edit" onClick={() => handleEdit(contest.id)}>Edit</button>
                        <OpenModalButton
                            id="delete"
                            buttonText="Delete"
                            modalComponent={<DeleteContestModal  contestId={id}/>}
                        />
                    </div>
                </div>
                </div>

                <div className={assignContestClassName(contestVisibleArr, copyIndex)}>
                {predictionArr.map(arr => {
                    let qCount = 0
                    let copySubIndex = subIndex
                    userIndex += 1
                    subIndex += 1
                    return (
                        <div>
                        <p className="sub-heading-hosted-contests" onClick={()=>handleSubmissionVisibleIndex(copySubIndex, predictionArr)}>User {users[userArr[userIndex-1]].username}'s submission</p>
                        {arr.map(answer => {
                        qCount += 1
                        return (
                            <div className={`sub-question-answer-container ${assignSubClassName(copySubIndex, submissionVisibleArr)}`}>
                            <p className="sub-predictions-question">Question {qCount}: {answer.split('Your prediction')[0]}</p>
                            <p className="sub-predictions-answer">Your prediction{answer.split("Your prediction")[1]}</p>
                            </div>
                        )

                    })}
                    </div>)
                })}
                <p className="sub-heading-hosted-contests-p">{!predictionArr.length ? "This contest has no submissions yet" : ""}</p>
                </div>
                </>
                )
            })}
            </section>}
        {activeTab === 'myContests' && <section className="my-contests">
            <MySubmissions/>
            </section>}
      </main>
            </div>
        )
    }

    return (
        <h1>TEST</h1>
    )
}

export default HostedContests
