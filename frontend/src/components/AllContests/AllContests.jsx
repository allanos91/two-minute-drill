import { useSelector, useDispatch } from 'react-redux';
import { getContests } from '../../store/contests';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './AllContests.css'

const AllContests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)



    useEffect(() => {
        dispatch(getContests())
        if (!isLoaded) {
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded])

    const contests = useSelector((state) => {
        return Object.values(state.contests)
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
        return (
            contests.map(contest => {
                let dateTime = contest.closing_date.split(", ")
                console.log(dateTime)
                return (
                <div className={assignClassName(count)} key={contest.id}>
                    <div className='closing-date'>
                    <p>Last day to submit entry: </p>
                    <p className='cd-color'>{dateTime[0]} at {dateTime[1]}</p>
                    </div>
                    <div className='description-div'>
                        <p>About: </p>
                        <p className='description'>{contest.description}</p>
                    </div>
                    <div className='price-div'>
                    <p>Entry fee: </p>
                    <p className='price'>${contest.price}.00</p>
                    </div>
                    <p className="image">preview image: {contest.preview_image}</p>
                </div>
                )

            })
        )
    } else {
        return (
            <h1>TEST</h1>
        )
    }


}

export default AllContests
