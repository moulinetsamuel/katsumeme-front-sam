import axios from 'axios';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axiosInstance from '../../API/axios';

function Signup() {
  const [show, setShow] = useState(false);
  const errRef = useRef();

  const [nickname, setNickname] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirm_password, setconfirm_password] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrorMessage('');
  }, [nickname, firstname, lastname, email, password, confirm_password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        '/api/users',
        JSON.stringify({
          nickname,
          firstname,
          lastname,
          email,
          password,
          confirm_password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      // params needed for sign up
      setNickname('');
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setconfirm_password('');

      setSuccess(true);
      // Close modal if success
      handleCloseModalSignup();
    } catch (error) {
      console.error(error);
      if (!error?.response) {
        setErrorMessage('No Server Response');
      } else if (error.response?.status === 409) {
        setErrorMessage('Username Taken');
      } else {
        setErrorMessage('Registration Failed');
      }
    }
  };

  const handleShowModalSignup = () => {
    setShow(true);
  };

  const handleCloseModalSignup = () => {
    setShow(false);
  };

  return (
    <>
      <Button
        onClick={handleShowModalSignup}
        className="mx-auto"
        style={{
          width: '100%',
          backgroundColor: '#e8811c',
          border: 'none',
        }}
      >
        Créer un compte
      </Button>

      <Modal show={show} onHide={handleCloseModalSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Inscription</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstname">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre prénom"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmez votre mot de passe"
                onChange={(e) => setconfirm_password(e.target.value)}
                value={confirm_password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Signup;
