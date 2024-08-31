import { useSelector, useDispatch } from 'react-redux';
import { getContests } from '../../store/contests';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AllContests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getContests())
        if (!isLoaded) {
            setIsLoaded(true)
        }
    }, [dispatch])

    const contests = useSelector((state) => {
        return Object.values(state.contests)
    })

    if (isLoaded) {
        return (
            contests.map(contest => {
                return (
                <>
                    <p>{contest.description}</p>
                    <p>{contest.closing_date}</p>
                    <p>{contest.preview_image}</p>
                </>
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
