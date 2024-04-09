import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaRegUser } from 'react-icons/fa6';
import axios from 'axios';
import Signup from '../Signup/Signup';
import axiosInstance from '../../API/axios';

function Signin() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track if user is login or not
  const [show, setShow] = useState(false);

  //const errRef = useRef(); // if we want implement error toast

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  });

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        '/api/auth/login',
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );

      console.log(JSON.stringify(response?.data));

      const tokens = response?.data?.accessToken;
      localStorage.setItem('token', JSON.stringify(tokens));

      //const { accessToken, tokenType } = JSON.parse(token);

      if (tokens) {
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
      } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('tokens');
      }

      // const roles = response?.data?.roles // add roles if necessary

      setEmail('');
      setPassword('');
      setSuccess(true);

      handleClose();
    } catch (error) {
      console.error(error);
      if (!error?.response) {
        setErrorMessage('Aucune réponse du serveur');
      } else if (error.response.status === 400) {
        setErrorMessage('Email ou mot de passe manquant');
      } else if (error.response.status === 401) {
        const test = error.response.data;
        setErrorMessage(test);
        console.log(setErrorMessage(test));
      } else {
        setErrorMessage('Connexion échouée');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <div className="Login ms-auto">
      <FaRegUser className="ImageProfile" />
      {isLoggedIn ? (
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
          onClick={handleShow}
        >
          Se connecter
        </Button>
      )}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Se connecter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Form.Text className="text-muted">
                Ne partagez jamais votre mot de passe avec des tiers.
              </Form.Text>
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
