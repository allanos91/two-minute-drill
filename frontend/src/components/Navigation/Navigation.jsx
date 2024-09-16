import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../../public/colored_footbal_icon.jpg'
import { useBalanceProvider } from '../../context/UserBalance';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [load, setLoad] = useState(false)


  const user = useSelector((state) => {
    return state.session.user
  })
  useEffect(() => {
    if (!load) {
      setLoad(true)
      console.log(user)
    }
  })

  return (
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
  );
}

export default Navigation;
