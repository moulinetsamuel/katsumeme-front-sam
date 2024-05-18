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
            style={{
              backgroundColor: '#775088',
              color: '#ffffff',
              width: '9rem',
            }}
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        ) : (
          <Button
            className="LoginButton"
            style={{
              backgroundColor: '#775088',
              color: '#ffffff',
              marginTop: '1rem',
              borderColor: '#ffffff',
              width: '9rem',
            }}
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
