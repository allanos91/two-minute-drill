import {useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import { getMySubmissions } from '../../store/submissions'
import { getPredictionContests } from '../../store/contests'
import {useNavigate} from "react-router-dom"



const MyContests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getMySubmissions())
        dispatch(getPredictionContests())

        if (!isLoaded) {
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded])

    const contests = useSelector((state) => {
        return Object.values(state.contests.userSubmissions)
    })

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

    if (isLoaded) {
        const onCLick = (id) => {
            navigate(`/contests/${id}`)
        }
        return (
            contests.map(contest => {
                let dateTime = contest.closing_date.split(", ")
                return (
                <div className={assignClassName(count)} key={contest.id} onClick={() => onCLick(contest.id)}>
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
                </div>
                )

            })
        )
    } else return (
        <h1>Test</h1>
    )
}


export default MyContests
