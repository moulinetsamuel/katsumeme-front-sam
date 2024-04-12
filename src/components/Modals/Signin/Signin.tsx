import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Signup from '../Signup/Signup';
import axiosInstance from '../../API/axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type SigninProps = {
  hide: boolean;
  onHide: (boolean: any) => void;
};

function Signin({ hide, onHide }: SigninProps) {
  //const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //const [success, setSuccess] = useState(false);

  //const [token, setToken] = useState<string>('');
  //const [loading, setLoading] = useState(true);

  const handleClose = () => onHide(false);

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
          withCredentials: false,
        }
      );

      localStorage.setItem(
        'accessToken',
        JSON.stringify(response?.data?.accessToken)
      );
      localStorage.setItem(
        'refreshToken',
        JSON.stringify(response?.data?.refreshToken)
      );

      //const roles = response?.data?.roles // add roles if necessary

      setEmail('');
      setPassword('');
      //setSuccess(true);

      handleClose();
      location.reload();
    } catch (error) {
      console.error(error);
      if (error?.response.status === 400) {
        setErrorMessage('Missing Email or Password');
      } else if (error?.response.status === 401) {
        setErrorMessage('Incorrect Email or Password');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
    <div>
      <Modal show={hide} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Se connecter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              {typeof errorMessage === 'object'
                ? (errorMessage as { message: string }).message
                : errorMessage}
            </p>
          </div>
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
