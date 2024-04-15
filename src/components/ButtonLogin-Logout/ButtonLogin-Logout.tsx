import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import Signin from '../Modals/Signin/Signin';
import useUserStore from '../UserStore/UserState';

function LoginLogout() {
  const [showSigninModal, setShowSigninModal] = useState(false);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  const handleOpenSigninModal = () => {
    setShowSigninModal(true); // Ouvrir la modal de connexion
  };

  const handleCloseSigninModal = () => {
    setShowSigninModal(false); // Ouvrir la modal de connexion
  };

  return (
    <div className="Login ms-auto">
      <FaRegUser className="ImageProfile" />
      {isAuthenticated ? (
        <Button
          className="LoginButton"
          variant="outline-light"
          onClick={handleLogout}
        >
          Se déconnecter
        </Button>
      ) : (
        <Button
          className="LoginButton"
          variant="outline-light"
          onClick={handleOpenSigninModal}
        >
          Se connecter
        </Button>
      )}
      <Signin hide={showSigninModal} onHide={handleCloseSigninModal} />
    </div>
  );
}

export default LoginLogout;
