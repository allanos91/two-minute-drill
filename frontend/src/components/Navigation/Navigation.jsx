import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../../public/colored_footbal_icon.jpg'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
