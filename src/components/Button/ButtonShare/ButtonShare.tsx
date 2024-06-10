import { IoIosRocket } from 'react-icons/io';
import './ButtonShare.scss';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Signin from '../../Modals/Signin/Signin';
import ShareMeme from '../../Modals/ShareMeme/ShareMeme';
import useUserStore from '../../UserStore/UserState';

type ButtonShareProps = {
  label: string;
  close?: (boolean: any) => void;
};

function ButtonShare({ label, close = () => {} }: ButtonShareProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  const { isAuthenticated } = useUserStore();

  const handleOpenShareModal = () => {
    if (!isAuthenticated) {
      close(false);
      handleOpenSigninModal();
    }
    close(false);
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
    <div className="ShareButton">
      <Button
        onClick={handleOpenShareModal}
        className="CustomButton"
        typeof="button"
        variant="primary"
        style={{
          background: '#F9D701',
          border: 'solid 0.1rem',
          borderRadius: '1rem',
          display: 'flex',
          fontVariant: 'small-caps',
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
