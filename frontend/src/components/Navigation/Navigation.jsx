import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../../public/colored_footbal_icon.jpg'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [load, setLoad] = useState(false)
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  const user = useSelector((state) => {
    return state.session.user
})



  useEffect(() => {
    if (!load) {
      setLoad(true)
    }

    if (err && sessionUser) {
      setErr('')
    }
  })

  const onClick = () => {
    if (!user) {
        setErr("Please log in or sign up before creating a contest")
        return
    }
    navigate('/create-contest')
}
  return (
    <div>
    <ul className='user-login-signup'>
      <li>
        <NavLink to="/"><img className='logo' src={logo} alt='two minute logo'/></NavLink>
      </li>
      {isLoaded && (
        <>
        <li className='profile-icon'>
          <ProfileButton user={sessionUser} />
        </li>
        </>
      )}
    </ul>
    <section className='landing-page'>
        <h1 className='landing-page title'>Two minute drill</h1>
        <div className='landing-page'>
            <p className='landing-page link' onClick={onClick}>Create a contest</p>
            <p className='error'>{err}</p>
        </div>
        <div className='landing-page'>
            <Link className='landing-page link' to={'/contests'}>See available contests</Link>
            <p></p>
        </div>
        <div className='landing-page'>
            <Link className='landing-page link' to={'/contests/hosted-contests'}>View your contests</Link>
        </div>
        </section>
    </div>

  );
}

export default Navigation;
