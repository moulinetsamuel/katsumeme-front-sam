import { Stack } from 'react-bootstrap';
import './Header.scss';
import LoginLogout from '../Button/ButtonLogin-Logout/ButtonLogin-Logout';
import { Link } from 'react-router-dom';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';

function Header() {
  return (
    <header className="Header">
      <Stack
        className="Banner justify-content-center"
        direction="horizontal"
        gap={3}
      >
        <div>
          <Link to="/">
            <img
              className="ImageTitle"
              src="src/assets/Logo.png"
              alt="Logo Katsumeme Chat"
            />
          </Link>
        </div>
        <div className="Login ms-auto">
          <LoginLogout />
        </div>
      </Stack>
    </header>
  );
}

export default Header;
