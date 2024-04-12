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
  const [validMatch, setValidMatch] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [nickname, firstname, lastname, email, password, confirm_password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setValidMatch('Les mots de passe ne correspondent pas');
      return;
    }
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
          withCredentials: false,
        }
      );
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
      if (error.response?.status === 400) {
        const details = error.response.data.message.details;
        if (Array.isArray(details)) {
          //const errorMessage = details.map((detail) => detail.message);
          //console.log(errorMessage);
          //setErrorMessage(errorMessage.join(', '));
          details.forEach((detail) => {
            switch (detail.path[0]) {
              case 'nickname':
                setNicknameError(detail.message);
                break;
              case 'email':
                setEmailError(detail.message);
                break;
              case 'password':
                setPasswordError(detail.message);
                break;
              case 'confirm_password':
                setConfirmPasswordError(detail.message);
                break;
              default:
                break;
            }
          });
        } else {
          setErrorMessage('An error occurred');
        }
      }
    }
  };

  const handleShowModalSignup = () => {
    setShow(true);
  };

  const handleCloseModalSignup = () => {
    setShow(false);
  };

  const handleInputChangeNickname = () => {
    setNicknameError('');
  };

  const handleInputChangeEmail = () => {
    setEmailError('');
  };

  const handleInputChangePassword = () => {
    setPasswordError('');
  };

  const handleInputChangeConfirmPwd = () => {
    setConfirmPasswordError('');
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
                onChange={(e) => {
                  setNickname(e.target.value);
                  handleInputChangeNickname();
                }}
                value={nickname}
                required
              />
              {/*<p>
                {typeof errorMessage === 'object'
                  ? (errorMessage as { message: string }).message
                  : errorMessage
                      .split(',')
                      .filter((message) => message.includes('nickname'))
                      .join(', ')}
      </p>*/}
              <p>{nicknameError}</p>
            </Form.Group>

            <Form.Group controlId="formBasicLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstname">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre prénom"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChangeEmail();
                }}
                value={email}
                required
              />
              <p>{emailError}</p>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleInputChangePassword();
                }}
                value={password}
                required
              />
              <p>{passwordError}</p>
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmez votre mot de passe"
                onChange={(e) => {
                  setconfirm_password(e.target.value);
                  handleInputChangeConfirmPwd();
                }}
                value={confirm_password}
                required
              />
              <p>{confirmPasswordError}</p>
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
