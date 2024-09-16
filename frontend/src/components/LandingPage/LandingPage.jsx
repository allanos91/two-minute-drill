import './LandingPage.css'
import { Link } from 'react-router-dom'
import { useEffect} from "react"
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
        <div className="landing-page-design">
          {/* Hero Section */}
          <section className="hero">
            <h1 className="hero-title">Football Contests</h1>
            <p className="hero-subtitle">Test your NFL knowledge and compete for amazing prizes!</p>
          </section>

          {/* Information Section */}
          <section className="info">
            <div className="info-item">
              <h2>Why Join Us?</h2>
              <p>Compete in thrilling football contests, stay updated with scores, and win exciting prizes!</p>
            </div>
            <div className="info-item">
              <h2>How It Works</h2>
              <p>Create or join contests, predict game outcomes, and climb the leaderboard with your football expertise!</p>
            </div>
            <div className="info-item">
              <h2>Featured Contests</h2>
              <p>Check out our most popular contests and show off your football knowledge!</p>
            </div>
          </section>

          {/* Featured Contests Section */}
          <section className="featured-contests">
            <h2>Featured Contests</h2>
            <div className="contest-list">
              <div className="contest-item">
                <h3>East vs West Coast</h3>
                <p>Predict the outcomes of the Super Bowl and win big!</p>
                <Link className="cta-button" to="/contests/1">Join Now</Link>
              </div>
              <div className="contest-item">
                <h3>NFL Weekly Challenge </h3>
                <p>Compete throughout the NFL season with weekly contests!</p>
                <Link className="cta-button" to="/contests/2">Join Now</Link>
              </div>
              <div className="contest-item">
                <h3>NFL Regular Season Challenge</h3>
                <p>Show your expertise in college football playoffs and win exciting prizes!</p>
                <Link className="cta-button" to="/contests/3">Join Now</Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <p>&copy; 2024 Two Minute Drill. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </footer>
        </div>
      );
}



export default LandingPage
