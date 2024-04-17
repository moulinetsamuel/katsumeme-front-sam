import { IoIosRocket } from 'react-icons/io';
import './ButtonPublish.scss';
import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import Signin from '../Modals/Signin/Signin';
import useUserStore from '../UserStore/UserState';
import PublishMeme from '../Publish/PublishMeme';

type ButtonShareProps = {
  label: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

function ButtonShare({ label, canvasRef }: ButtonShareProps) {
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
        }}
      >
        <IoIosRocket />
        {label}
      </Button>
      <PublishMeme
        canvasRef={canvasRef}
        hide={showShareModal && isAuthenticated}
        onHide={handleCloseShareModal}
      />
      <Signin hide={showSigninModal} onHide={handleCloseSigninModal} />
    </div>
  );
}
export default ButtonShare;
