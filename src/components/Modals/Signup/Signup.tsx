import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function Signup() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleShowModalSignup = () => {
    setShow(true);
  };

  const handleCloseModalSignup = () => {
    setShow(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Votre mot de passe ne correspond pas');
      return;
    }
    // console.log(
    // `Nom: ${username}, Prénom: ${firstname}, Nom: ${lastname}, Email: ${email}, Mot de passe: ${password}`);
    handleCloseModalSignup(); //To close modal after submit
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
                value={username}
                onChange={handleNameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                value={lastname}
                onChange={handleLastnameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstname">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre prénom"
                value={firstname}
                onChange={handleFirstnameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
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

