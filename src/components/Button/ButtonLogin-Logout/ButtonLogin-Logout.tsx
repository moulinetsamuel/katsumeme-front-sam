import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import Signin from '../../Modals/Signin/Signin';
import useUserStore from '../../UserStore/UserState';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

type LoginLogoutProps = {
  close?: (boolean: any) => void;
};

function LoginLogout({ close = () => {} }: LoginLogoutProps) {
  const [showSigninModal, setShowSigninModal] = useState(false);

  const { setAppState, isAuthenticated } = useUserStore();

  const handleLogout = () => {
    close(false);
    localStorage.clear();
    setAppState();
  };

  const handleOpenSigninModal = () => {
    close(false);
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
              backgroundColor: '#FF3111',
              color: 'white',
              width: '9rem',
              border: 'solid 2px #',
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
              border: 'none',
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
