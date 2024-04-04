import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaRegUser } from 'react-icons/fa6';
import './Header.scss';

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
          <FaRegUser className="ImageProfile" />
          <Button className="LoginButton" variant="outline-light">
            Login
          </Button>
        </div>
      </Stack>
    </header>
  );
}

export default Header;
