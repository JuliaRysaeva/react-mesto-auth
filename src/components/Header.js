import logo from '../images/header__logo.svg';
import { Link, useLocation } from 'react-router-dom'

export default function Header({ loggedIn, userEmail, LoggedOut }) {
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem('jwt');
    LoggedOut();
  }
  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='логотип сайта Место' />
      {loggedIn ? (
        <div className='header__links'>
          <p className='header__email'>{userEmail}</p>
          <Link className='header__link' to='/sign-in' onClick={handleLogout}>Выйти</Link>
        </div>
      ) : location.pathname === '/sign-up' ? (
        <Link className='header__link' to='/sign-in' onClick={handleLogout}>Войти</Link>
      ) : (
        <Link className='header__link' to='/sign-up' onClick={handleLogout}>Регистрация</Link>
      )}
    </header>
  );
}
