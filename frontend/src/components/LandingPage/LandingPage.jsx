import './LandingPage.css'
import { Link } from 'react-router-dom'




const LandingPage = () => {

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
        </section>
    )
}



export default LandingPage
