import './Header.scss';
import { Stack } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import { FaRegUser } from 'react-icons/fa6';
import { useState } from 'react';
import Signup from '../Modals/Signup/Signup';

function Header() {
  const [showModalSignup, setShowModalSignup] = useState(false);

  const handleShowModalSignup = () => {
    setShowModalSignup(true);
  };
  console.log(handleShowModalSignup);

  const handleCloseModalSignup = () => {
    setShowModalSignup(false);
  };

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

          <Signup />
        </div>
      </Stack>
    </header>
  );
}

export default Header;
