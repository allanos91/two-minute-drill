// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true)
    }
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const sessionUser = useSelector(state => state.session.user)
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const handleBalanceVal = () => {
    return sessionUser ? "balance " : "balance hidden"
  }


  if (isLoaded) {
    return (
      <>
        <button onClick={toggleMenu}>
          <FaUserCircle className='circle-profile-button'/>
        </button>
        <p className={handleBalanceVal()}>Available balance: ${sessionUser ? sessionUser.balance : ""}</p>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li className='user-info'>{user.username}</li>
              <li className='user-info'>{user.email}</li>
              <li className="log-in-out">
                <button className="log-in-out" onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <OpenModalButton
                  className="log-in-out"
                  buttonText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  className="log-in-out"
                  buttonText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      </>
    );
  }
}

export default ProfileButton;
