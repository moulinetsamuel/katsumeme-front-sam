import LoginLogout from '../Button/ButtonLogin-Logout/ButtonLogin-Logout';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="Header">
      <div className="Banner d-flex align-items-center justify-content-between px-3 py-2">
        <Link to="/">
          <img
            className="ImageTitle"
            src="Logo.png"
            alt="Logo Katsumeme Chat"
          />
        </Link>
        <div className="Login">
          <LoginLogout />
        </div>
      </div>
    </header>
  );
}

export default Header;
