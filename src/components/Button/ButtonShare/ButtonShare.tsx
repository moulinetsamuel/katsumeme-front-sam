import { IoIosRocket } from 'react-icons/io';
import './ButtonShare.scss';
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Signin from '../../Modals/Signin/Signin';
import ShareMeme from '../../Modals/ShareMeme/ShareMeme';
import useUserStore from '../../UserStore/UserState';

type ButtonShareProps = {
  label: string;
};

function ButtonShare({ label }: ButtonShareProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const handleOpenShareModal = () => {
    if (!isAuthenticated) {
      handleOpenSigninModal();
    }
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleOpenSigninModal = () => {
    setShowSigninModal(true);
  };

  const handleCloseSigninModal = () => {
    setShowSigninModal(false);
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleOpenShareModal}
        className="Button"
        typeof="button"
        style={{
          color: 'white',
          background: '#775088',
          border: 'transparent',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IoIosRocket />
        {label}
      </Button>
      <ShareMeme
        hide={showShareModal && isAuthenticated}
        onHide={handleCloseShareModal}
      />
      <Signin hide={showSigninModal} onHide={handleCloseSigninModal} />
    </div>
  );
}
export default ButtonShare;
