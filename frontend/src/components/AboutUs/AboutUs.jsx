import './AboutUs.css'
import { useEffect} from "react"
import { useContextProviderFunc } from '../../context/NavigationContext'

const AboutUs = () => {
    const {hiddenNav, setHiddenNav} = useContextProviderFunc()


    useEffect(() => {
        if (!hiddenNav) {
            setHiddenNav(true)
        }
    })


    return (
        <>
        <div className='AboutUs'>
            <p>Two-Minute Drill is an independent project created by Alexander Llanos. This project currently operates with simulated funds and is intended for casual users.</p>
            <p>Below is a list of more of my projects:</p>
            <ul>
                <li>
                    <a href='https://alex-billbuddy.onrender.com/'>Bill-Buddy</a>
                    </li>
                <li>Fantasy Football Draft Optimizer</li>
            </ul>
        </div>
        </>
    )
}



export default AboutUs
