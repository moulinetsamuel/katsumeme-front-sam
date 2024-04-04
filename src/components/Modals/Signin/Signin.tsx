import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

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
  );
}
export default Signin;
