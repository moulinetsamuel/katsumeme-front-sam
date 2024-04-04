import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaRegUser } from 'react-icons/fa6';
import './Header.scss';
import { useState } from 'react';
import Signin from '../Modals/Signin/Signin';
import Modal from 'react-bootstrap/Modal';

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Button
            className="LoginButton"
            variant="outline-light"
            onClick={handleShow}
          >
            Se connecter
          </Button>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Se connecter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Signin />
            </Modal.Body>
            <Modal.Footer className="text-center">
              <Button
                className="mx-auto"
                style={{
                  width: '100%',
                  backgroundColor: '#e8811c',
                  border: 'none',
                }}
              >
                Créer un compte
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Stack>
    </header>
  );
}

export default Header;
