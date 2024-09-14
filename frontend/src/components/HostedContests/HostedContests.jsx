import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHostedContests } from "../../store/contests";
import MyContests  from "../MyContests"
import MySubmissions from "../MySubmissions";
import './HostedContests.css'



const HostedContests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState('myContests');

    useEffect(() => {
        dispatch(getHostedContests())
        if (!isLoaded) {
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded, activeTab])

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

    if (isLoaded) {
        const onCLick = (id) => {
            navigate(`/contests/${id}`)
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
                    <p className="image contest-preview-info">preview image: {contest.preview_image}</p>
                </div>
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
