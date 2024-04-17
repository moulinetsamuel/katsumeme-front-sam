import { Stack } from 'react-bootstrap';
import './Header.scss';
// import useUserStore from '../UserStore/UserState';
import LoginLogout from '../ButtonLogin-Logout/ButtonLogin-Logout';
import { Link } from 'react-router-dom';
import ButtonShare from '../ButtonShare/ButtonShare';
import ButtonCreate from '../ButtonCreate/ButtonCreate';

function Header() {
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  // const user = useUserStore((state) => state.user);

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
        <div className="buttonContainer ms-auto">
          <ButtonShare label="Partager un meme" />
          <ButtonCreate />
        </div>
        <div className="Login ms-auto">
          <LoginLogout />
        </div>
      </Stack>
    </header>
  );
}

export default Header;
