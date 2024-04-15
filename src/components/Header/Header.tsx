import { Stack } from 'react-bootstrap';
import './Header.scss';
import useUserStore from '../UserStore/UserState';
import LoginLogout from '../ButtonLogin-Logout/ButtonLogin-Logout';

function Header() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  return (
    <header className="Header">
      <Stack className="Banner" direction="horizontal" gap={3}>
        <div>
          <img
            className="ImageTitle"
            src="src/assets/Logo.png"
            alt="Logo Katsumeme Chat"
          />
        </div>
        <div className="Login ms-auto">
          <LoginLogout />
        </div>
      </Stack>
    </header>
  );
}

export default Header;
