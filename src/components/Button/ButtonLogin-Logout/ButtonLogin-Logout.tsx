import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import Signin from '../../Modals/Signin/Signin';
import useUserStore from '../../UserStore/UserState';

function LoginLogout() {
  const [showSigninModal, setShowSigninModal] = useState(false);

  const { setAppState, isAuthenticated } = useUserStore();

  const handleLogout = () => {
    localStorage.clear();
    setAppState();
  };

  const handleOpenSigninModal = () => {
    setShowSigninModal(true); // Ouvrir la modal de connexion
  };

  const handleCloseSigninModal = () => {
    setShowSigninModal(false); // Ouvrir la modal de connexion
  };

  return (
    <div className="d-inline me-3">
      <div className="Login">
        <div className="ImageProfile" />
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
    </div>
  );
}

export default LoginLogout;
