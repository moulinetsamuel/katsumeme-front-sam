import { Stack } from 'react-bootstrap';
import './Header.scss';
import Signin from '../Modals/Signin/Signin';

function Header() {
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
          <Signin />
        </div>
      </Stack>
    </header>
  );
}

export default Header;
