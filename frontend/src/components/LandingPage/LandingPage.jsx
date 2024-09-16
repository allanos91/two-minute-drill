import './LandingPage.css'
import { Link } from 'react-router-dom'
import { useEffect, useState} from "react"
import { useIsDeletedObj } from "../../context/IsDeleted"
import { useNavigate } from "react-router-dom";



const LandingPage = () => {

    const {isDeleted, setIsDeleted} = useIsDeletedObj()
    const navigate = useNavigate()

    useEffect(() => {

        if (isDeleted) {
            setIsDeleted(false)
            navigate("/contests/hosted-contests")
        }
    })


    return (
        <section className='landing-page'>
        <div className='landing-page'>
        <h1 className='landing-page title'>Two minute drill</h1>
        </div>
        <div className='landing-page'>
            <Link className='landing-page link' to={'/create-contest'}>Create a contest</Link>
        </div>
        <div className='landing-page'>
            <Link className='landing-page link' to={'/contests'}>See available contests</Link>
        </div>
        <div>
            <Link className='landing-page link' to={'/contests/hosted-contests'}>View your contests</Link>
        </div>
        </section>
    )
}



export default LandingPage
