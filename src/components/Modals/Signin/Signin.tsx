import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaRegUser } from 'react-icons/fa6';
import axios from 'axios';
import Signup from '../Signup/Signup';

function Signin() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('.../api/login', {
        email,
        password,
      });
    } catch (error) {
      setError('Identifiants invalides. Veuillez réessayer');
    }
  };

  return (
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse email ou Identifiant</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email ou identifiant"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Ne partagez jamais votre email avec des tiers.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Se souvenir de moi"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
  </Form.Group>*/}
            <div className="text-center d-grid">
              <Button
                style={{ backgroundColor: '#70905f', border: 'none' }}
                type="submit"
              >
                Se connecter
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-center">
          {/*<Button
            className="mx-auto"
            style={{
              width: '100%',
              backgroundColor: '#e8811c',
              border: 'none',
            }}
          >
            Créer un compte
          </Button>*/}
          <div className="text-center d-grid">
            <Signup />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Signin;
