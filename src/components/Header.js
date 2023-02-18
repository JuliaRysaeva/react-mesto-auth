import logo from '../images/header__logo.svg';

function Header() {
  return (
      <header className='header'>
        <img src={logo} className='header__logo' alt='Мeсто' />
      </header>
  );
}

export default Header;
